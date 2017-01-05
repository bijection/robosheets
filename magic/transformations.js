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
		could_produce(s){
			return list.indexOf(s) > -1
		}
	}
}


function zeroPadTransForm(n){

	let zeros = _.range(n).map( k=> '0').join('')
	let re = new RegExp('^[0-9]{'+n+'}$')

	return {
		transform(s){
			return (zeros + s).slice(-n)
		},
		inverse_transform(s){
			let match = s.match(/^0+/)
			let ret = s.slice(match ? match[0].length : 0)
			return ret.length ? ret : '0'
		},
		could_produce(s){
			return s.match(re)
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
		could_produce(s){
			return s.match(/^[0-9]+$/) && +s >= 1 && +s <= list.length
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
		could_produce(s){
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
		could_produce(s){
			return s.match(/[a-zA-Z]/) && s === s.toLowerCase()
		}
	},

	reverse: {
		transform(s){
			return s.split('').reverse().join('')
		},
		inverse_transform(s){
			return s.split('').reverse().join('')
		},
		could_produce(s){
			return true
		}		
	},


	zeroPad2: zeroPadTransForm(2),
	zeroPad3: zeroPadTransForm(3),
	zeroPad4: zeroPadTransForm(4),
	zeroPad5: zeroPadTransForm(5),
	zeroPad6: zeroPadTransForm(6),
	zeroPad7: zeroPadTransForm(7),
	zeroPad8: zeroPadTransForm(8),
	zeroPad9: zeroPadTransForm(9),
	zeroPad10: zeroPadTransForm(10),

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
