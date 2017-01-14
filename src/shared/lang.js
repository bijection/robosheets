import {
    all_matches,
    array_index,
    substring,
    unbind_integer,
    to_regex_string,
    regex
} from './utils'

import {NamedTransformations} from './transformations'

// Switch((b1, e1), ⋅⋅, (b𝑛, e𝑛))
export class Switch {
    constructor(...clauses){
        this.type = 'Switch'
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
export class Or {
    constructor(...d){
        this.type = 'Or'
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
export class And {
    constructor(...p){
        this.type = 'And'
        this.p = p
    }

    apply(sigma, bindings={}){
        return this.p.every( p => p.apply(sigma, bindings) )
    }

    toString(){
        return this.p.join(' or ')
    }
}

export class Not {
    constructor(m){
        this.type = 'Not'
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

export class Match {
    constructor(vi, r, k = 1){
        this.type = 'Match'
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
export class Concatenate {
    constructor(...exprs){
        this.type = 'Concatenate'
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

export class Loop {
    constructor(w, fn){
        this.type = 'Loop'
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

export class BoundVar {
    constructor(w, k1 = 1, k2 = 0){
        this.type = 'BoundVar'
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

export class SubStr {
    constructor(vi, p1, p2){
        this.type = 'SubStr'
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


export class ExtdSubStr {
    constructor(substring, f){
        this.type = 'ExtdSubStr'
        this.substring = substring
        this.f = f
    }

    apply(sigma, bindings){
        return NamedTransformations[this.f].transform(this.substring.apply(sigma, bindings))
    }

    toString(){
        return "new ExtdSubStr( " + [this.substring, this.f].join(', ') +" )"
    }
}


// We use the notation SubStr2(𝑣𝑖,r,c) to denote the c𝑡h occurrence
// of regular expression r in 𝑣𝑖 , i.e., SubStr(𝑣𝑖 , Pos(𝜖, r, c), Pos(r, 𝜖, c)). 
// We often denote SubStr(𝑣𝑖 , CPos(0), CPos(-1)) by simply 𝑣𝑖.

function SubStr2(vi, r, c){
    // TODO: double check
    return new SubStr(vi, new Pos([], r, c), new Pos(r, [], c))
}



export class ConstStr {
    constructor(s){
        this.type = 'ConstStr'
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

export class CPos {
    constructor(k){
        this.type = 'CPos'
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

export class Pos {
    constructor(r1, r2, c){
        this.type = 'Pos'
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