let ctx = canvas.getContext('2d')

let row = 0
let col = 0

const default_col_width = 200
const default_row_height = 50

let col_widths = {}
let row_heights = {}

const left_margin = 60
const top_margin = 40

let selected_row = 10
let selected_col = 3

function render() {
	canvas.width = innerWidth * devicePixelRatio
	canvas.height = innerHeight * devicePixelRatio

	canvas.style.width = innerWidth+'px'
	canvas.style.height = innerHeight+'px'

	ctx.font = '20px Avenir'
	ctx.strokeStyle = '#ccc'
	ctx.lineWidth = 1

	ctx.clearRect(0,0,canvas.width, canvas.height)

	ctx.fillStyle = '#eee'
	ctx.fillRect(0,0,canvas.width, top_margin)
	ctx.fillRect(0,0,left_margin, canvas.height)
	ctx.fillStyle = '#222'




	ctx.textAlign = 'right'
	ctx.textBaseline = 'middle'

	let rendered_height = top_margin
	let cur_row = row
	while(rendered_height <= canvas.height){
		let height = row_heights[cur_row] || default_row_height
		ctx.fillText(cur_row, left_margin - 10, rendered_height + height / 2)

		ctx.beginPath()
		ctx.moveTo(0, rendered_height)
		ctx.lineTo(canvas.width, rendered_height)
		ctx.stroke()

		rendered_height += height
		cur_row++
	}

	ctx.textAlign = 'center'
	// ctx.textBaseline = 'alphabetic'

	let rendered_width = left_margin
	let cur_col = col
	while(rendered_width <= canvas.width){
		let width = col_widths[cur_col] || default_col_width
		ctx.fillText(cur_col, rendered_width + width / 2, top_margin / 2)

		ctx.beginPath()
		ctx.moveTo(rendered_width, 0)
		ctx.lineTo(rendered_width, canvas.height)
		ctx.stroke()

		rendered_width += width
		cur_col++
	}

	rendered_height = top_margin
	cur_row = row
	while(rendered_height <= canvas.height){
		let height = row_heights[cur_row] || default_row_height
		let rendered_width = left_margin
		let cur_col = col
		while(rendered_width <= canvas.width){
			let width = col_widths[cur_col] || default_col_width
			if(cur_row == selected_row && cur_col == selected_col){
				ctx.strokeStyle = '#48f'
				ctx.lineWidth = 4
				ctx.strokeRect(rendered_width, rendered_height, width, height)
				ctx.fillStyle = '#48f'
				ctx.strokeStyle = '#fff'
				ctx.strokeRect(rendered_width + width - 4, rendered_height + height - 4, 8,8)
				ctx.fillRect(rendered_width + width - 4, rendered_height + height - 4, 8,8)
			}
			rendered_width += width
			cur_col++
		}
		rendered_height += height
		cur_row++
	}


}


const x_speed = 2
const y_speed = 2


let scrollX = 0
let scrollY = 0
canvas.addEventListener('wheel', e => {
	e.preventDefault()
	scrollX += e.deltaX *x_speed
	scrollY += e.deltaY *y_speed
	let width = col_widths[col] || default_col_width
	let height = row_heights[row] || default_row_height
	let prev_width = col_widths[col-1] || default_col_width
	let prev_height = row_heights[row-1] || default_row_height
	while(scrollX > width){
	 	scrollX -= width
	 	col++
	}
	while(scrollX < -prev_width){
	 	scrollX += prev_width
	 	col--
	}
	while(scrollY > height){
	 	scrollY -= height
	 	row++
	}
	while(scrollY < -prev_height){
	 	scrollY += prev_height
	 	row--
	}

	row = Math.max(row, 0)
	col = Math.max(col, 0)

})


document.addEventListener('keydown', e=> {
	if(e.keyCode == 37){
		selected_col--
	} else if(e.keyCode == 38){
		selected_row--
	} else if(e.keyCode == 39){
		selected_col++
	} else if(e.keyCode == 40){
		selected_row++
	}
})

document.addEventListener('click', e => {

	let x = e.clientX * devicePixelRatio
	let y = e.clientY * devicePixelRatio

	if(x < left_margin || y < top_margin) return;

	let rendered_height = top_margin
	let cur_row = row
	while(rendered_height <= y){
		let height = row_heights[cur_row] || default_row_height

		rendered_height += height
		cur_row++
	}


	let rendered_width = left_margin
	let cur_col = col
	while(rendered_width <= x){
		let width = col_widths[cur_col] || default_col_width

		rendered_width += width
		cur_col++
	}

	selected_row = cur_row - 1
	selected_col = cur_col - 1

})

// function getLines(ctx, text, maxWidth) {
//     var words = text.split(" ");
//     var lines = [];
//     var currentLine = words[0];

//     for (var i = 1; i < words.length; i++) {
//         var word = words[i];
//         var width = ctx.measureText(currentLine + " " + word).width;
//         if (width < maxWidth) {
//             currentLine += " " + word;
//         } else {
//             lines.push(currentLine);
//             currentLine = word;
//         }
//     }
//     lines.push(currentLine);
//     return lines;
// }




setInterval(render, 30)