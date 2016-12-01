function all_matches(s, re) {
    var m, matches = [];
    var lastI;
    re.lastIndex = 0
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
    return arr[Math.floor(Math.random()*arr.length)]
}

RegExp.escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

function is_substr_at(str, substr){
    let m, indices = [];
    let re = substr instanceof RegExp
        ? substr
        : new RegExp(RegExp.escape(substr), 'g');
    
    while(m = re.exec(str)){
        indices.push([m.index, m[0].length])
    }
    return indices
}


function* cartesian_product(...arrays) {
    function* doCartesian(i, prod) {
        if (i == arrays.length) {
            yield prod;
        } else {
            for (let j = 0; j < arrays[i].length; j++) {
                yield* doCartesian(i + 1, prod.concat([arrays[i][j]]));
            }
        }
    }
    yield* doCartesian(0, []);
}

function cartesian_product2(...arrays) {
    function _inner(...args) {
        if (arguments.length > 1) {
            let arr2 = args.pop(); // arr of arrs of elems
            let arr1 = args.pop(); // arr of elems
            return _inner(...args,
                arr1.map(e1 => arr2.map(e2 => [e1, ...e2]))
                    .reduce((arr, e) => arr.concat(e), [])
            );
        } else {
            return args[0];
        }
    };
    return _inner(...arrays, [[]]);
};

function cross(as, bs){
    let res = []
    as.forEach(a => {
        bs.forEach(b => {
            res.push([a, b])
        })
    })
    return res
}


// technically O(n*m) but
// empirically faster than O(n+m) associative array technique

function list_intersection(x, y){
    var ret = [];
    for (var i = 0; i < x.length; i++) {
        for (var z = 0; z < y.length; z++) {
            if (x[i] == y[z]) {
                ret.push(x[i]);
                break;
            }
        }
    }
    return ret;            
}