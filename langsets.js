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
        return new SubStr(this.vi,
            sample(this.start_positions).sample(),
            sample(this.end_positions).sample())
    }
}

class ConstStrSet {
    constructor(s){
        this.s = s
    }
    sample(){
        return new ConstStr(this.s)
    }
}

class DAG {
    constructor(nodes, source, target, edges, map){
        this.nodes = nodes
        this.source = source
        this.target = target
        this.edges = edges
        this.map = map
    }

    _sample_edge_from(node){
        return sample(this.edges.filter(e => _.isEqual(e[0], node)));
    }
    sample(){
        var target = this.source;
        var trace = [];

        // until we've reached the target
        while(!_.isEqual(target, this.target)){
            var edge = this._sample_edge_from(target);
            var val = this.map[JSON.stringify(edge)];
            trace.push(sample(val).sample())
            target = edge[1]
        }
        return new Concatenate(...trace)
    }
}

class LoopSet {
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