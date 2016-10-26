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

function generate_posSet_set(s, k){

    let bseq = []
    let bprog = []
    let eseq = []
    let eprog = []

    let parts = IParts(s)

    // remove the special tokens 
    let reps = Reps(parts).filter(k => k != 'StartTok' && k != 'EndTok')

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


function generate_str(sigma, s, shouldloop=true){
    let W = {}, edges = [], nodes = []
    for(let i = 0; i <= s.length; i++){
        nodes.push(i)
        for(let j = i+1; j <= s.length; j++) {
            let edge = [i,j], 
                part = substring(s,i,j)
            edges.push(edge)
            W[JSON.stringify(edge)] = [new ConstStrSet(part), ...generate_substring(sigma, part)]
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



function generate_loop(sigma, s, W){
    let edge_expressions = W
    
    for(let k1 = 0; k1 < s.length; k1++)
    for(let k2 = k1; k2 < s.length; k2++)
    for(let k3 = k2; k3 < s.length; k3++) {

        let e1 = generate_str(sigma, substring(s, k1, k2), false)
        let e2 = generate_str(sigma, substring(s, k2, k3), false)

        let e = unify(e1, e2)
        // if(new Loop()) //;

    }
                   
    return edge_expressions    
}



function unify_dags(d1, d2){
    let nodes = cross(d1.nodes, d2.nodes)
    let W = {}
    let edges = cross(d1.edges, d2.edges).map(([e1, e2]) => {
        let edge = [[e1[0], e2[0]], [e1[1], e2[1]]]
        W[JSON.stringify(edge)] = unify(d1.W[JSON.stringify(e1)], d2.W[JSON.stringify(e2)])
    })
    return new DAG(nodes, [d1.source_node, d2.source_node], [d1.target_node, d2.target_node], edges, W)
}

function unify_substrsets(s1, s2){

}
