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
            sample(this.places))
    }

    *all(){
        for(let pre of this.pre_regexes){
            for(let post of this.post_regexes){
                for(let place of this.places){
                    yield new Pos(pre, post, place)
                }
            }
        }
    }

    size(){ 
        return this.pre_regexes.length * this.post_regexes.length * this.places.length
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
    sample(){
        var target = this.target;
        var trace = [];
        while(!_.isEqual(target, this.source)){
            var edge = sample(this._all_edges_to(target));
            var val = this.map[JSON.stringify(edge)];
            trace.unshift(sample(val).sample())
            target = edge[0]
        }




        // var target = this.source;
        // var trace = [];

        // // until we've reached the target
        // while(!_.isEqual(target, this.target)){
        //     var edge = sample(this._all_edges_from(target));
        //     var val = this.map[JSON.stringify(edge)];
        //     trace.push(sample(val).sample())
        //     target = edge[1]
        // }
        return new Concatenate(...trace)
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
}


class LoopSet {
    constructor(w, fns){
        this.w = w
        this.fns = fns
    }


}