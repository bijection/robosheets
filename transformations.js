// let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let NamedTransformations = {
	Upper: {
		transform(s){
			return s.toUpperCase()
		},
		inverse_transform(s){
			return new RegExp(RegExp.escape(s), 'gi')
		},
		test(s){
			return s === s.toUpperCase()
		}
	},

	Lower: {
		transform(s){
			return s.toLowerCase()
		},
		inverse_transform(s){
			return new RegExp(RegExp.escape(s), 'gi')
		},
		test(s){
			return s === s.toLowerCase()
		}
	},

	ToMonthName: {
		transform(s){
			return months[parseInt(s) - 1]
		},
		inverse_transform(s){
			return months.indexOf(s) + 1 + ''
		},
		test(s){
			return months.indexOf(s) > -1
		}
	},
}

let Transformations = Object.keys(NamedTransformations).map(name => {
	let t = NamedTransformations[name]
	t.type = name
	t.transform.type = name
	return t
})
