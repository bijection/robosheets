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
    return s.substring(i, j + 1)
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
    WsTok: '\s',
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

function generate_position(s, k){
    // heres a note we should probably add token interruption
    var result = [new CPos(k), new CPos(-(s.length - k))]

    var rr1 = [], rr2 = [];
    for(var i = 0; i < k; i++){
        rr1 = rr1.concat(find_token_sequence(substring(s, i, k-1)))
    }
    for(var i = k + 1; i < s.length + 1; i++){
        rr2 = rr2.concat(find_token_sequence(substring(s, k, i)))
    }
    for(var i = 0; i < rr1.length; i++){
        var r1 = rr1[i];
        for(var j = 0; j < rr2.length; j++){
            var r2 = rr2[j];
            var r12 = r1.concat(r2);
            var matches = matchall(r12, s)
            var c = matches.findIndex(x => x > k)
            result.push(new Pos(
                generate_regex(r1, s),
                generate_regex(r2, s),
                [c, -(matches.length - c)]
            ))
            // return result
        }
    }
    return result;
}


function generate_regex(re, s){
    var parts = IParts(s)
    return re.map(k => parts[k])
}

function token_sequence_to_regex(tokenSeq){
    return new RegExp(tokenSeq.map(k => tokenStrings[k]).join(''), 'g')
}

function matchall(tokenSeq, str){
    var re = token_sequence_to_regex(tokenSeq),
        m,
        indices = [];
        // console.log(re, str)
    while(m = re.exec(str)){
        indices.push(m.index + m[0].length)
    }
    // console.log(indices)
    return indices
}

function generate_substring(sigma, s){
    var result = []
    for(var i = 0; i < sigma.length; i++){
        var indices = is_substr_at(sigma[i], s)
        for(var k = 0; k < indices.length; k++){
            var y1 = generate_position(sigma[i], indices[k]),
                y2 = generate_position(sigma[i], indices[k] + s.length);
            result.push(new SubStr(i, y1, y2))
        }
    }
    return result
}

RegExp.escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function is_substr_at(str, substr){
    var re = new RegExp(RegExp.escape(substr), 'g'),
        m,
        indices = [];
    while(m = re.exec(str)){
        indices.push(m.index)
    }
    return indices
}

function generate_loop(sigma, s, W){
    var edge_expressions = W
    
    for k3 in range(0, len(s)):
        for k2 in range(0, len(s)):
            for k1 in range(0, len(s)):
                if k1<= k2-1 and k2<=k3:
                    E1 = generate_str(sigma, substring(s, k1, k2-1))
                    E2 = generate_str(sigma, substring(s, k2, k3))
                    unify(E1, E2)
                    
    return edge_expressions    
}

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
    











var test = '01234 is cool'