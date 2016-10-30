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
}

let Transformations = Object.values(NamedTransformations)