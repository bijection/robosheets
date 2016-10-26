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
        return "new SubStr( " + [this.vi, this.p1, this.p2].join(', ') +" )"
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
        
        var r = new RegExp('(' + to_regex_string(this.r1) + ')(' + to_regex_string(this.r2) + ')', 'g')

        var matches = all_matches(s, r)
        var match = array_index(matches, c)

        if(!match) throw new Error('Match Not Found')
        
        return match.index + match[1].length
    }

    toString(){
        return `new Pos( ${JSON.stringify(this.r1)}, ${JSON.stringify(this.r2)}, ${this.c})`
    }
}

function all_matches(s, re) {
    var m, matches = [];
    var lastI;
    while ((m = re.exec(s)) && m.index != lastI){
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
    'AlphNumTok': '[a-zA-Z0-9]+',
    'AlphNumWsTok': '[a-zA-Z0-9 ]+',
    'AlphTok': '[a-zA-Z]+',
    'BckSlashTok': "\\\\",
    'ColonTok': ':',
    'CommaTok': ',',
    'DashTok': '-',
    'DotTok': '\\.',
    'EndTok': '$',
    'HyphenTok': '\\-',
    'LeftAngleTok': '<',
    'LeftParenTok': '\\(',
    'LeftSquareTok': '<',
    'LoDashTok': '_',
    'LowerTok': '[a-z]+',
    'NonAlphNumTok': '[^a-zA-Z0-9]+',
    'NonAlphNumWsTok': '[^a-zA-Z0-9 ]+',
    'NonAlphTok': '[^a-zA-Z]+',
    'NonLowerTok': '[^a-z]+',
    'NonNumTok': '[^\\d]+',
    'NonUpperTok': '[^A-Z]+',
    'NumTok': '\\d+',
    'RightAngleTok': '>',
    'RightParenTok': '\\)',
    'RightSquareTok': '>',
    'SemicolonTok': ';',
    'SlashTok': "[\\\/]",
    'SlashTok': "\/",
    'StartTok': '^',
    'UpperTok': '[A-Z]+',
    'WsTok': ' ',
}


function regex(tokseq) {
    return new RegExp(tokseq.map(t => '(' + TokenStrings[t] + ')').join(''), 'g')
}
    

function fftest(prog, data) {
    // return;
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

let to_regex_string = seq => seq.map(t => TokenStrings[t]).join('')


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

function sample(arr){
    return arr[Math.floor(Math.random()*(arr.length - 1))]
}

class CPosSet {
    constructor(pos){
        this.pos = pos
    }

    sample(){
        return new CPos(this.pos)
    }
}


class PosSet {
    constructor(pre_regexes, post_regexes, places){
        this.pre_regexes = pre_regexes
        this.post_regexes = post_regexes
        this.places = places
    }

    sample(){
        return new Pos(
            this.pre_regexes.map(sample),
            this.post_regexes.map(sample),
            sample(this.places))
    }
}

class SubStrSet {
    constructor(vi, start_positions, end_positions){
        this.vi = vi
        this.start_positions = start_positions
        this.end_positions = end_positions
    }

    sample(){
        return new SubStr(v1,
            sample(this.start_positions).sample(),
            sample(this.end_positions).sample())
    }
}

class DAG {
    constructor(nodes, source_node, target_node, edges, edge_expressions){
        this.nodes = nodes
        this.edges = edges
        this.source_node = source_node
        this.target_node = target_node
        this.edge_expressions = edge_expressions
    }
}


var TokenNames = Object.keys(TokenStrings)

var TokenRegexes = {}
TokenNames.forEach(s => TokenRegexes[s] = new RegExp(TokenStrings[s]))

var TokenRegexesG = {}
TokenNames.forEach(s => TokenRegexesG[s] = new RegExp(TokenStrings[s], 'g'))

var TokenRegexesStart = {}
TokenNames.forEach(s => TokenRegexesStart[s] = new RegExp('^' + TokenStrings[s]))

var TokenRegexesSticky = {}
TokenNames.forEach(s => TokenRegexesSticky[s] = new RegExp(TokenStrings[s], 'y'))



function IParts(str) {
    var res = {}
    var seen = {}
    TokenNames.forEach(name => {
        var tok = TokenRegexesG[name]
        var m = tok.exec(str)
        var match = JSON.stringify([m && m.index, str.match(tok)])
        seen[match] = seen[match] || {}
        seen[match][name] = true
        res[name] = seen[match]
    })
    return res
}

function Reps(iparts){
    return Array.from(new Set(Object.values(iparts)), s=>Object.keys(s)[0])
}

// function find_token_sequence(s, reps){
//     var reps = reps || Reps(IParts(s))
//     var res = []

//     reps.forEach(rep => {
//         var token = TokenRegexesStart[rep]
//         var match = token.exec(s)
//         if(!match) return;

//         if(s === '') return res.push[rep]

//         var seq = find_token_sequence(
//             s.slice(match[0].length),
//             reps.filter(r => r != 'StartTok')
//         )
//         if(!seq.length) res.push([rep]);
//         else seq.forEach(subseq => res.push([rep].concat(subseq)));
//     })
//     return res
// }


// function find_token_sequences(before, after, reps){
//     var res = []
//     var s = before + after

//     var things_to_try = reps.map(t => {
//         var thing = [t]
//         let match = TokenRegexesStart[t].exec(s)

//         if(match && match[0].length <= before.length){
//             thing.index = match.index
//             return thing
//         }
//     }).filter(x => x)

//     let seqs = []

//     let seq;
//     while(seq = things_to_try.pop()){
//         reps.forEach(rep => {
//             var token = TokenRegexesSticky[rep]
//             token.lastIndex = seq.index
//             var match = token.exec(s)
//             if(!match) return;

//             var seqprime = [...seq, rep]
//             seqprime.index = match.index

//             things_to_try.unshift(seqprime)
//         })
//     }

    
//     return res
// }

// function token_sequence_to_regex(tokenSeq){
//     return new RegExp(tokenSeq.map(k => TokenStrings[k]).join(''), 'g')
// }

// function generate_position(s, k){

//     console.log('generate_position', k)

//     // heres a note we should probably add token interruption
//     let parts = IParts(s), reps = Reps(parts);
//     let result = [new CPosSet(k), new CPosSet(-(s.length - k + 1))]

//     let befores = [], afters = [];

//     for(let i = 0; i < k; i++){
//         let before = substring(s, i, k)
//         console.log('before', before)
//         befores = befores.concat(before)
//     }

//     for(let i = k + 1; i < s.length + 1; i++){
//         let after = substring(s, k, i)
//         console.log('after', after)
//         afters = afters.concat(afters)
//     }

//     for(let i = 0; i < befores.length; i++){
//         let r1 = befores[i];
//         for(let j = 0; j < afters.length; j++){
//             let r2 = afters[j];

//             // find_token_sequences(r1, r2, reps)

//             let r12 = r1.concat(r2);
            
//             let re = token_sequence_to_regex(r12)
//             let re1 = token_sequence_to_regex(['StartTok'].concat(r1))

//             let m, c = 0, total = 0;
//             console.log('regex is', re)
//             while (m = re.exec(s)){
//                 total++;
//                 console.log(m[0].match(re1).length, m.index, k)
//                 if(m[0].match(re1).length + m.index >= k-1) continue;
//                 c++;
//             }

//             // console.log(total, c)

//             let pos = new PosSet(
//                 r1.map(k => Object.keys(parts[k])),
//                 r2.map(k => Object.keys(parts[k])),
//                 [c - 1, -(total - c)]
//             )

//             if(pos.sample().apply_str(s) === k) result.push(pos);
//             // return result
//         }
//     }
//     return result;
// }

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};


function is_substr_at(str, substr){
    var re = new RegExp(RegExp.escape(substr), 'g'),
        m,
        indices = [];
    while(m = re.exec(str)){
        indices.push(m.index)
    }
    return indices
}

function generate_substring(sigma, s){
    if(!Array.isArray(sigma)) throw 'sigma should be an array of strings!'
    var result = []
    for(var i = 0; i < sigma.length; i++){
        var indices = is_substr_at(sigma[i], s)
        for(var k = 0; k < indices.length; k++){
            var y1 = generate_posSet_set(sigma[i], indices[k]),
                y2 = generate_posSet_set(sigma[i], indices[k] + s.length);
            result.push(new SubStrSet(i, y1, y2))
        }
    }
    return result
}

// new SubStr(0, new Pos (['AlphNumTok','AlphNumWsTok','NonUpperTok'], ['AlphTok', 'LowerTok', 'NonNumTok'], -1), new CPos(-5))
// SubStr(0, Pos (AlphNumTok,AlphNumWsTok,NonUpperTok, AlphTok,LowerTok,NonNumTok, -1), CPos(-4)) foo1



function generate_posSet_set(s, k){

    let bseq = []
    let bprog = []
    let eseq = []
    let eprog = []

    let parts = IParts(s)
    let reps = Reps(parts)

    reps.forEach(t => {
        let tok = TokenRegexesStart[t]
        let match = tok.exec(s)


        if(match) {
            let tseq = [t]
            let end = match.index + match[0].length

            if(end < k) {
                tseq.index = end
                bprog.push(tseq)
            } else if (end == k){
                bseq.push(tseq)                
            }
        }

        tok = TokenRegexesG[t]
        match = null
        let lastIndex;
        while( (match = tok.exec(s)) && match.index < k && match.index != lastIndex) lastIndex = match.index;

        if(match && match.index == k){
            let tseq = [t]
            let end = match.index + match[0].length

            if(end == s.length) {
                eseq.push(tseq)
                eseq.push([...tseq, 'EndTok'])
            } else {
                tseq.index = end
                eprog.push(tseq)
            }
        }
    })

    // before
    let seq;
    while(seq = bprog.pop()){
        reps.forEach(t => {
            let tok = TokenRegexesSticky[t]
            tok.lastIndex = seq.index
            let match = tok.exec(s)
            if(match && match.index == seq.index && match[0].length > 0){
                let end = match.index + match[0].length
                if(end == k){
                    bseq.push([...seq, t])
                } else if (end < k) {
                    let prog = [...seq, t]
                    prog.index = end
                    bprog.unshift(prog)
                }
            }
        })
    }

    // after
    while(seq = eprog.pop()){
        reps.forEach(t => {
            let tok = TokenRegexesSticky[t]
            tok.lastIndex = seq.index
            let match = tok.exec(s)
            if(match && match.index == seq.index){
                let end = match.index + match[0].length
                if(end == s.length){
                    eseq.push([...seq, t])
                    eseq.push([...seq, t, 'EndTok'])
                } else {
                    let prog = [...seq, t]
                    prog.index = end
                    eprog.unshift(prog)
                }
            }
        })
    }

    let possets = [new CPosSet(k), new CPosSet(k -(s.length + 1))]

    bseq.forEach(bs => {
        eseq.forEach(es => {
            let re = new RegExp('(' + to_regex_string(bs) + ')(' + to_regex_string(es) + ')', 'g')
            let match, c = 0, total = 0;
            while(match = re.exec(s)){
                if(match.index + match[1].length < k) c++;
                // else if(c == total) {
                //     console.log('c', c, 'k', k, match.index + match[1].length)
                //     console.assert(match.index + match[1].length === k)
                // }
                total++;
            }
            possets.push(new PosSet(
                bs.map(k => Object.keys(parts[k])),
                es.map(k => Object.keys(parts[k])),
                [c, -(total - c)]
            ))
        })
    })
    return possets
}



// function generate_loop(sigma, s, W){
//     let edge_expressions = W
    
//     for(let k1 = 0; k1 < s.length; k1++)
//     for(let k2 = k1; k2 < s.length; k2++)
//     for(let k3 = k2; k3 < s.length; k3++) {

//         let e1 = generate_str(sigma, substring(s, k1, k2))
//         let e2 = generate_str(sigma, substring(s, k2, k3))

//         let e = unify(e1, e2)

        
//     }
                   
//     return edge_expressions    
// }







var sig = ['1234foo1234']

var potentials = generate_substring(sig,  'foo')
var cand = sample(potentials).sample()
console.log('f = generate_substring(', sig, ',  "foo")')
console.log('  =', cand.toString())
console.log('f(', sig, ') =', cand.apply(sig))
