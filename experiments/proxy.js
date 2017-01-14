let excellent_proxy = new Proxy({}, {
	get(target, name){
		name = name.toString()

		try{
			let row = name.match(/[0-9]+/)[0] - 1
			let col = name.match(/[A-Z]+/)[0]

			let letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
			let b26 = '0123456789abcdefghijklmnop'

			let text = col.toString(26).split('').map(c => b26[letters.indexOf(c)]).join('')
			col = parseInt(text, 26)

			return cell_text(row, col)

		} catch(e){}
	},
	has(target, key){
		return !!key.match(/^[A-Z]+[1-9][0-9]*$/)
	}
})

// with(excellent_proxy){
// 	console.log(A1 + B1)
// }