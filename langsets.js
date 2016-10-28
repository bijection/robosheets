class CPosSet {
    constructor(pos){
        this.pos = pos
    }

    sample(){
        return new CPos(this.pos)
    }

    *all(){
        yield new CPos(this.pos)
    }

    size(){ return 1 }
}


class PosSet {
    constructor(pre_regexes, post_regexes, places){
        this.pre_regexes = pre_regexes
        this.post_regexes = post_regexes
        this.places = places
    }

    // render(){
    //     let res = []
    //     this.pre_regexes.forEach( pre => {
    //         this.post_regexes.forEach( post => {
    //             this.places.forEach(place => {
    //                 res.push(new Pos(pre, post, place))
    //             })
    //         })
    //     })
    //     return res
    // }

    sample(){
        return new Pos(
            this.pre_regexes.map(sample),
            this.post_regexes.map(sample),
            optional_sample(sample(this.places)))
    }

    *all(){
        for (let pre of cartesian_product(this.pre_regexes))
        for (let post of cartesian_product(this.post_regexes))
        for (let place of this.places){
            yield new Pos(pre, post, optional_sample(place))
        }
    }

    size(){ 
        return this.pre_regexes.length * this.post_regexes.length * this.places.length
    }
}

function optional_sample(x){
    if(x.sample) return x.sample()
    return x;
}


class LoopSet {
    constructor(w, fn){
        this.w = w
        this.fn = fn
    }
    sample(){
        return new Loop(this.w, this.fn.sample())
    }
}

class BoundVarSet {
    constructor(w, k1 = 1, k2 = 0){
        this.w = w
        this.k1 = k1
        this.k2 = k2
    }

    sample(){
        return new BoundVar(this.w, this.k1, this.k2)
    }
}

class SubStrSet {
    constructor(vi, start_positions, end_positions){
        this.vi = vi
        this.start_positions = start_positions
        this.end_positions = end_positions
    }
    
    // render(){
    //     let res = []

    //     let start_positions = this.start_positions.map( p => p.render() )

    //     this.start_positions.forEach( start => {
    //         this.end_positions.forEach( end => {
    //             this.places.forEach(place => {
    //                 res.push(new Pos(pre, post, place))
    //             })
    //         })
    //     })
    //     return res
    // }

    sample(){
        return new SubStr(this.vi,
            sample(this.start_positions).sample(),
            sample(this.end_positions).sample())
    }

    *all(){
        // haaaidokken
        for(let start of this.start_positions){
            for(let end of this.end_positions){
                for(let s of start.all()){
                    for(let e of end.all()){
                        yield new SubStr(this.vi, s, e)
                    }
                }
            }
        }
    }
    size(){
        return _.sumBy(this.start_positions, p => p.size()) 
            * _.sumBy(this.end_positions, p => p.size())
    }
}

class ConstStrSet {
    constructor(s){
        this.s = s
    }
    sample(){
        return new ConstStr(this.s)
    }
    *all(){
        yield new ConstStr(this.s)
    }
    size(){ return 1 }
}

class DAG {
    constructor(nodes, source, target, edges, map){
        this.nodes = nodes
        this.source = source
        this.target = target
        this.edges = edges
        this.map = map
    }
    _all_edges_from(node){
        return this.edges.filter(e => _.isEqual(e[0], node))
    }
    _all_edges_to(node){
        return this.edges.filter(e => _.isEqual(e[1], node))
    }

    *_sample_from(node){
        if(_.isEqual(this.target, node)) yield [];
        for(let edge of _.shuffle(this._all_edges_from(node))){
            var val = this.map[JSON.stringify(edge)];
            if(!val) continue;
            for(let path of this._sample_from(edge[1])){
                yield [val].concat(path)
            }
        }
    }


    sample(){
        var trace = this._sample_from(this.source).next().value
            .map(k => sample(k).sample())
        return new Concatenate(...trace)
    }

    *all2(){
        for(let path of this._sample_from(this.source)){
            for(let traces of cartesian_product(...path)){
                console.log(traces)
                for(let trace of cartesian_product(...traces.map(k => Array.from(k.all())))){
                    yield new Concatenate(...trace)
                }
            }
        }
    }
    
    *all_paths_after(node){
        if(_.isEqual(this.target, node)){
            yield []
            return;
        }
        var next_edges = this._all_edges_from(node);

        for(let edge of next_edges){
            for(let path of this.all_paths_after(edge[1])){
                yield [edge].concat(path)
            }
        }
    }

    *all(){
        for(let path of this.all_paths_after(this.source)){
            for(let trace of cartesian_product(...path.map(edge => 
                _.flatten(this.map[JSON.stringify(edge)]
                .map(s => Array.from(s.all())))))){
                yield new Concatenate(...trace)
            }
        }
    }

    _size_of_node(n){
        if(n === this.source) return 1;
        return _.sumBy(this._all_edges_to(n), edge => {
            var np = edge[0];
            return this._size_of_node(np) 
                * _.sumBy(this.map[JSON.stringify(edge)], 
                    k => k.size())
        })
    }
    size(){
        return this._size_of_node(this.target)
    }



    is_connected(node, info){
        var nkey = JSON.stringify(node)
        if(nkey in info) return info[nkey];
        var connected = false;
        for(let edge of this._all_edges_from(node)){
            var key = JSON.stringify(edge);
            var val = this.map[key];
            if(!val) continue;
            if(this.is_connected(edge[1], info)) connected = true;
        }
        return info[nkey] = connected;
    }
    connected_nodes(){
        var info = {}
        info[JSON.stringify(this.target)] = true;
        this.is_connected(this.source, info)
        // var connected = []
        for(var key in info){
            if(!info[key]) delete info[key];
        }
        return info
    }
    prune(){
        var connected = this.connected_nodes()
        var nodes = this.nodes.filter(k => JSON.stringify(k) in connected)
        var edges = this.edges.filter(k => 
            (JSON.stringify(k[0]) in connected)
            && (JSON.stringify(k[1]) in connected))
        var edgekeys = _.fromPairs(edges.map(k => [JSON.stringify(k), true]))
        var map = _.pickBy(this.map, (val, key) => key in edgekeys)
        return new DAG(nodes, this.source, this.target, edges, map)
    }
}


