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

function generate_short_posSet_set(s, k){

    let bseq = []
    let eseq = []

    let parts = IParts(s)
    let reps = Reps(parts)
    let beginnings = {}
    let endings = {}

    reps.forEach(t => {
        let tok = TokenRegexesG[t]
        let matches = all_matches(s, tok)
        matches.forEach(match => {
            let begin = match.index
            let end = match.index + match[0].length

            beginnings[begin] = beginnings[begin] || []
            beginnings[begin].push({t, end})

            endings[end] = endings[end] || []
            endings[end].push({t, begin})
        })
    })

    endings[k] && endings[k].forEach(e1 => {
        bseq.push([e1.t])

        endings[e1.begin] && endings[e1.begin].forEach(e2 => {
            bseq.push([e2.t, e1.t])

            // endings[e2.begin] && endings[e2.begin].forEach(e3 => {
            //     bseq.push([e3.t, e2.t, e1.t])
            // })
        })
    })

    beginnings[k] && beginnings[k].forEach(b1 => {
        eseq.push([b1.t])

        beginnings[b1.end] && beginnings[b1.end].forEach(b2 => {
            eseq.push([b1.t, b2.t])

            // beginnings[b2.end] && beginnings[b2.end].forEach(b3 => {
            //     eseq.push([b1.t, b2.t, b3.t])
            // })
        })
    })

    let possets = [new CPosSet(k), new CPosSet(k -(s.length + 1))]


    let bwau = bseq.map(bs => [bs, bs.map(k => Object.keys(parts[k]))])
    let ewau = eseq.map(es => [es, es.map(k => Object.keys(parts[k]))])


    bwau.forEach(([bs, bre]) => {
        ewau.forEach(([es, ere]) => {
            let re = new RegExp('(' + to_regex_string(bs) + ')(' + to_regex_string(es) + ')', 'g')
            let match, c = 0, total = 0, last;
            while(match = re.exec(s)){
                if(match.index === last) break;
                last = match.index
                if(match.index + match[1].length < k) c++;
                // else if(c == total) {
                //     console.log('c', c, 'k', k, match.index + match[1].length)
                //     console.assert(match.index + match[1].length === k)
                // }
                total++;
            }
            possets.push(new PosSet(bre, ere, [c, -(total - c)] ))
        })
    })
    return possets
}



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
            if(match && match.index == seq.index && match[0].length){
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


function generate_substring(sigma, s){

    // console.log('sub', s)

    if(!Array.isArray(sigma)) throw 'sigma should be an array of strings!'
    var result = []
    for(var i = 0; i < sigma.length; i++){
        var indices = is_substr_at(sigma[i], s)

        let posSet_sets = {}
        let get_set = j => {
            if(!posSet_sets[j]) posSet_sets[j] = generate_short_posSet_set(sigma[i], j)
            return posSet_sets[j]
        }

        for(var k = 0; k < indices.length; k++){
            // var y1 = generate_position(sigma[i], indices[k]),
            //     y2 = generate_position(sigma[i], indices[k] + s.length);
            var y1 = get_set(indices[k][0]),
                y2 = get_set(indices[k][0] + indices[k][1]);
            result.push(new SubStrSet(i, y1, y2))
        }
        
        Transformations.forEach(t => {
            if(t.could_produce(s)){
                let indices = is_substr_at(sigma[i], t.inverse_transform(s))
                for(var k = 0; k < indices.length; k++){
                    var y1 = get_set(indices[k][0]),
                        y2 = get_set(indices[k][0] + indices[k][1]);
                    result.push(new ExtdSubStrSet(new SubStrSet(i, y1, y2), t.transform))
                }
            }
        })
    }
    return result
}


function generate_str(sigma, s, shouldloop=true){
    let W = {}, edges = [], nodes = []
    for(let i = 0; i <= s.length; i++){
        nodes.push(i)
        for(let j = i+1; j <= s.length; j++) {
            let edge = [i,j], 
                part = substring(s,i,j)
            edges.push(edge)
            let substr = generate_substring(sigma, part)
            W[JSON.stringify(edge)] = [new ConstStrSet(part), ...substr]
        }
    }
    // if(shouldloop) W = generate_loop(sigma, s, W)
    return new DAG(nodes, 0, s.length, edges, W)
}

// The Concatenate constructor used in our string language is generalized to the
// Dag constructor

// Dag(~η, ηs, ηt, ~ξ, W)
// ~η is a set of nodes containing two distinctly marked source and target nodes ηs, ηt
// ηs source node
// ηt target node
// ~ξ is a set of edges over nodes in ~η that induces a DAG
// W maps each edge in ~ξ to a set of atomic expressions

function generate_str_kevin(sigma, s){
    if(!Array.isArray(sigma)) throw 'sigma should be an array of strings!';

    var nodes = _.range(1 + s.length);
    var source = 0;
    var target = s.length; // TODO: watch out for 1-indexing
    var edges = []

    // ~ξ = { <i, j> | 0 <= i < j <= Length(s) }
    for(let j = 0; j <= s.length; j++){
        for(let i = 0; i < j; i++){
            edges.push([i, j])
        }
    }

    // Let W be the mapping that maps edge <i, j> in ~ξ to the set
    // { ConstStr(s[i:j-1]) U GenerateSubstring(sigma, s[i:j-1]) }

    var map = {};
    edges.forEach(edge => {
        var sij = substring(s, edge[0], edge[1])
        var key = JSON.stringify(edge)
        map[key] = generate_substring(sigma, sij)
            .concat([new ConstStrSet(sij)])
    })

    // note that while here the edges are tuples of numbers
    // in full generality they may be arbitrarily nested
    // tuples of tuples of tuples of numbers

    return new DAG(nodes, source, target, edges, map);
}





function intersect(a, b){
    if(Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)){
        return null
    }

    if(a instanceof DAG && b instanceof DAG){
        return intersect_dags(a, b)
    }else if(a instanceof ConstStrSet && b instanceof ConstStrSet){
        if(a.s === b.s) return a;
    }else if(a instanceof SubStrSet && b instanceof SubStrSet){
        return intersect_substrsets(a, b)
    }else if(a instanceof ExtdSubStrSet && b instanceof ExtdSubStrSet){
        return intersect_extdsubstrsets(a, b)
    }else{
        console.log(a, b)    
    }
}

function intersect_dags(d1, d2){
    let nodes = cross(d1.nodes, d2.nodes)
    let W = {}
    let edges = [];

    cross(d1.edges, d2.edges).forEach(([e1, e2]) => {
        let edge = [[e1[0], e2[0]], [e1[1], e2[1]]];
        var intersection = []
        let k1 = JSON.stringify(e1)
        let k2 = JSON.stringify(e2)

        let d1_edge_programs = d1.map[k1]
        let d2_edge_programs = d2.map[k2]


        cross(d1_edge_programs, d2_edge_programs).forEach(([f1, f2]) => {
            var int = intersect(f1, f2)
            if(int) intersection.push(int);
        })
        if(intersection.length > 0){
            edges.push(edge)
            W[JSON.stringify(edge)] = intersection    
        }
    })

    return new DAG(nodes, [d1.source, d2.source], [d1.target, d2.target], edges, W)
}


function lazy_intersect_dags(d1, d2){

    var source = [d1.source, d2.source],
        target = [d1.target, d2.target];

    var W = {}
    var edges = [];

    function helper(node){
        if(_.isEqual(node, target)) return true;

        var s1 = d1.edges.filter(k => _.isEqual(k[0], node[0]))
        var s2 = d2.edges.filter(k => _.isEqual(k[0], node[1]))

        // shuffling seems to make things faster
        for(var [e1, e2] of _.shuffle(cross(s1, s2))){
            // e1 and e2 are edges of d1 and d2, respectively
            // such that they start from node[0] and node[1],
            // respectively

            var edge = [node, [e1[1], e2[1]]];

            var intersection = []
            cross(d1.map[JSON.stringify(e1)], d2.map[JSON.stringify(e2)]).forEach(([f1, f2]) => {
                var int = intersect(f1, f2)
                if(int) intersection.push(int);
            })

            if(intersection.length === 0) continue;

            if(helper(edge[1])){
                W[JSON.stringify(edge)] = intersection;
                edges.push(edge)
                
                return true
            }
        }
    }

    helper(source);
    var nodes = _.uniq(_.flatten(edges))
    return new DAG(nodes, source, target, edges, W)
}



function lazy_intersect_multidags(...dags){

    console.log('multi', dags)

    if(dags.length === 1) return dags[0];
    
    var source = dags.map(k => k.source),
        target = dags.map(k => k.target)

    var W = {}, edges = [];

    function helper(node){
        if(_.isEqual(node, target)) return true;

        var sv = dags.map((k, i) => k.edges.filter(e => _.isEqual(e[0], node[i])));
        for(var ev of cartesian_product(...sv)){
            var edge = [node, ev.map(k => k[1])];

            var last = dags[0].map[JSON.stringify(ev[0])]
            for(var i = 1; last.length > 0 && i < ev.length; i++){
                var intersection = []
                cross(last, dags[i].map[JSON.stringify(ev[i])]).forEach(([f1, f2]) => {
                    var int = intersect(f1, f2)
                    if(int) intersection.push(int);
                })
                last = intersection;
            }

            if(last.length === 0) continue;

            if(helper(edge[1])){
                W[JSON.stringify(edge)] = last;
                edges.push(edge)
                
                return true
            }
        }
    }

    helper(source);
    var nodes = _.uniq(_.flatten(edges))
    return new DAG(nodes, source, target, edges, W)
}


function intersect_extdsubstrsets(s1, s2){
    let int = intersect_substrsets(s1.substrset, s2.substrset)
    if(int && s1.f.type == s2.f.type) return new ExtdSubStrSet(int, s1.f)
}


function intersect_substrsets(s1, s2){
    if(s1.vi === s2.vi){
        var start = intersect_pos_set(s1.start_positions, s2.start_positions);
        if(start.length == 0) return null;
        var end = intersect_pos_set(s1.end_positions, s2.end_positions);
        if(end.length == 0) return null;
        return new SubStrSet(s1.vi, start, end)
    }
}



function pos_set_bucket(x){
    return ((x instanceof CPosSet) ? 'C' : (
        ('P' + x.pre_regexes.length + ':' + x.post_regexes.length) ))
}
function intersect_pos_set(a, b){
    // use the simple algorithm when one of the lists is short
    if(Math.min(a.length, b.length) < 5) return intersect_pos_set_simple(a, b);

    var a_groups = _.groupBy(a, pos_set_bucket),
        b_groups = _.groupBy(b, pos_set_bucket);
    var keys = _.union(Object.keys(a_groups), Object.keys(b_groups));
    var intersection = []
    for (var x = keys.length - 1; x >= 0; x--) {
        var key = keys[x]
        var ag = a_groups[key],
            bg = b_groups[key];
        if(!ag || !bg) continue;
        for (var i = ag.length - 1; i >= 0; i--) {
            for (var j = bg.length - 1; j >= 0; j--) {
                if(key == 'C'){
                    if(ag[i].pos === bg[j].pos) intersection.push(ag[i]);
                }else{
                    var int = intersect_pos_core(ag[i], bg[j])
                    if(int) intersection.push(int);    
                }
            }
        }
    }
    return intersection
}


function intersect_pos_set_simple(a, b){
    var intersection = [];
    for (var i = a.length - 1; i >= 0; i--) {
        for (var j = b.length - 1; j >= 0; j--) {
            var int = intersect_pos(a[i], b[j])
            if(int) intersection.push(int);   
        }
    }
    return intersection;
}


function intersect_pos(a, b){
    if(a instanceof CPosSet && b instanceof CPosSet){
        if(a.pos === b.pos) return a;
    }else if(a instanceof PosSet && b instanceof PosSet){
        return intersect_pos_core(a, b)
    }
}

function intersect_pos_core(a, b){
    if(a.pre_regexes.length !== b.pre_regexes.length) return null;
    if(a.post_regexes.length !== b.post_regexes.length) return null;
    var places = list_intersection(a.places, b.places)
    if(places.length === 0) return null;
    var pre_regexes = intersect_regex(a.pre_regexes, b.pre_regexes)
    if(!pre_regexes) return null;
    var post_regexes = intersect_regex(a.post_regexes, b.post_regexes)
    if(!post_regexes) return null;
    return new PosSet(pre_regexes, post_regexes, places)
}



function intersect_regex(a, b){
    var ints = [];
    for (var i = a.length - 1; i >= 0; i--) {
        var int = list_intersection(a[i], b[i]);
        if(int.length === 0) return null;
        ints.unshift(int)
    }
    return ints
}


function unify(a, b, w){
    if(Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return null;

    if(a instanceof DAG && b instanceof DAG){
        return unify_dags(a, b, w)
    }else if(a instanceof ConstStrSet && b instanceof ConstStrSet){
        if(a.s === b.s) return a;
    }else if(a instanceof SubStrSet && b instanceof SubStrSet){
        return unify_substrsets(a, b, w)
    }else{
        console.log(a, b, w)
    }
}

function unify_dags(d1, d2, w){
    let nodes = cross(d1.nodes, d2.nodes)
    let W = {}
    let edges = [];

    cross(d1.edges, d2.edges).forEach(([e1, e2]) => {
        let edge = [[e1[0], e2[0]], [e1[1], e2[1]]];
        var intersection = []
        cross(d1.map[JSON.stringify(e1)], d2.map[JSON.stringify(e2)]).forEach(([f1, f2]) => {
            var int = unify(f1, f2, w)
            if(int) intersection.push(int);
        })
        if(intersection.length > 0){
            edges.push(edge)
            W[JSON.stringify(edge)] = intersection    
        }
    })

    return new DAG(nodes, [d1.source, d2.source], [d1.target, d2.target], edges, W)
}


function unify_substrsets(s1, s2, w){
    if(s1.vi === s2.vi){
        var start = unify_pos_set(s1.start_positions, s2.start_positions, w);
        if(start.length == 0) return null;
        var end = unify_pos_set(s1.end_positions, s2.end_positions, w);
        if(end.length == 0) return null;
        return new SubStrSet(s1.vi, start, end)
    }
}

function unify_pos_set(a, b, w){
    var intersection = [];
    for (var i = a.length - 1; i >= 0; i--) {
        for (var j = b.length - 1; j >= 0; j--) {
            var int = unify_pos(a[i], b[j], w)
            if(int) intersection.push(int);   
        }
    }
    return intersection;
}


function unify_pos(a, b, w){
    if(a instanceof CPosSet && b instanceof CPosSet){
        if(a.pos === b.pos) return a;
    }else if(a instanceof PosSet && b instanceof PosSet){
        return unify_pos_core(a, b, w)
    }
}

// https://github.com/MikaelMayer/StringSolver/blob/899db96e1e39f5ce9b075355eb7fb089bd1cc071/src/main/scala/ch/epfl/lara/synthesis/stringsolver/ProgramSet.scala#L748
function unify_pos_core(a, b, w){
    if(a.pre_regexes.length !== b.pre_regexes.length) return null;
    if(a.post_regexes.length !== b.post_regexes.length) return null;

    // console.log(a, b)
    var pre_regexes = intersect_regex(a.pre_regexes, b.pre_regexes)
    if(!pre_regexes) return null;
    var post_regexes = intersect_regex(a.post_regexes, b.post_regexes)
    if(!post_regexes) return null;


    var places = []
    cross(a.places, b.places).forEach(([k1, k2]) => {
        if(k1 === k2){
            // standard intersection case
            places.push(k1)
            // console.log('does this even matter?')
        }else if(typeof k1 == 'number' && typeof k2 == 'number'){
            // console.log('boundvar', k1, k2)
            places.push(new BoundVarSet(w, k2 - k1, k1))
        }
    })

    if(places.length === 0) return null;
    return new PosSet(pre_regexes, post_regexes, places)
}


function generate_position(s, k){
    // TODO: check for off-by-one
    var result = [ new CPosSet(k), new CPosSet(-(s.length - k)) ]

    // TODO: check for off-by-one
    var rr1 = _.flatten(_.range(0, k + 1).map(k1 => 
        matching_token_sequences(substring(s, k1, k-1))
        .map(r1 => [k1, r1])))

    var rr2 = _.flatten(_.range(k+1, s.length + 1).map(k2 => 
        matching_token_sequences(substring(s, k, k2))
        .map(r2 => [k2, r2])))

    for(var [[k1, r1], [k2, r2]] of cross(rr1, rr2)){
        var r = new RegExp('(' + to_regex_string(r1) + ')(' + to_regex_string(r2) + ')', 'g')
        var matches = all_matches(s, r)

        // TODO: check for off-by-one
        var c = _.findIndex(matches, m => 
            m.index == k1 && m.index + m[0].length == k2)

        result.push(new PosSet(
            generate_regex(r1, s), 
            generate_regex(r2, s), 
            [c, -(matches.length - c + 1)])) // TODO: check for off-by-one
    }

    return result
}

function matching_token_sequences(s){
    if(s.length == 0) return [[]];

    var sequences = []
    for(var tok in TokenRegexesStart){
        if(tok == 'EndTok' || tok == 'StartTok') continue;
        var re = TokenRegexesStart[tok],
            m = re.exec(s);
        if(!m) continue;
        for(var seq of matching_token_sequences(s.slice(m[0].length))){
            sequences.push([tok, ...seq])
        }
    }
    return sequences
}

// matching_token_sequences('hello')

function generate_regex(r, s){
    // r is a token sequence
    return r.map(k => [k])
}


function generate_loop(sigma, s, W){
    let edge_expressions = W
    
    for(let k1 = 0; k1 < s.length; k1++)
    for(let k2 = k1; k2 < s.length; k2++)
    for(let k3 = k2; k3 < s.length; k3++) {

        let e1 = generate_str(sigma, substring(s, k1, k2), false)
        let e2 = generate_str(sigma, substring(s, k2, k3), false)

        let w = 'wumbo';

        let loop = new LoopSet(w, unify(e1, e2, w))
        
        console.log(loop, loop.sample())
        // if(new Loop()) //;

    }
                   
    return edge_expressions    
}

