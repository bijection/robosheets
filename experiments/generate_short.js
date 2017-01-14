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
        all_matches(s, TokenRegexesG[t]).forEach(match => {
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
        endings[e1.begin] && endings[e1.begin].forEach(e2 => bseq.push([e2.t, e1.t]))
    })

    beginnings[k] && beginnings[k].forEach(b1 => {
        eseq.push([b1.t])
        beginnings[b1.end] && beginnings[b1.end].forEach(b2 => eseq.push([b1.t, b2.t]))
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
            total++;
        }
        possets.push(new PosSet(bre, ere, [c, -(total - c)] ))
    })
    })
    return possets
}


function generate_substring(sigma, s){
    if(!Array.isArray(sigma)) throw 'sigma should be an array of strings!'
    var result = []
    for(var i = 0; i < sigma.length; i++){

        let posSet_sets = {}
        
        function get_set(j){
            if(!posSet_sets[j]) posSet_sets[j] = generate_short_posSet_set(sigma[i], j)
            return posSet_sets[j]
        }

        function wolo(s, f){
            var indices = is_substr_at(sigma[i], s)
            for(var k = 0; k < indices.length; k++)
                result.push(f(i, get_set(indices[k][0]), get_set(indices[k][0] + indices[k][1])))
        }

        wolo(s, (i, y1, y2) => new SubStrSet(i, y1, y2))
        
        Transformations.filter(t => t.could_produce(s)).forEach(t => {
            wolo(t.inverse_transform(s), (i, y1, y2) => new ExtdSubStrSet(new SubStrSet(i, y1, y2), t.transform))
        })
    }
    return result
}


function generate_str(sigma, s, shouldloop=true){
    let W = {}, edges = [], nodes = []
    for(let i = 0; i <= s.length; i++){
        nodes.push(i)
        for(let j = i+1; j <= s.length; j++) {
            let edge = [i,j], part = substring(s,i,j)
            edges.push(edge)
            let substr = generate_substring(sigma, part)
            W[JSON.stringify(edge)] = [new ConstStrSet(part), ...substr]
        }
    }
    // if(shouldloop) W = generate_loop(sigma, s, W)
    return new DAG(nodes, 0, s.length, edges, W)
}


































function intersect(a, b){
    if(Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)){
        return null
    }

    if(a instanceof ConstStrSet && b instanceof ConstStrSet){
        if(a.s === b.s) return a;
    }else if(a instanceof SubStrSet && b instanceof SubStrSet){
        return intersect_substrsets(a, b)
    }else if(a instanceof ExtdSubStrSet && b instanceof ExtdSubStrSet){
        return intersect_extdsubstrsets(a, b)
    }else{
        console.log(a, b)    
    }
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
        var start = intersect_pos_set_simple(s1.start_positions, s2.start_positions);
        if(start.length == 0) return null;
        var end = intersect_pos_set_simple(s1.end_positions, s2.end_positions);
        if(end.length == 0) return null;
        return new SubStrSet(s1.vi, start, end)
    }
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