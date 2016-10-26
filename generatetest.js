





var sig = ['1234foo1234']

var potentials = generate_substring(sig,  'foo')
var cand = sample(potentials).sample()
console.log('f = generate_substring(', sig, ',  "foo")')
console.log('  =', cand.toString())
console.log('f(', sig, ') =', cand.apply(sig))



Array.from(generate_str(['hello'], 'world').all()).map(k => {
	try{
		k.apply(['hello'])
	} catch (e){
		console.log(k+'')
	} 
})