# coding=utf8

# note that in this implementation, strings are 0-indexed
# rather than 1-indexed as in the paper. 


# helpers
def substring(s, i, j):
    return s[i:j]


# Switch((b1, e1), ⋅⋅, (b𝑛, e𝑛))
class Switch:
    def __init__(self, *clauses):
        assert isinstance(clauses, tuple)
        self.clauses = list(clauses)

    def apply(self, sigma, bindings={}):
        for (b, e) in self.clauses:
            if b.apply(sigma, bindings) is True:
                print "matched predicate", sigma, b
                return e.apply(sigma, bindings)

    def __repr__(self): 
        return 'Switch {\n\t' + '\n\t'.join(repr(b) + ': ' + repr(e) for (b, e) in self.clauses) + '\n}'

# Bool b := d1 ∨ ⋅ ⋅ ∨ d𝑛
class Or:
    def __init__(self, *d):
        self.d = list(d)

    def apply(self, sigma, bindings={}):
        return any(d.apply(sigma, bindings) for d in self.d)

    def __repr__(self):
        return ' or '.join(repr(d) for d in self.d)

# Conjunct d := 𝜋1 ∧⋅⋅∧𝜋𝑛
class And:
    def __init__(self, *p):
        self.p = list(p)

    def apply(self, sigma, bindings={}):
        return all(p.apply(sigma, bindings) for p in self.p)

    def __repr__(self):
        return ' and '.join(repr(d) for d in self.d)

class Not:
    def __init__(self, m):
        assert instanceof(m, Match)
        self.m = m

    def apply(self, sigma, bindings={}):
        return not self.m.apply(sigma, bindings)

    def __repr__(self):
        return 'not ' + repr(self.m)


# Boolean expressions b are represented in DNF form and are boolean 
# combinations of predicates of the form Match(𝑣𝑖, r, 𝑘), where r is 
# some regular expression and 𝑘 is some integer constant. 

# We often denote Match(𝑣𝑖,r) by simply Match(𝑣𝑖 , r, 1).

class Match:
    def __init__(self, vi, r, k = 1):
        assert isinstance(vi, int)
        assert isinstance(k, int)
        # r must be a token sequence

        self.vi = vi
        self.r = r
        self.k = k

    def apply(self, sigma, bindings={}):
        # Match(𝑣𝑖, r, 𝑘) evaluates to true iff 𝑣𝑖 contains at least 𝑘 
        # matches of regular expression r. 
        # print regex(self.r)
        return len(re.findall(regex(self.r), sigma[self.vi])) >= self.k

    def __repr__(self):
        return 'Match' + repr((self.vi, self.r, self.k))

# [Concatenate(f1, ⋅⋅ fn)] = Concatenate([f1] 𝜎, ⋅⋅, [f𝑛] 𝜎)
class Concatenate:
    def __init__(self, *exprs):
        assert isinstance(exprs, tuple)
        self.exprs = list(exprs)

    def apply(self, sigma, bindings={}):
        return "".join(e.apply(sigma, bindings) for e in self.exprs)  
    
    def __repr__(self):
        return " + ".join(repr(expr) for expr in self.exprs)

# The string expression Loop(𝜆𝑤 : e) refers to concatenation of e1, e2, . . . , e𝑛, 
# where e𝑖 is obtained from e by replacing all occurrences of 𝑤 by 𝑖. 𝑛 is the 
# smallest integer such that evaluation of e𝑛+1 yields ⊥. It is also possible to 
# define more interesting termination conditions (based on position expression, 
# or predicates), but we leave out details for lack of space.

class Loop:
    def __init__(self, w, fn):
        self.w = w
        self.fn = fn

    def apply(self, sigma, bindings={}):
        return LoopR(self.w, self.fn, 0, sigma, bindings)
        

    def __repr__(self):
        return "Loop(" + self.w + ": " + repr(self.fn) + ")"

def LoopR(w, fn, k, sigma, bindings):
    new_bindings = bindings.copy()
    new_bindings[w] = k
    # using errors to signal loop termination is totally jank
    try: 
        t = fn.apply(sigma, new_bindings)
    except IndexError:
        return ""
    return t + LoopR(w, fn, k + 1, sigma, bindings)

class BoundVar:
    def __init__(self, w, k1 = 1, k2 = 0):
        self.w = w
        self.k1 = k1
        self.k2 = k2

    def unbind(self, bindings):
        if self.w in bindings:
            return bindings[self.w]
        print "unable to unbind", bindings
    def __repr__(self):
        return "𝜆" + self.w




# The SubStr(𝑣𝑖, p1, p2) constructor makes use of two position expressions 
# p1 and p2, each of which evaluates to an index within the string 𝑣𝑖.
# SubStr(𝑣𝑖,p1,p2) denotes the substring of string 𝑣𝑖 that starts at index 
# specified by p1 and ends at index specified by p2-1. 
# If either of p1 or p2 refer to an index that is outside the range of 
# string 𝑣𝑖, then the SubStr constructor returns ⊥.

class SubStr:
    def __init__(self, vi, p1, p2):
        assert isinstance(vi, int)
        assert isinstance(p1, (Pos, CPos))
        assert isinstance(p2, (Pos, CPos))

        self.vi = vi
        # position expressions 
        self.p1 = p1
        self.p2 = p2

    def apply(self, sigma, bindings={}):
        s = sigma[self.vi]
        return substring(s, self.p1.apply_str(s, bindings), self.p2.apply_str(s, bindings))

    def __repr__(self):
        return "SubStr" + repr((self.vi, self.p1, self.p2))

# We use the notation SubStr2(𝑣𝑖,r,c) to denote the c𝑡h occurrence
# of regular expression r in 𝑣𝑖 , i.e., SubStr(𝑣𝑖 , Pos(𝜖, r, c), Pos(r, 𝜖, c)). 
# We often denote SubStr(𝑣𝑖 , CPos(0), CPos(-1)) by simply 𝑣𝑖.

def SubStr2(vi, r, c):
    # TODO: double check
    return SubStr(vi, Pos([], r, c), Pos(r, [], c))



class ConstStr:
    def __init__(self, s):
        assert isinstance(s, str)

        self.s = s

    def apply(self, sigma, bindings={}):
        return self.s

    def __repr__(self):
        return "ConstStr(" + repr(self.s) + ")"





# The position expression CPos(𝑘) refers to the 𝑘𝑡h index in a given string 
# from the left side (or right side), if the integer constant 𝑘 is 
# non-negative (or negative).

class CPos:
    def __init__(self, k):
        assert isinstance(k, int)

        self.k = k

    def apply_str(self, s, bindings):
        # [CPos(𝑘)] 𝑠 = 
        #     k if k >= 0
        #     Length[s] + k otherwise
        if self.k >= 0: return self.k
        return len(s) + self.k

    def __repr__(self):
        return "CPos(" + str(self.k) + ")"




# Pos(r1 , r2 , c) is another position constructor, where r1 and r2 are some 
# regular expressions and integer expression c evaluates to a non-zero integer. 
# The Pos constructor evaluates to an index 𝑡 in a given string 𝑠 such that r1 
# matches some suffix of 𝑠[0 : 𝑡-1] and r2 matches some prefix of 𝑠[𝑡 : l-1], 
# where l = Length(𝑠). Furthermore, 𝑡 is the c𝑡h such match starting from the 
# left side (or the right side) if c is positive (or negative). 
# If not enough matches exist, then ⊥ is returned.

import re

class Pos:
    def __init__(self, r1, r2, c):
        # regular expressions
        self.r1 = r1
        self.r2 = r2

        # integer expression
        self.c = c

    def apply_str(self, s, bindings):
        c = unbind_integer(self.c, bindings)
        matches = list(re.finditer(regex(self.r1 + self.r2), s))
        
        match = matches[c]
        if len(self.r1) > 0:
            return match.end(len(self.r1))
        else:
            return match.start(1)

    def __repr__(self):
        return "Pos" + repr((self.r1, self.r2, self.c))

def unbind_integer(c, bindings):
    if isinstance(c, BoundVar): return c.unbind(bindings)
    return c

TokenStrings = {
    'NumTok': '\\d+',
    'NonNumTok': '[^\\d]+',
    'AlphTok': '[a-zA-Z]+',
    'NonAlphTok': '[^a-zA-Z]+',
    'LowerTok': '[a-z]+',
    'NonLowerTok': '[^a-z]+',
    'UpperTok': '[A-Z]+',
    'NonUpperTok': '[^A-Z]+',
    'AlphNumTok': '[a-zA-Z0-9]+',
    'NonAlphNumTok': '[^a-zA-Z0-9]+',
    'AlphNumWsTok': '[a-zA-Z0-9 ]+',
    'NonAlphNumWsTok': '[^a-zA-Z0-9 ]+',
    'WsTok': ' ',
    'StartTok': '^.',
    'EndTok': '.$',
    'DotTok': '\\.',
    'SlashTok': "[\\\/]",
    'BckSlashTok': "/",
    'BckSlashTok': "\\",
    'DashTok': '-',
    'LoDashTok': '_',
    'LeftParenTok': '\\(',
    'RightParenTok': '\\)',
    'HyphenTok': '\\-',
}


def regex(tokseq):
    return "".join(['(' + TokenStrings[tok] + ')' for tok in tokseq])
    

def fftest(prog, data):
    print prog
    for key, val in data.iteritems():
        sigma = [key]
        if isinstance(key, tuple): sigma = list(key)
        # print sigma
        output = prog.apply(sigma)
        if output == val:
            print "✅ ", sigma, "➙", output
        else:
            print "❌ ", sigma, "➙", output
            print "Expected", val
        # print prog.apply(sigma, bindings)


v1 = 0

print "Extract Numbers"

fftest(SubStr(v1, Pos([], ['NumTok'], 0), CPos(-1)), {
    "BTR KRNL WK CORN 15Z":              "15Z",
    "CAMP DRY DBL NDL 3.6 OZ":                  "3.6 OZ",
    "CHORE BOY HD SC SPNG 1 PK":         "1 PK",
    "FRENCH WORCESTERSHIRE 5 Z":         "5 Z",
    "O F TOMATO PASTE 6 OZ":             "6 OZ",
})


print "Directory Name Extraction"

fftest(SubStr(v1, CPos(0), Pos(['SlashTok'], [], -1)), {
    "Company/Code/index.html": "Company/Code/",
    "Company/Docs/Spec/specs.doc": "Company/Docs/Spec/",
})

print "Generate Abbreviation"

fftest(Loop('w', Concatenate(SubStr2(v1, ["UpperTok"], BoundVar('w')))), {
    "International Business Machines": "IBM",
    "Principles Of Programming Languages": "POPL",
    "International Conference on Software Engineering": "ICSE",
})

print "Split Odds"

p1 = Pos(['LeftParenTok'], ['NumTok', 'SlashTok'], BoundVar('w'))
p2 = Pos(['SlashTok', 'NumTok'], ['RightParenTok'], BoundVar('w'))
prog = Loop('w', Concatenate(SubStr(v1, p1, p2), ConstStr(' # ')))

fftest(prog, {
    "(6/7)(4/5)(14/1)": "6/7 # 4/5 # 14/1 # ",
    "49(28/11)(14/1)": "28/11 # 14/1 # ",
    "() (28/11)(14/1)": "28/11 # 14/1 # ",
})


print "Mixed Date Parsing"

prog = Switch(
    (Match(v1, ['SlashTok']), SubStr(v1, Pos(['StartTok'], [], 0), Pos([], ['SlashTok'], 0))),
    (Match(v1, ['DotTok']), SubStr(v1, Pos(['DotTok'], [], 0), Pos([], ['DotTok'], 1))),
    (Match(v1, ['HyphenTok']), SubStr(v1, Pos(['HyphenTok'], [], 1), Pos(['EndTok'], [], 0)))
)

fftest(prog, {
    "01/21/2001": "01",
    "22.02.2002": "02",
    "2003-23-03": "03"
})
