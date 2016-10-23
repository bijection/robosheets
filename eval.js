// coding=utf8

// note that in this implementation, strings are 0-indexed
// rather than 1-indexed as in the paper. 


// helpers
function substring(s, i, j){
    return s.substring(i, j)
}


// Switch((b1, e1), ⋅⋅, (b𝑛, e𝑛))
class Switch {
    constructor(...clauses){
        // assert isinstance(clauses, tuple)
        this.clauses = clauses
    }

    apply(sigma, bindings={}){
        for(var [b, e] of this.clauses) {
            var res = b.apply(sigma, bindings)
            if(res){
                // print "matched predicate", sigma, b
                return e.apply(sigma, bindings)
            }   
        }
    }

    toString(){
        return 'Switch {\n\t' + this.clauses.map(([b,e]) => b + ": " + e).join('\n\t') + '\n}'
    } 
        
}

// Bool b := d1 ∨ ⋅ ⋅ ∨ d𝑛
class Or {
    constructor(...d){
        this.d = d
    }

    apply(sigma, bindings={}){
        return this.d.some( d => d.apply(sigma, bindings) )
    }

    toString(){
        return this.d.join(' or ')
    }
}

// Conjunct d := 𝜋1 ∧⋅⋅∧𝜋𝑛
class And {
    constructor(...p){
        this.p = p
    }

    apply(sigma, bindings={}){
        return this.p.every( p => p.apply(sigma, bindings) )
    }

    toString(){
        return this.p.join(' or ')
    }
}

class Not {
    constructor(m){
        // assert instanceof(m, Match)
        this.m = m     
    }

    apply(sigma, bindings={}){
        return !this.m.apply(sigma, bindings)
    }

    toString(){
        return 'not ' + this.m
    }
}

// Boolean expressions b are represented in DNF form and are boolean 
// combinations of predicates of the form Match(𝑣𝑖, r, 𝑘), where r is 
// some regular expression and 𝑘 is some integer constant. 

// We often denote Match(𝑣𝑖,r) by simply Match(𝑣𝑖 , r, 1).

class Match {
    constructor(vi, r, k = 1){
        // assert isinstance(vi, int)
        // assert isinstance(k, int)

        // r must be a token sequence

        this.vi = vi
        this.r = r
        this.k = k        
    }

    apply(sigma, bindings={}){
        // Match(𝑣𝑖, r, 𝑘) evaluates to true iff 𝑣𝑖 contains at least 𝑘 
        // matches of regular expression r. 
        // print regex(this.r)
        var s = sigma[this.vi]
        var r = regex(this.r)

        var matches = all_matches(s, r)
        return matches && matches.length >= this.k
    }

    toString(){
        return 'Match (' + [this.vi, this.r, this.k].join(', ') + ')'
    }
}

// [Concatenate(f1, ⋅⋅ fn)] = Concatenate([f1] 𝜎, ⋅⋅, [f𝑛] 𝜎)
class Concatenate{
    constructor(...exprs){
        // assert isinstance(exprs, tuple)
        this.exprs = exprs
    }

    apply(sigma, bindings={}){
        return this.exprs.map( e => e.apply(sigma, bindings) ).join('')
    }
    
    toString(){
        return this.exprs.join(" + ")
    }
}

// The string expression Loop(𝜆𝑤 : e) refers to concatenation of e1, e2, . . . , e𝑛, 
// where e𝑖 is obtained from e by replacing all occurrences of 𝑤 by 𝑖. 𝑛 is the 
// smallest integer such that evaluation of e𝑛+1 yields ⊥. It is also possible to 
// define more interesting termination conditions (based on position expression, 
// or predicates), but we leave out details for lack of space.

class Loop {
    constructor(w, fn){
        this.w = w
        this.fn = fn
    }

    apply(sigma, bindings={}){
        return LoopR(this.w, this.fn, 0, sigma, bindings)
    }

    toString(){
        return "Loop(" + this.w + ": " + this.fn + ")"
    }
}

function LoopR(w, fn, k, sigma, bindings){
    var new_bindings = {}
    Object.getOwnPropertyNames(bindings).forEach(key => new_bindings[key] = bindings[key])
    new_bindings[w] = k
    // using errors to signal loop termination is totally jank    
    try{
        t = fn.apply(sigma, new_bindings)
    } catch(e) {
        return ""
    }
    return t + LoopR(w, fn, k + 1, sigma, bindings)
}

class BoundVar {
    constructor(w, k1 = 1, k2 = 0){
        this.w = w
        this.k1 = k1
        this.k2 = k2
    }

    unbind(bindings){
        if (this.w in bindings) return bindings[this.w];
        console.warn("unable to unbind", this.w, bindings)
    }
    
    toString(){
        return "𝜆" + this.w
    }
}



// The SubStr(𝑣𝑖, p1, p2) constructor makes use of two position expressions 
// p1 and p2, each of which evaluates to an index within the string 𝑣𝑖.
// SubStr(𝑣𝑖,p1,p2) denotes the substring of string 𝑣𝑖 that starts at index 
// specified by p1 and ends at index specified by p2-1. 
// If either of p1 or p2 refer to an index that is outside the range of 
// string 𝑣𝑖, then the SubStr constructor returns ⊥.

class SubStr{
    constructor(vi, p1, p2){
        // assert isinstance(vi, int)
        // assert isinstance(p1, (Pos, CPos))
        // assert isinstance(p2, (Pos, CPos))

        this.vi = vi
        // position expressions 
        this.p1 = p1
        this.p2 = p2        
    }

    apply(sigma, bindings={}){
        var s = sigma[this.vi]
        return substring(s, this.p1.apply_str(s, bindings), this.p2.apply_str(s, bindings))
    }

    toString(){
        return "SubStr(" + [this.vi, this.p1, this.p2].join(', ') +")"
    }
}

// We use the notation SubStr2(𝑣𝑖,r,c) to denote the c𝑡h occurrence
// of regular expression r in 𝑣𝑖 , i.e., SubStr(𝑣𝑖 , Pos(𝜖, r, c), Pos(r, 𝜖, c)). 
// We often denote SubStr(𝑣𝑖 , CPos(0), CPos(-1)) by simply 𝑣𝑖.

function SubStr2(vi, r, c){
    // TODO: double check
    return new SubStr(vi, new Pos([], r, c), new Pos(r, [], c))
}



class ConstStr{
    constructor(s){
        // assert isinstance(s, str)

        this.s = s
    }

    apply(sigma, bindings={}){
        return this.s
    }

    toString(){
        return "ConstStr(" + this.s + ")"
    }
}




// The position expression CPos(𝑘) refers to the 𝑘𝑡h index in a given string 
// from the left side (or right side), if the integer constant 𝑘 is 
// non-negative (or negative).

class CPos{
    constructor(k){
        // assert isinstance(k, int)

        this.k = k
    }

    apply_str(s, bindings){
        // [CPos(𝑘)] 𝑠 = 
        //     k if k >= 0
        //     Length[s] + k otherwise
        return this.k >= 0 ? this.k : s.length + this.k + 1
    }

    toString() {
        return "CPos(" + this.k + ")"
    }
}



// Pos(r1 , r2 , c) is another position constructor, where r1 and r2 are some 
// regular expressions and integer expression c evaluates to a non-zero integer. 
// The Pos constructor evaluates to an index 𝑡 in a given string 𝑠 such that r1 
// matches some suffix of 𝑠[0 : 𝑡-1] and r2 matches some prefix of 𝑠[𝑡 : l-1], 
// where l = Length(𝑠). Furthermore, 𝑡 is the c𝑡h such match starting from the 
// left side (or the right side) if c is positive (or negative). 
// If not enough matches exist, then ⊥ is returned.

// import re

class Pos{
    constructor(r1, r2, c){
        // regular expressions
        this.r1 = r1
        this.r2 = r2

        // integer expression
        this.c = c
    }

    apply_str(s, bindings){
        var c = unbind_integer(this.c, bindings)
        
        var r = regex(this.r1.concat(this.r2))

        var matches = all_matches(s, r)
        var match = array_index(matches, c)

        if(!match) throw new Error('Match Not Found')
        
        return this.r1.length > 0 
        ?   match.index + match.slice(1, 1 + this.r1.length).join('').length
        :   match.index
    }

    toString(){
        return "Pos (" + [this.r1, this.r2, this.c].join(', ') +')'
    }
}

function all_matches(s, re) {
    var m, matches = [];
    var lastI;
    while (m = re.exec(s) && m.index === lastI){
        lastI = m.index
        matches.push(m);
    }
    return matches;
}

function array_index(arr, index){
    if(index < 0){
        return arr[arr.length + index]
    }else{
        return arr[index]
    }
}

function unbind_integer(c, bindings){
    return c instanceof BoundVar
    ?   c.unbind(bindings)
    :   c
}


// We use the following collection of character classes 𝐶: 
// - Numeric Digits (0-9), 
// - Alphabets (a-zA-Z), 
// - Lowercase alphabets (a-z), 
// - Uppercase alphabets (A-Z), 
// - Accented alphabets, 
// - Alphanumeric characters, 
// - Whitespace characters, 
// - All characters. 
// We use the following SpecialTokens:
// - StartTok: Matches the beginning of a string. 
// - EndTok: Matches the end of a string.
// - A token for each special character, 
//   such as hyphen, dot, semicolon, colon, 
//   comma, backslash, forwardslash, 
//   left/right parenthesis/bracket etc.


// For better readability, we reference tokens by representative names. 
// For example, AlphTok refers to a sequence of alphabetic characters,
// NumTok refers to a sequence of numeric digits, NonDigitTok refers to 
// a sequence of characters that are not numeric digits, HyphenTok matches 
// with the hyphen character.


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
    'StartTok': '^',
    'EndTok': '$',
    'DotTok': '\\.',
    'SlashTok': "[\\\/]",
    'BckSlashTok': "/",
    'BckSlashTok': "\\",
    'DashTok': '-',
    'LoDashTok': '_',
    'ColonTok': ':',
    'CommaTok': ',',
    'SemicolonTok': ';',
    'LeftAngleTok': '<',
    'RightAngleTok': '>',
    'LeftSquareTok': '<',
    'RightSquareTok': '>',
    'LeftParenTok': '\\(',
    'RightParenTok': '\\)',
    'HyphenTok': '\\-',
}


function regex(tokseq) {
    return new RegExp(tokseq.map(t => '(' + TokenStrings[t] + ')').join(''), 'g')
}
    

function fftest(prog, data) {
    console.log(prog.toString())
    Object.getOwnPropertyNames(data).forEach(key => {
        var val = data[key]
        var sigma = [key]
        // if isinstance(key, tuple): sigma = list(key)
        // print sigma
        output = prog.apply(sigma)
        output == val
        ?   console.log( "✅ ", sigma, "➙", output )
        :   console.log( "❌ ", sigma, "➙", output, "\nExpected", val)
        // print prog.apply(sigma, bindings)
    })
}


var v1 = 0

console.log("Extract Numbers")

fftest(new SubStr(v1, new Pos([], ['NumTok'], 0), new CPos(-1)), {
    "BTR KRNL WK CORN 15Z":              "15Z",
    "CAMP DRY DBL NDL 3.6 OZ":                  "3.6 OZ",
    "CHORE BOY HD SC SPNG 1 PK":         "1 PK",
    "FRENCH WORCESTERSHIRE 5 Z":         "5 Z",
    "O F TOMATO PASTE 6 OZ":             "6 OZ",
})


console.log("Directory Name Extraction")

fftest(new SubStr(v1, new CPos(0), new Pos(['SlashTok'], [], -1)), {
    "Company/Code/index.html": "Company/Code/",
    "Company/Docs/Spec/specs.doc": "Company/Docs/Spec/",
})

console.log("Generate Abbreviation")

fftest(new Loop('w', new Concatenate(SubStr2(v1, ["UpperTok"], new BoundVar('w')))), {
    "International Business Machines": "IBM",
    "Principles Of Programming Languages": "POPL",
    "International Conference on Software Engineering": "ICSE",
})

console.log("Split Odds")

p1 = new Pos(['LeftParenTok'], ['NumTok', 'SlashTok'], new BoundVar('w'))
p2 = new Pos(['SlashTok', 'NumTok'], ['RightParenTok'], new BoundVar('w'))
prog = new Loop('w', new Concatenate(new SubStr(v1, p1, p2), new ConstStr(' # ')))

fftest(prog, {
    "(6/7)(4/5)(14/1)": "6/7 # 4/5 # 14/1 # ",
    "49(28/11)(14/1)": "28/11 # 14/1 # ",
    "() (28/11)(14/1)": "28/11 # 14/1 # ",
})


console.log("Mixed Date Parsing")

prog = new Switch(
    [new Match(v1, ['SlashTok']), new SubStr(v1, new Pos(['StartTok'], [], 0), new Pos([], ['SlashTok'], 0))],
    [new Match(v1, ['DotTok']), new SubStr(v1, new Pos(['DotTok'], [], 0), new Pos([], ['DotTok'], 1))],
    [new Match(v1, ['HyphenTok']), new SubStr(v1, new Pos(['HyphenTok'], [], 1), new Pos(['EndTok'], [], 0))]
)

fftest(prog, {
    "01/21/2001": "01",
    "22.02.2002": "02",
    "2003-23-03": "03"
})




// class IParts:
//     constructor(s, t):
//         this.s = s
//         this.t = t

//     toString():
//         return 'IParts(%s, %s)' % (this.s, this.t)


// def generate_regex(r, s):
//     return [IParts(s, t) for t in r]



// A regular expression r = TokenSeq(T1 , ⋅⋅, T𝑛 ) is a sequence of tokens 
// T1,⋅⋅,T𝑛. We often refer to singleton token sequences TokenSeq(T1) simply 
// as T1. We use the notation 𝜖 to denote an empty sequence of tokens.
// 𝜖 matches an empty string.


// def intersect(a, b):
//     // Intersect(Dag(𝜂 ̃1,𝜂1,𝜂1,𝜉1,𝑊1),Dag(𝜂 ̃2,𝜂2,𝜂2,𝜉2,𝑊2)) = 
//     //    Dag(𝜂 ̃1 ×𝜂 ̃2,(𝜂1,𝜂2),(𝜂1,𝜂2),𝜉12,𝑊12)
//     //  where  𝜉12 = {⟨(𝜂1, 𝜂2), (𝜂1, 𝜂2)⟩ ∣ ⟨𝜂1, 𝜂1⟩ ∈ 𝜉1, ⟨𝜂2, 𝜂2⟩ ∈ 𝜉2}
//     //  and 𝑊12(⟨(𝜂1,𝜂2),(𝜂1,𝜂2)⟩)={Intersect( ̃f, ̃f)∣ ̃f∈𝑊1(⟨𝜂1,𝜂1⟩), ̃f ∈𝑊2(⟨𝜂2,𝜂2⟩)}
//     if isinstance(a, Dag) and isinstance(b, Dag):
//         pass

//     // Intersect(SubStr(𝑣𝑖 , { ̃p𝑗 }𝑗 , { ̃p𝑘 }𝑘 ), SubStr(𝑣𝑖′ , { ̃p′l }l , { ̃p𝑚 }𝑚 )) =
//     // SubStr(𝑣𝑖 , {IntersectPos( ̃p𝑗 ,  ̃pl )}𝑗,l , {IntersectPos( ̃p𝑘, ̃p𝑚)}𝑘,𝑚) if 𝑣𝑖 = 𝑣𝑖′

//     if isinstance(a, SubStr) and isinstance(b, SubStr):
//         if a.vi == b.vi:
//             return SubStr(a.vi, )

//     // Intersect(ConstStr(𝑠1 ), ConstStr(𝑠2 )) = ConstStr(𝑠1 ) if 𝑠1 = 𝑠2
//     if isinstance(a, ConstStr) and isinstance(b, ConstStr):
//         if a.s == b.s: return a


