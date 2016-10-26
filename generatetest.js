





var sig = ['1234foo1234']

var potentials = generate_substring(sig,  'foo')
var cand = sample(potentials).sample()
console.log('f = generate_substring(', sig, ',  "foo")')
console.log('  =', cand.toString())
console.log('f(', sig, ') =', cand.apply(sig))


generate_substring(['hello'], 'hello')

Array.from(generate_str(['hello'], 'world').all()).map(k => {
	try{
		if(k.apply(['hello']) === 'world'){
			// console.log('yay!')
		}else{
			console.log('boo!')
		}
	} catch (e){
		console.error(k + '')
	} 
})