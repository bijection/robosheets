function lazy_generate_intersect_multidags(inputs, outputs){

    if(inputs.length === 1) return generate_str(inputs[0], outputs[0])
    
    var source = outputs.map(k => 0),
        target = outputs.map(k => k.length)

    var W = {}, edges = [];

    let edge_frags = {}
    let get_edge_frag = (i, start, end) => {
        let key = [i,start,end]
        let part = substring(outputs[i], start, end)
        if(!edge_frags[key]){
            edge_frags[key] = generate_substring(inputs[i], part)
            edge_frags[key].push(new ConstStrSet(part))
        }
        return edge_frags[key]
    }


    function helper(node){
        if(_.isEqual(node, target)) return true;

        // var sv = outputs.map((output, i) => k.edges.filter(e => _.isEqual(e[0], node[i])));
        var sv = outputs.map((output, i) => _.range(node[i]+1, output.length + 1).map(end => [node[i], end]));
        for(var ev of cartesian_product(...sv)){
            var edge = [node, ev.map(k => k[1])];

            // var last = dags[0].W[JSON.stringify(ev[0])]
            // var last = generate_substr(inputs[0], substring(outputs[0],...ev[0]))
            var last = get_edge_frag(0,...ev[0])

            for(var i = 1; last.length > 0 && i < ev.length; i++){
                var intersection = []
                // cross(last, dags[i].W[JSON.stringify(ev[i])])
                // cross(last, generate_substr(inputs[i], substring(outputs[i],...ev[i])))
                cross(last, get_edge_frag(i, ...ev[i]))
                .forEach(([f1, f2]) => {
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

var k = lazy_generate_intersect_multidags(
    [['guillermo webster 01/02'],
    ['jocelyn reyes 03/04'],
    ['kevin kwok 05/67']], 

    ['Guillermo.01',
    'Jocelyn.03',
    'Kevin.05']).sample()

k.apply(['bonnie thedog 87/34'])







