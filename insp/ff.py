#Automating String Processing in Spreadsheets Using Input-Output Examples

import re
import itertools

#Data Structures

class CPos:
    def __init__(self, pos):
        self.pos = pos
        
    def __repr__(self):
        return 'CPos(%s)' % self.pos

class Pos:
    def __init__(self, regexes_1, regexes_2, c_s):
        self.regexes_1 = regexes_1
        self.regexes_2 = regexes_2
        self.c_s = c_s

    def __repr__(self):
        return 'Pos(%s)' % repr((self.regexes_1, self.regexes_2, self.c_s))

class ConstStr:
    def __init__(self, str):
        self.str = str

    def __repr__(self):
        return 'ConstStr(%s)' % self.str

class SubStr:
    def __init__(self, str, positions_1, positions_2):
        self.str = str
        self.positions_1 = positions_1
        self.positions_2 = positions_2

    def __repr__(self):
        return 'SubStr' + repr((str, self.positions_1, self.positions_2))

class IParts:
    def __init__(self, s, t):
        self.s = s
        self.t = t

    def __repr__(self):
        return 'IParts(%s, %s)' % (self.s, self.t)

class DAG:
    def __init__(self, nodes, source_node, target_node, edges, WW):
        self.nodes = nodes
        self.source_node = source_node
        self.target_node = target_node
        self.edges = edges
        self.WW = WW

    def __repr__(self):
        return 'DAG' + repr(( self.nodes, self.source_node, self.target_node, self.edges, self.WW ))

#Utility Functions
def substring(s, i, j):
    return s[i:j+1]

def find_token_sequence(s):
    s = re.sub('[A-Z]', 'U', s)
    s = re.sub('[a-z]', 'L', s)
    s = re.sub(' ', 'S', s)
 
    #Removing consecutive duplicates in s
    return ''.join([x[0] for x in itertools.groupby(s)])

def regex(s):
    s = re.sub('U', '[A-Z]+', s)
    s = re.sub('L', '[a-z]+', s)
    s = re.sub('S', '\ +', s)
    return s

def match(reg, s):
    matches = []
    for i in range(0, len(s)):
        for j in range(i+1, len(s)+1):
            matches += re.findall(regex(reg), s[i:j])
    return matches

def unify_positions(positions1, positions2):
    result = list()
    for p1 in positions1:
        for p2 in positions2:
            if p1.__class__.__name__ == p2.__class__.__name__:
                if p1.__class__.__name__ == 'CPos':
                    k1 = p1.pos
                    k2 = p2.pos
                    print (k2 - k1),'w',k1
    return positions1

def unify_data_structures(ff1, ff2):
    if ff1.__class__.__name__ == 'ConstStr':
        if ff1.str == ff2.str:
            return ff1

    elif ff1.__class__.__name__ == 'SubStr':
        if ff1.str == ff2.str:
            return SubStr(ff1.str, unify_positions(ff1.positions_1, ff2.positions_2), unify_positions(ff1.positions_2, ff2.positions_2))
    
def unify_formulae(f1, f2):
    result = list()

    for ff1 in f1:
        for ff2 in f2:
            if ff1.__class__.__name__ == ff2.__class__.__name__:
                result.append(unify_data_structures(ff1, ff2))
    return list(set(result))

def unify(dag1, dag2):
    nodes = list(itertools.product(dag1.nodes, dag2.nodes))
    source_node = (dag1.source_node, dag2.source_node)
    target_node = (dag1.target_node, dag2.target_node)
    edges = list()
    for edge1 in dag1.edges:
        for edge2 in dag2.edges:
             edges += [(edge1[0], edge2[0]), (edge1[1], edge2[1])]
    
    WW = list()
    for f1 in dag1.WW.values():
        for f2 in dag2.WW.values():
             WW += unify_formulae(f1, f2)

    return DAG(nodes, source_node, target_node, edges, WW)

def is_substr_at(str, substr):
    return [m.start() for m in re.finditer(substr, str)]

#Functions
def generate_regex(r, s):
    return [IParts(s, t) for t in r]
    
def generate_position(s, k):
    result = [CPos(k), CPos(-(len(s) - k))]
   
    #r1 : Set of all regexes that match s[k1:k-1] for some k1
    #r2 : Set of all regexes that match s[k:k2] for some k2
    rr1 = [find_token_sequence(substring(s, k1, k-1)) for k1 in range(0, k)]
    rr2 = [find_token_sequence(substring(s, k, k2)) for k2 in range(k+1, len(s)+1)]
    
    for r1, r2 in itertools.product(rr1, rr2):
        r12 = r1 + r2
        
        matches = match(r12, s)
        substr = substring(s, rr1.index(r1), k+rr2.index(r2)+1)
        c = matches.index(substr)
        cc = len(matches)
        
        R1 = generate_regex(r1, s)
        R2 = generate_regex(r2, s)        
        
        result.append(Pos(R1, R2, [c, -(cc - c + 1)]))
 
    return list(set(result))

def generate_substring(sigma, s):
    result = []
    for i, column in enumerate(sigma):
        for k in is_substr_at(column, s):
            y1 = generate_position(column, k)
            y2 = generate_position(column, k + len(s))
            result.append(SubStr(column, y1, y2))
    return list(set(result))

def generate_loop(sigma, s, W):
    WW = W
    
    for k3 in range(0, len(s)):
        for k2 in range(0, len(s)):
            for k1 in range(0, len(s)):
                if k1<= k2-1 and k2<=k3:
                    E1 = generate_str(sigma, substring(s, k1, k2-1))
                    E2 = generate_str(sigma, substring(s, k2, k3))
                    unify(E1, E2)
                    
    return WW

def generate_str(sigma, s):
    nodes = [i for i in range(0, len(s)+1)]
    source_node, target_node = 0, len(s)
    edges = [(i, j) for j in range(1, len(s)+1) for i in range(0, j)]
    
    W = {}
    for edge in edges:
        substr = substring(s, edge[0], edge[1] - 1)
        W[edge] = [ConstStr(substr)] + generate_substring(sigma, substr)
    
    WW = generate_loop(sigma, s, W)
    return DAG(nodes, source_node, target_node, edges, WW)
