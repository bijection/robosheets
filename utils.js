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

function substring(s, i, j){
    return s.substring(i, j)
}

function regex(tokseq) {
    return new RegExp(tokseq.map(t => '(' + TokenStrings[t] + ')').join(''), 'g')
}

let to_regex_string = seq => seq.map(t => TokenStrings[t]).join('')

function sample(arr){
    return arr[Math.floor(Math.random()*(arr.length - 1))]
}

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

function cross(as, bs){
    let res = []
    as.forEach(a => {
        bs.forEach(b => {
            res.push([a, b])
        })
    })
    return res
}