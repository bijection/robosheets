function input_vec_transform(str_inputs){
	let lengths = str_inputs.map(input => input.map(str => {
		let match = str.match(/\d+/g)
		return match ? match.length : 0
	}))

	let max_lengths = _.range(str_inputs[0].length).map(i => _.max(lengths.map( input => input[i] )) )

	console.log(max_lengths)

	return input => _.flatten(input.map( (str, i) => _.range(max_lengths[i]).map(j => {
		let match = str.match(/\d+/g)
		return match && match.length > j ? +match[j] : 0
	})))
}

function regress(inputs, outputs) {

	let evaluate = (coeffs, x) => coeffs[0] + _.sum(_.zipWith(_.tail(coeffs), x, _.multiply))

	let square = x => x*x
	let loss = coeffs => (input, output) => square(evaluate(coeffs, input) - output)

	let f = coeffs => _.sum(_.zipWith(
		inputs,
		outputs,
		loss(coeffs)))

	let tries = 0
	let sol
	do{
		sol = minimize(f, Array.from(new Array(inputs[0].length + 1), Math.random))
		tries++
		if(sol.f < 1) return input => {
			let output = evaluate(sol.solution, input)
			return Math.round(output * 2**20) / 2**20
		}
	} while(tries < 100)
}

// let k = [4,5,1,8,345,2, 123,5347, 213, 12, 34, 20938457]
// let inputs = k.map(x => [x, Math.random()])
// let outputs = k.map(x => 10+2*x)