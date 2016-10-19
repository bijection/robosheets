class CPos {
	constructor(pos){
		this.pos = pos
	}
}

class Pos {
    constructor(pre_regexes, post_regexes, places){
        this.pre_regexes = pre_regexes
        this.post_regexes = post_regexes
        this.places = places
    }
}

class ConstStr{
	constructor(str){
		this.str = str
	}
}

class SubStr{
	constructor(str, start_positions, end_positions){
        this.str = str
        this.start_positions = start_positions
        this.end_positions = end_positions
    }
}

// class IParts{
//     constructor(s, t) {
//         this.s = s
//         this.t = t    	
//     }
// }

class DAG {
    constructor(nodes, source_node, target_node, edges, edge_expressions){
        this.nodes = nodes
        this.edges = edges
        this.source_node = source_node
        this.target_node = target_node
        this.edge_expressions = edge_expressions
    }
}

// Utility Functions
function substring(s, i, j){
    return s.substr(i, j)
}

var tokenStrings = {
    NumTok: '\\d+',
    NonNumTok: '[^\\d]+',
    AlphTok: '[a-zA-Z]+',
    NonAlphTok: '[^a-zA-Z]+',
    LowerTok: '[a-z]+',
    NonLowerTok: '[^a-z]+',
    UpperTok: '[A-Z]+',
    NonUpperTok: '[^A-Z]+',
    AlphNumTok: '[a-zA-Z0-9]+',
    NonAlphNumTok: '[^a-zA-Z0-9]+',
    AlphNumWsTok: '[a-zA-Z0-9 ]+',
    NonAlphNumWsTok: '[^a-zA-Z0-9 ]+',
    WsTok: ' ',
    // StartTok: '^.', // these are not supported to make generate_position easier to implement
    // EndTok: '.$',
    DotTok: '\\.',
    FwdSlashTok: '\\/',
    BckSlashTok: '\\\\',
    DashTok: '-',
    LoDashTok: '_',
}

var tokenNames = Object.keys(tokenStrings)
var tokenRegexes = {}
tokenNames.forEach(s => {
    tokenRegexes[s] = new RegExp(tokenStrings[s])
})
var tokenRegexesG = {}
tokenNames.forEach(s => {
	tokenRegexesG[s] = new RegExp(tokenStrings[s], 'g')
})

function IParts(str) {
    var res = {}
    var seen = {}
    tokenNames.forEach(tokenName => {
        var match = JSON.stringify(str.match(tokenRegexesG[tokenName]))
        seen[match] = seen[match] || {}
        seen[match][tokenName] = true
        res[tokenName] = seen[match]
    })
    return res
}

function Reps(iparts){
    return Array.from(new Set(Object.values(iparts)), s=>Object.keys(s)[0])
}

// function find_token_sequence_1(s){
//     var res = []
//     var reps = Reps(IParts(s))
//     var tokens = reps.map(r => new RegExp('^'+tokenStrings[r]))
//     var i = 0
//     while(s.length){
//         var j = i++ %tokens.length
//         var match = tokens[j].exec(s)
//         if(match) {
//             // console.log(match[0])
//             s = s.slice(match[0].length)
//             res.push(reps[j])
//         }
//     }
    
//     return res
// }

function find_token_sequence(s, reps){
    var res = []
    var reps = reps || Reps(IParts(s))
    reps.forEach(rep => {
        var token = new RegExp('^'+tokenStrings[rep])
        var match = token.exec(s)
        if(match){
            var seq = find_token_sequence(s.slice(match[0].length), reps)
            if(!seq.length) res.push([rep]);
            seq.forEach(subseq => res.push([rep].concat(subseq)))
        }
    })
    return res
}

// function generate_position(s, k):
//     var result = [CPos(k), CPos(-(s.length - k))]
   
//     // r1 : Set of all regexes that match s[k1:k-1] for some k1
//     // r2 : Set of all regexes that match s[k:k2] for some k2
//     rr1 = [find_token_sequence(substring(s, k1, k-1)) for k1 in range(0, k)]
//     rr2 = [find_token_sequence(substring(s, k, k2)) for k2 in range(k+1, len(s)+1)]
    
//     for r1, r2 in itertools.product(rr1, rr2):
//         r12 = r1 + r2
        
//         matches = match(r12, s)
//         substr = substring(s, rr1.index(r1), k+rr2.index(r2)+1)
//         c = matches.index(substr)
//         cc = len(matches)
        
//         R1 = generate_regex(r1, s)
//         R2 = generate_regex(r2, s)        
        
//         result.append(Pos(R1, R2, [c, -(cc - c + 1)]))
 
//     return list(set(result))

// function regex(s):
//     s = re.sub('U', '[A-Z]+', s)
//     s = re.sub('L', '[a-z]+', s)
//     s = re.sub('S', '\ +', s)
//     return s

// function match(reg, s):
//     matches = []
//     for i in range(0, len(s)):
//         for j in range(i+1, len(s)+1):
//             matches += re.findall(regex(reg), s[i:j])
//     return matches

// function unify_positions(positions1, positions2):
//     result = list()
//     for p1 in positions1:
//         for p2 in positions2:
//             if p1.__class__.__name__ == p2.__class__.__name__:
//                 if p1.__class__.__name__ == 'CPos':
//                     k1 = p1.pos
//                     k2 = p2.pos
//                     print (k2 - k1),'w',k1
//     return positions1

// function unify_data_structures(ff1, ff2):
//     if ff1.__class__.__name__ == 'ConstStr':
//         if ff1.str == ff2.str:
//             return ff1

//     elif ff1.__class__.__name__ == 'SubStr':
//         if ff1.str == ff2.str:
//             return SubStr(ff1.str, unify_positions(ff1.start_positions, ff2.end_positions), unify_positions(ff1.end_positions, ff2.end_positions))
    
// function unify_formulae(f1, f2):
//     result = list()

//     for ff1 in f1:
//         for ff2 in f2:
//             if ff1.__class__.__name__ == ff2.__class__.__name__:
//                 result.append(unify_data_structures(ff1, ff2))
//     return list(set(result))

// function unify(dag1, dag2):
//     nodes = list(itertools.product(dag1.nodes, dag2.nodes))
//     source_node = (dag1.source_node, dag2.source_node)
//     target_node = (dag1.target_node, dag2.target_node)
//     edges = list()
//     for edge1 in dag1.edges:
//         for edge2 in dag2.edges:
//              edges += [(edge1[0], edge2[0]), (edge1[1], edge2[1])]
    
//     edge_expressions = list()
//     for f1 in dag1.edge_expressions.values():
//         for f2 in dag2.edge_expressions.values():
//              edge_expressions += unify_formulae(f1, f2)

//     return DAG(nodes, source_node, target_node, edges, edge_expressions)

// function is_substr_at(str, substr):
//     return [m.start() for m in re.finditer(substr, str)]

// // Functions
// function generate_regex(r, s):
//     return [IParts(s, t) for t in r]
    


// function generate_substring(sigma, s):
//     result = []
//     for i, column in enumerate(sigma):
//         for k in is_substr_at(column, s):
//             y1 = generate_position(column, k)
//             y2 = generate_position(column, k + len(s))
//             result.append(SubStr(column, y1, y2))
//     return list(set(result))

// function generate_loop(sigma, s, W):
//     edge_expressions = W
    
//     for k3 in range(0, len(s)):
//         for k2 in range(0, len(s)):
//             for k1 in range(0, len(s)):
//                 if k1<= k2-1 and k2<=k3:
//                     E1 = generate_str(sigma, substring(s, k1, k2-1))
//                     E2 = generate_str(sigma, substring(s, k2, k3))
//                     unify(E1, E2)
                    
//     return edge_expressions

// function generate_str(sigma, s):
//     nodes = [i for i in range(0, len(s)+1)]
//     source_node, target_node = 0, len(s)
//     edges = [(i, j) for j in range(1, len(s)+1) for i in range(0, j)]
    
//     W = {}
//     for edge in edges:
//         substr = substring(s, edge[0], edge[1] - 1)
//         W[edge] = [ConstStr(substr)] + generate_substring(sigma, substr)
    
//     edge_expressions = generate_loop(sigma, s, W)
//     return DAG(nodes, source_node, target_node, edges, edge_expressions)
