let Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let Mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function listPlaceTransform(list){
	return {
		transform(s){
			return list[+s - 1]
		},
		inverse_transform(s){
			return list.indexOf(s) + 1 + ''
		},
		test(s){
			return list.indexOf(s) > -1
		}
	}
}

function inverseListPlaceTransform(list){
	return {
		transform(s){
			return list.indexOf(s) + 1 + ''
		},
		inverse_transform(s){
			return list[+s - 1]
		},
		test(s){
			return +s >= 1 && +s <= list.length
		}
	}
}

let NamedTransformations = {
	UPPER: {
		transform(s){
			return s.toUpperCase()
		},
		inverse_transform(s){
			return new RegExp(RegExp.escape(s), 'gi')
		},
		test(s){
			return s.match(/[a-zA-Z]/) && s === s.toUpperCase()
		}
	},

	lower: {
		transform(s){
			return s.toLowerCase()
		},
		inverse_transform(s){
			return new RegExp(RegExp.escape(s), 'gi')
		},
		test(s){
			return s.match(/[a-zA-Z]/) && s === s.toLowerCase()
		}
	},

	MONTHName: listPlaceTransform(Months.map(m => m.toUpperCase())),
	MONName: listPlaceTransform(Mons.map(m => m.toUpperCase())),
	MonthName: listPlaceTransform(Months),
	MonName: listPlaceTransform(Mons),
	monthName: listPlaceTransform(Months.map(m => m.toLowerCase())),
	monName: listPlaceTransform(Mons.map(m => m.toLowerCase())),
	MONTHNameInverse: inverseListPlaceTransform(Months.map(m => m.toUpperCase())),
	MONNameInverse: inverseListPlaceTransform(Mons.map(m => m.toUpperCase())),
	MonthNameInverse: inverseListPlaceTransform(Months),
	MonNameInverse: inverseListPlaceTransform(Mons),
	monthNameInverse: inverseListPlaceTransform(Months.map(m => m.toLowerCase())),
	monNameInverse: inverseListPlaceTransform(Mons.map(m => m.toLowerCase())),
}

let Transformations = Object.keys(NamedTransformations).map(name => {
	let t = NamedTransformations[name]
	t.type = name
	t.transform.type = name
	return t
})
