let ctx = canvas.getContext('2d')

let row = 0
let col = 0

const default_col_width = 200
const default_row_height = 50

let col_widths = {}
let row_heights = {}

const left_margin = 60
const top_margin = 40

let selected_row = 0
let selected_col = 0

let selected_end_row;
let selected_end_col;


let content = {}
let grey_content = {}


function render() {
	canvas.width = innerWidth * devicePixelRatio
	canvas.height = innerHeight * devicePixelRatio

	canvas.style.width = innerWidth+'px'
	canvas.style.height = innerHeight+'px'

	ctx.clearRect(0,0,canvas.width, canvas.height)

	draw_label_backgrounds()

	draw_horizontal_lines_and_labels()
	draw_vertical_lines_and_labels()

	draw_cells_text()

	draw_selected_cell()
	draw_selection_region()

	// ctx.fillStyle = 'rgba(0,0,0,.1)'
	// if(row > 0) ctx.fillRect(left_margin, top_margin, canvas.width, 10);
	// if(col > 0) ctx.fillRect(left_margin, top_margin, 10, canvas.height);

}






function draw_label_backgrounds(){
	ctx.save()
	ctx.fillStyle = '#eee'
	ctx.fillRect(0,0,canvas.width, top_margin)
	ctx.fillRect(0,0,left_margin, canvas.height)
	ctx.fillStyle = '#222'
	ctx.restore()
}










function draw_vertical_lines_and_labels(){
	ctx.save()

	ctx.font = '20px Avenir'
	ctx.strokeStyle = '#ccc'
	ctx.lineWidth = 1
	ctx.textAlign = 'right'
	ctx.textBaseline = 'middle'


	for(let [row, rendered_height, height] of visible_rows()){
		if(row == selected_row){
			ctx.fillStyle = '#ddd'
			ctx.fillRect(0, rendered_height, left_margin, height)
		}
		ctx.fillStyle = '#222'
		ctx.fillText(row, left_margin - 10, rendered_height + height / 2)

		ctx.beginPath()
		ctx.moveTo(0, rendered_height)
		ctx.lineTo(canvas.width, rendered_height)
		ctx.stroke()
	}

	ctx.restore()
}















function draw_horizontal_lines_and_labels(){
	ctx.save()
	
	ctx.font = '20px Avenir'
	ctx.strokeStyle = '#ccc'
	ctx.lineWidth = 1
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'

	for(let [col, rendered_width, width] of visible_cols()){
		if(col == selected_col){
			ctx.fillStyle = '#ddd'
			ctx.fillRect(rendered_width, 0, width, top_margin)
		}
		ctx.fillStyle = '#222'
		ctx.fillText(col, rendered_width + width / 2, top_margin / 2)

		ctx.beginPath()
		ctx.moveTo(rendered_width, 0)
		ctx.lineTo(rendered_width, canvas.height)
		ctx.stroke()		
	}

	ctx.restore()
}













const cell_left_padding = 6
const cell_bottom_padding = 14

function draw_cell_text(row, col){
	ctx.save()

	ctx.font = default_row_height - 20 +'px Helvetica'
	ctx.textAlign = 'left'
	ctx.textBaseline = 'middle'
	ctx.lineWidth = 1
	ctx.strokeStyle = '#ccc'

	let [r, y, height] = row
	let [c, x, width] = col

	let text = content[[r, c]] //|| [r, c].toString()
	if(!text){
		text = grey_content[[r,c]]
		if(text){
			ctx.fillStyle = '#aaa'
			ctx.fillText(text, x + cell_left_padding, y + height/2 )
		}
		return
	}

	let editing_this_cell = is_typing() && selected_row == r && selected_col == c
	let [edit_width, display_width] = cell_text_display_width(r, c)
	let text_width = editing_this_cell
		? edit_width
		: display_width

	ctx.clearRect(x+1, y+1, text_width, height - 2)

	
	text = text.slice(0, 5 + text.length * text_width / ctx.measureText(text).width)

	ctx.fillStyle = '#222'
	ctx.fillText(text, x + cell_left_padding, y + height/2 )

	ctx.beginPath()
	ctx.moveTo(x + text_width, y)
	ctx.lineTo(x + text_width, y+height)
	ctx.stroke()
	
	ctx.restore()
}

function draw_cells_text(){
	for(let {row, col} of visible_cells()){
		draw_cell_text(row, col)
	}
}


function cell_text_display_width(r, c) {
	ctx.font = default_row_height - 20 +'px Helvetica'
	var desired_width = ctx.measureText(content[[r,c]] || '').width + cell_left_padding
	let display_width = col_widths[c] || default_col_width
	let edit_width = display_width
	let next_col = c + 1
	let hit_filled_cell = false
	while(edit_width < desired_width){
		let next_col_width = col_widths[next_col] || default_col_width
	
		if(!content[[r, next_col]] && !hit_filled_cell) display_width += next_col_width
		else hit_filled_cell = true;

		edit_width += next_col_width
		next_col ++
	}
	return [edit_width, display_width]
}













function draw_selected_cell(){
	ctx.save()

	let row = visible_row_n(selected_row),
		col = visible_col_n(selected_col)

	if(!row || !col) return;

	if(is_typing()) draw_cell_text(row, col);

	let [edit_width] = cell_text_display_width(selected_row, selected_col)
	let width = is_typing()
		? edit_width
		: col_widths[selected_col] || default_col_width

	let height = row_heights[selected_row] || default_row_height
	let [selected_x, selected_y] = cell_x_y(selected_row, selected_col)

	ctx.strokeStyle = '#48f'
	ctx.lineWidth = 4
	ctx.strokeRect(selected_x, selected_y, width, height)
	ctx.fillStyle = '#48f'
	ctx.strokeStyle = '#fff'
	ctx.strokeRect(selected_x + width - 4, selected_y + height - 4, 8,8)
	ctx.fillRect(selected_x + width - 4, selected_y + height - 4, 8,8)
	
	ctx.restore()
}



function draw_selection_region(){

	let region = get_selection_region()
	if(region) draw_blue_box(...region)

}


function get_selection_region(){
	if(selected_end_row != null && selected_end_col != null) return [
		Math.min(selected_row, selected_end_row),
		Math.min(selected_col, selected_end_col),
		Math.max(selected_row, selected_end_row),
		Math.max(selected_col, selected_end_col)
	]
}



function draw_blue_box(start_row, start_col, end_row, end_col) {
	ctx.save()

	let [start_x, start_y] = cell_x_y(start_row, start_col)

	let col = visible_col_n(end_col)
	let row = visible_row_n(end_row)

	if(!row  || !col) return;

	let [, x, width] = col
	let [, y, height] = row

	ctx.lineWidth = 1
	ctx.strokeStyle = '#48f'
	ctx.strokeRect(start_x, start_y, x+width - start_x, y+height -start_y)
	
	ctx.fillStyle = 'rgba(80, 150, 255, .1)'
	ctx.fillRect(start_x, start_y, x+width - start_x, y+height -start_y)

	ctx.restore()
}










/*\
|*|
|*|
|*|
|*|
|*|
|*|
|*|
|*|       Events
|*|
|*|
|*|
|*|
|*|
|*|
|*|
\*/











const x_speed = 4
const y_speed = 4

let scrollX = 0
let scrollY = 0
canvas.addEventListener('wheel', e => {
	e.preventDefault()

	keygetter.blur()

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




document.addEventListener('paste', function(e){
	let data = e.clipboardData.getData('text/plain')
	if(data.includes('\n') || data.includes('\t') || !is_typing()){
		e.preventDefault()
		let row = selected_row
		data.split(/\r\n|\r|\n/).forEach(line => {
			let col = selected_col
			line.split('\t').forEach(entry => {
				content[[row, col]] = entry
				col++
			})
			row++
		})
	}
})



document.addEventListener('copy', function(e){

	if(is_typing()) return;

	e.preventDefault()

	let data
	let region = get_selection_region()

	if(region){
		data = to_text(region)
	} else {
		data = content[[selected_row, selected_col]] || grey_content[[selected_row, selected_col]] || ''
	}

	e.clipboardData.setData('text/plain', data);

})


function to_text(region){
	let [start_row, start_col, end_row, end_col] = region

	return _.range(start_row, end_row+1)
	.map(row => _.range(start_col, end_col+1)
	 			.map(col => content[[row,col]] || grey_content[[row,col]] || '')
	 			.join('\t'))
	.join('\n')
}

document.addEventListener('cut', e => {
	if(is_typing()) return;
	e.preventDefault()

	let data
	let region = get_selection_region()

	if(region){
		data = to_text(region)
		delete_region(region)
	} else {
		data = content[[selected_row, selected_col]] || grey_content[[selected_row, selected_col]] || ''
		content[[selected_row, selected_col]] = ''
	}

	e.clipboardData.setData('text/plain', data);
})


function delete_region(region){
	let [start_row, start_col, end_row, end_col] = region

	_.range(start_row, end_row+1)
	.forEach(row =>
		_.range(start_col, end_col+1)
		.forEach(col => content[[row,col]] = ''))
}


keygetter.addEventListener('blur', e=> {
	keygetter.style.display = 'none'
})


function sync_canvas_and_keygetter() {
	ctx.save()
	ctx.font = default_row_height - 20 +'px Helvetica'
	let desired_width = ctx.measureText(keygetter.value).width
	keygetter.style.width = (ctx.measureText(keygetter.value).width + cell_left_padding + 2) / devicePixelRatio
	content[[selected_row, selected_col]] = keygetter.value
	ctx.restore()
}


keygetter.addEventListener('input', sync_canvas_and_keygetter)


document.addEventListener('keydown', e=> {
	if([8,9,13,37,38,39,40,46].includes(e.keyCode)){
		if(e.keyCode == 9) {
			e.preventDefault()
			e.shiftKey
				? bump_selected(0, -1)
				: bump_selected(0, 1)
		}
		if(e.keyCode == 13 && is_typing()){
			var nonempty = Object.keys(content).filter(k => content[k]);
			var cols  = _.groupBy(nonempty, k => k.split(',')[1]);
			var rows  = _.groupBy(nonempty, k => k.split(',')[0]);

			var col_ids = _.sortBy(Object.keys(cols), k => +k);
			for(var i = 1; i < col_ids.length; i++){
				let col = col_ids[i];
				let row_ids = cols[col];
				
				var dags = _.sampleSize(row_ids, 5).map(k => {
					var row_prefix = k.split(',')[0]
					var sigma = _.range(i).map(k => content[[row_prefix, k]] || '')
					return generate_str(sigma, content[k])
				})

				var pset = lazy_intersect_multidags(...dags);
				
				for(let row in rows){
					grey_content[[row, col]] = '' 
				}

				try {
					var program = pset.sample()	
				} catch (e) { continue  }
				
				for(let row in rows){
					var sigma = _.range(i).map(k => content[[row, k]] || '')
					try {
						var text = program.apply(sigma)
					} catch (e) { continue }
					grey_content[[row, col]] = text
				}
				
				console.log(col, cols[col], dags, pset, program, program + '')
			}
			bump_selected(1, 0)
		}
		if(e.keyCode == 13 && !is_typing()) start_typing()
		if(e.keyCode == 37 && (!is_typing() || keygetter.selectionStart === 0 )) bump_selected(0, -1)
		if(e.keyCode == 38) bump_selected(-1, 0)
		if(e.keyCode == 39 && (!is_typing() || keygetter.selectionEnd === keygetter.value.length)) bump_selected(0, 1)
		if(e.keyCode == 40) bump_selected( 1, 0)
		if(e.keyCode == 8 || e.keyCode == 46 && !is_typing()) {
			let region = get_selection_region()
			if(region) delete_region(region)
			else content[[selected_row, selected_col]] = ''
		}
	}

})

document.addEventListener('keypress', e=> {
	if(!is_typing() && e.keyCode != 13) {
		// console.log(String.fromCharCode(e.keyCode)
		content[[selected_row, selected_col]] = ''
		start_typing()
	}
})


canvas.addEventListener('mousedown', e => {

	let start_x = e.clientX * devicePixelRatio
	let start_y = e.clientY * devicePixelRatio

	let [row, col] = cell_row_col(start_x, start_y)

	if(typeof row != 'undefined' && typeof col != 'undefined'){
		set_selected(row,col)

		function move(e) {
			[selected_end_row, selected_end_col] = cell_row_col(
				e.clientX * devicePixelRatio,
				e.clientY * devicePixelRatio
			)
		}

		function up() {
			document.removeEventListener('mousemove', move)
			document.removeEventListener('mouseup', up)
		}

		document.addEventListener('mousemove', move)
		document.addEventListener('mouseup', up)

	} else if(typeof row != 'undefined' || typeof col != 'undefined'){

		let start_row_height = row_heights[row] || default_row_height
		let start_col_width = col_widths[col] || default_col_width

		if(typeof row != 'undefined'){
			function move(e){
				let dy = e.clientY * devicePixelRatio - start_y
				row_heights[row] = Math.max(start_row_height + dy, default_row_height)
			}
		} else {
			function move(e){
				let dx = e.clientX * devicePixelRatio - start_x
				col_widths[col] = Math.max(start_col_width + dx, default_col_width)
			}
		}

		function up() {
			document.removeEventListener('mousemove', move)
			document.removeEventListener('mouseup', up)
		}

		document.addEventListener('mousemove', move)
		document.addEventListener('mouseup', up)
	}

})




/*\
|*|
|*|
|*|
|*|
|*|
|*|
|*|
|*|       Utilities after this!
|*|
|*|
|*|
|*|
|*|
|*|
|*|
\*/

function is_typing() {
	return document.activeElement === keygetter
}

function *visible_cols(){
	let rendered_width = left_margin
	let cur_col = col
	while(rendered_width <= canvas.width){
		let width = col_widths[cur_col] || default_col_width
		yield [cur_col++, rendered_width, width]
		rendered_width += width
	}
}

function *visible_rows(){
	let rendered_height = top_margin
	let cur_row = row
	while(rendered_height <= canvas.height){
		let height = row_heights[cur_row] || default_row_height
		yield [cur_row ++, rendered_height, height]
		rendered_height += height
	}
}

function *visible_cells(){
	for(let row of visible_rows())
	for(let col of visible_cols()){
		yield {row, col}
	}
}

function visible_row_n(r) {
	let row
	for(row of visible_rows()) if (row[0] === r) return row
}

function visible_col_n(c) {
	let col
	for(col of visible_cols()) if (col[0] === c) return col
}

function last_visible_row() {
	let row
	for(row of visible_rows());
	return row
}

function last_visible_col() {
	let col
	for(col of visible_cols());
	return col
}

function cell_x_y(row, col){
	let cy, cx;
	for (let [r, y, height] of visible_rows()){
		if(r === row) cy = y;
	}
	for (let [c, x, width] of visible_cols()){
		if(c === col) cx = x;
	}
	return [cx, cy]
}

function cell_row_col(x, y){
	let r, c;
	for (let [row, cy] of visible_rows()){
		if(cy > y) break;
		r = row
	}
	for (let [col, cx] of visible_cols()){
		if(cx > x) break;
		c = col
	}
	return [r, c]
}

function set_selected(row, col){
	row = Math.max(row, 0)
	col = Math.max(col, 0)

	selected_col = col
	selected_row = row

	keygetter.blur()
	selected_end_row = null
	selected_end_col = null

	scroll_into_view(row, col)
}

function bump_selected(rows, cols) {
	set_selected(selected_row + rows, selected_col+cols)
}

function scroll_into_view(r, c){
	if(r < row) row = r;
	if(c < col) col = c;

	let [last_row] = last_visible_row()
	let [last_col] = last_visible_col()

	if(r > last_row - 1) row += r - last_row + 1
	if(c > last_col - 1) col += c - last_col + 1
}



function start_typing(){
	console.log('start typing')
	keygetter.style.display = 'initial'
	keygetter.focus()
	keygetter.value = content[[selected_row, selected_col]] || ''
	let [x, y] = cell_x_y(selected_row, selected_col)
	keygetter.style.top = y / devicePixelRatio + 'px'
	keygetter.style.left = x / devicePixelRatio + 'px'
	keygetter.style['padding-left'] = cell_left_padding / devicePixelRatio + 'px'
	keygetter.style.height = (row_heights[selected_row] || default_row_height) / devicePixelRatio + 'px'
	keygetter.style['font-size'] = (default_row_height - 20) / devicePixelRatio +'px'
	sync_canvas_and_keygetter()
}



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


let tick = () => {
	requestAnimationFrame(tick)
	render()
}
requestAnimationFrame(tick)