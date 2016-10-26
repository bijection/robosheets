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

class DAG {
    constructor(nodes, source_node, target_node, edges, edge_expressions){
        this.nodes = nodes
        this.edges = edges
        this.source_node = source_node
        this.target_node = target_node
        this.edge_expressions = edge_expressions
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