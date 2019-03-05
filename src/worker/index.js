import 'lodash'
import 'babel-polyfill'

import lazy_generate_intersect_multidags from './generate'

// importScripts(
// 	// '../lib/lodash.js',
// 	'./utils.js',
// 	'./tokens.js',
// 	'./lang.js',
// 	'./langsets.js',
// 	'./generate.js',
// 	'./transformations.js',
// 	'./minimize.js',
// 	'./numfill.js'//,
// 	// 'experiments/proxy.js'
// )

var autofill_programs = {}

let program_cache = new WeakMap()

function apply_program(program, sigma) {
	if (!program) return ''

	if (!program_cache.has(program)) program_cache.set(program, new Map())

	let res = program_cache.get(program),
		key = JSON.stringify(sigma)

	if (res.has(key)) return res.get(key)

	try {
		let val = program.apply(sigma)
		res.set(key, val)

		return val
	} catch (err) {
		return ''
	}
}

// function numerical_simple(numsigma, numoutputs){
// 	function train(x0, fn){
// 		for(var col = 0; col < numsigma[0].length; col++){
// 			// try {
// 				var result = minimize(function f(x){
// 					return _.sum(numoutputs.map((k, i) =>
// 						(fn([numsigma[i][col], ...x]) - k)**2))
// 				}, x0)
// 			// } catch (err) {
// 			// 	console.log('failed', err, x0)
// 			// }
// 			if(result && result.f < 0.001){
// 				var rounded = result.solution.map(k => Math.round(k * 1024) / 1024);

// 				return function(sigma){
// 					return fn([sigma[col], ...rounded])
// 				}
// 				console.log(result.solution, 'solved')
// 			}
// 		}
// 	}

// 	var constant = train([1], ([x, p]) => p)
// 	if(constant) return constant;

// 	var constant = train([1], ([x, p]) => x + p)
// 	if(constant) return constant;

// 	var constant = train([1, 1], ([x, p, n]) => x * p + n)
// 	if(constant) return constant;

// 	var constant = train([1], ([x, p]) => p ** x)
// 	if(constant) return constant;

// 	var constant = train([1], ([x, p]) => x ** p)
// 	if(constant) return constant;

// 	var constant = train([1, 2], ([x, p, n]) => n * p ** x)
// 	if(constant) return constant;

// 	var constant = train([2, 1], ([x, p, n]) => n * p ** (x + 1))
// 	if(constant) return constant;
// }

function sample_program(examples) {
	var inputs = examples.map(k => k[0]),
		outputs = examples.map(k => k[1])

	// console.log(inputs, outputs)
	// if(outputs.every(output => output.match(/^\d+$/))){
	// 	let input_to_vec = input_vec_transform(inputs),
	// 		numsigma = inputs.map(input_to_vec),
	// 		numoutputs = outputs.map(k => +k),
	// 		numexamples = _.zip(numsigma, numoutputs)

	// 	var lp = numerical_simple(numsigma, numoutputs);
	// 	if(lp) return { apply: sigma => lp(input_to_vec(sigma)) + '' };

	// 	let wolo = regress(numsigma, numoutputs)
	// 	if(wolo) return { apply: sigma => wolo(input_to_vec(sigma)) + '' };
	// }

	var pset = lazy_generate_intersect_multidags(inputs, outputs)

	try {
		var program = pset.sample()
	} catch (err) {
		console.log('sample error', pset, err)
	}

	// console.log(inputs, outputs, pset, program)

	return program
}

function pm(m) {
	postMessage(m)
	// setTimeout(() => postMessage(m), 500)
}

onmessage = function onmessage(message) {
	let { data } = message

	let { examples, col } = data

	console.log(JSON.stringify(examples), col)

	let cached_program = autofill_programs[col]
	if (cached_program) {
		if (
			_.every(
				examples.map(
					([sigma, out]) =>
						apply_program(cached_program, sigma) == out
				)
			)
		) {
			return pm({ program: cached_program, col })
		}
	}

	if (examples.length > 3) {
		let program = sample_program(examples.slice(0, 3))
		if (!program) {
			delete autofill_programs[col]
			return pm({ program, col })
		}
	}

	let program = sample_program(examples)
	if (program) {
		autofill_programs[col] = program
	} else {
		delete autofill_programs[col]
	}
	pm({ program, col })
}
