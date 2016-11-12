let ctx = canvas.getContext('2d')

let row = 0
let col = 0

const default_col_width = 200
const default_row_height = 50

const left_margin = 60
const top_margin = 40

const resize_handle_width = 20
const resize_handle_drawn_width = 4

const selection_color = '#48f'

const content_font = default_row_height - 20 +'px Helvetica'

let col_widths = {}
let row_heights = {}

let selected_row = 0
let selected_col = 0

let selected_end_row;
let selected_end_col;


let user_content = {}
// let autofill_content = {}
var autofill_programs = {}

let hovered_col_divider
let hovered_row_divider

let mouse_x
let mouse_y


try{
	user_content = JSON.parse(localStorage.sheet1)
} catch(e) {}

keygetter.style.display = 'none';


function render() {
	canvas.width = innerWidth * devicePixelRatio
	canvas.height = innerHeight * devicePixelRatio

	canvas.style.width = innerWidth+'px'
	canvas.style.height = innerHeight+'px'

	ctx.clearRect(0,0,canvas.width, canvas.height)

	draw_label_backgrounds()

	draw_horizontal_lines_and_labels()
	draw_vertical_lines_and_labels()

	draw_hovered_divider()

	draw_cells_text()

	draw_selected_cell()
	draw_selection_region()

	if(Math.random() < 1/60) localStorage.sheet1 = JSON.stringify(user_content)

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



function draw_hovered_divider(){
	ctx.save()
	ctx.fillStyle = selection_color

	let col_divider = defined(hovered_col_divider) 
		? hovered_col_divider
		: get_hovered_col_divider()
	let row_divider = defined(hovered_row_divider)
		? hovered_row_divider
		: get_hovered_row_divider()

	if(defined(col_divider) && col_divider >= 0){
		let [,x,width] = visible_col_n(col_divider)
		ctx.fillRect(x + width - resize_handle_drawn_width / 2, 0, resize_handle_drawn_width, top_margin)
	}

	if(defined(row_divider) && row_divider >= 0){
		let [,y, height] = visible_row_n(row_divider)
		ctx.fillRect(0, y + height - resize_handle_drawn_width / 2, left_margin, resize_handle_drawn_width)
	}
	ctx.restore()
}





function draw_horizontal_lines_and_labels(){
	ctx.save()

	ctx.font = '20px Avenir'
	ctx.strokeStyle = '#ccc'
	ctx.lineWidth = 1
	ctx.textAlign = 'right'
	ctx.textBaseline = 'middle'

	for(let [row, rendered_height, height] of visible_rows()){
		if(row == selected_row || (
			defined(selected_end_row)
			&& row <= Math.max(selected_end_row, selected_row)
			&& row >= Math.min(selected_end_row, selected_row))){
			ctx.fillStyle = '#ddd'
			ctx.fillRect(0, rendered_height, left_margin, height)
		}
		ctx.fillStyle = '#222'
		ctx.fillText(row + 1, left_margin - 10, rendered_height + height / 2)

		ctx.beginPath()
		ctx.moveTo(0, rendered_height)
		ctx.lineTo(canvas.width, rendered_height)
		ctx.stroke()
	}

	ctx.restore()
}















function draw_vertical_lines_and_labels(){
	ctx.save()
	
	ctx.font = '20px Avenir'
	ctx.strokeStyle = '#ccc'
	ctx.lineWidth = 1
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'

	for(let [col, rendered_width, width] of visible_cols()){
		if(col == selected_col || (
			defined(selected_end_col)
			&& col <= Math.max(selected_end_col, selected_col)
			&& col >= Math.min(selected_end_col, selected_col))){
			ctx.fillStyle = '#ddd'
			ctx.fillRect(rendered_width, 0, width, top_margin)
		}
		ctx.fillStyle = '#222'
		let letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
		let b26 = '0123456789abcdefghijklmnop'
		let text = col.toString(26).split('').map(c => letters[b26.indexOf(c)]).join('')
		ctx.fillText(text, rendered_width + width / 2, top_margin / 2)

		ctx.beginPath()
		ctx.moveTo(rendered_width, 0)
		ctx.lineTo(rendered_width, canvas.height)
		ctx.stroke()		
	}

	ctx.restore()
}













const cell_left_padding = 6
const cell_bottom_padding = 14
let suggestion_color = 'hsl(134, 50%, 50%)'


function draw_cell_text(row, col){
	ctx.save()

	ctx.font = content_font
	ctx.textAlign = 'left'
	ctx.textBaseline = 'middle'
	ctx.lineWidth = 1
	ctx.strokeStyle = '#ccc'

	let [r, y, height] = row
	let [c, x, width] = col

	let drawing_suggestiong_text = false
	// let text = user_content[[r, c]]//|| [r, c].toString()
	let text = cell_text(r, c)

	if(!user_content[[r, c]]){
		// text = autofill_content[[r,c]]
		drawing_suggestiong_text = true
	}
	
	if(!text) return;

	let editing_this_cell = is_typing() && selected_row == r && selected_col == c
	let [edit_width, display_width] = cell_text_display_width(r, c)
	let text_width = editing_this_cell
		? edit_width
		: display_width

	ctx.clearRect(x+1, y+1, text_width, height - 2)

	let measured_text = ctx.measureText(text).width;

	
	function draw_normal_text(){
		let cropped_text = text.slice(0, 5 + text.length * text_width / measured_text)
		ctx.textAlign = 'start'
		ctx.fillStyle = drawing_suggestiong_text ? suggestion_color : '#222'
		ctx.fillText(cropped_text, x + cell_left_padding, y + height/2 )
	}

	function draw_offset_text(){
		let cropped_text = text.slice(-Math.floor(text.length * (text_width - result_width) / measured_text))
		ctx.textAlign = 'end'
		ctx.fillStyle = drawing_suggestiong_text ? suggestion_color : '#222'


		var gradient = ctx.createLinearGradient(x,0,x+30,0);
		gradient.addColorStop(0.5,"rgba(255, 255, 255, 1)");
		gradient.addColorStop(1,"rgba(255, 255, 255, 0)");

		ctx.fillText(cropped_text, x+cell_left_padding + text_width - result_width, y + height/2 )

		ctx.fillStyle = gradient
		ctx.fillRect(x+1, y + 1, 30, height - 2);
	}

	function draw_result(){
		// ctx.clearRect(x+1+text_width - result_width, y+1, result_width, height - 2)
		ctx.textAlign = 'end'
		ctx.fillStyle = (result === 'ERROR') ? 'red' : '#007fff'
		ctx.fillText(result, x + text_width - cell_left_padding, y + height / 2)
	}


	var result = evaluate(text);
	var result_width = ctx.measureText(result).width + cell_left_padding * 2
	

	if(result != text){
		draw_result()
		if(result_width + measured_text < text_width){
			draw_normal_text()
		}else{
			draw_offset_text()
		}
	}else{
		draw_normal_text()
	}
	

	ctx.beginPath()
	ctx.moveTo(x + text_width, y)
	ctx.lineTo(x + text_width, y+height)
	ctx.stroke()
	
	ctx.restore()
}


function evaluate(text){
	// prefix notation or suffix notation that is the question
	if(text.trim().endsWith('=')){
		
		try {
			var result = eval(text.trim().replace('=', ''))	
		} catch (err) { }
		if(!defined(result)) result = 'ERROR';

		return result + ''
	}
	return text
}

function draw_cells_text(){
	for(let {row, col} of visible_cells()){
		draw_cell_text(row, col)
	}
}



function cell_text_display_width(r, c) {
	ctx.font = content_font
	let text = cell_text(r, c)
	var desired_width = ctx.measureText(text).width + cell_left_padding;

	let result = evaluate(text)
	if(result != text){
		text += result;
		desired_width += ctx.measureText(result).width + cell_left_padding
	}

	let display_width = col_widths[c] || default_col_width
	let edit_width = display_width
	let next_col = c + 1
	let hit_filled_cell = false
	while(edit_width < desired_width){
		let next_col_width = col_widths[next_col] || default_col_width
	
		if(!cell_text(r, next_col) && !hit_filled_cell) display_width += next_col_width
		else hit_filled_cell = true;

		edit_width += next_col_width
		next_col ++
	}
	return [edit_width, display_width]
}













function draw_selected_cell(){

	// if(defined(selected_end_col) || defined(selected_end_row)) return;

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

	ctx.strokeStyle = selection_color
	ctx.lineWidth = 4
	ctx.strokeRect(selected_x, selected_y, width, height)
	// ctx.fillStyle = selection_color
	// ctx.strokeStyle = '#fff'
	// ctx.strokeRect(selected_x + width - 4, selected_y + height - 4, 8,8)
	// ctx.fillRect(selected_x + width - 4, selected_y + height - 4, 8,8)
	
	ctx.restore()
}



function draw_selection_region(){

	let region = get_selection_region()
	if(region) draw_blue_box(...region)

}


function get_selection_region(){
	if(defined(selected_end_row) && defined(selected_end_col)) return [
		Math.min(selected_row, selected_end_row),
		Math.min(selected_col, selected_end_col),
		Math.max(selected_row, selected_end_row),
		Math.max(selected_col, selected_end_col)
	]
}



function draw_blue_box(start_row, start_col, end_row, end_col) {
	ctx.save()

	let [start_x, start_y] = cell_x_y(Math.max(start_row, row), Math.max(start_col, col))

	end_col = visible_col_n(Math.min(end_col, last_visible_col()[0]))
	end_row = visible_row_n(Math.min(end_row, last_visible_row()[0]))

	if(!end_row  || !end_col) return;

	let [, x, width] = end_col
	let [, y, height] = end_row

	ctx.lineWidth = 1
	ctx.strokeStyle = selection_color
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
				user_content[[row, col]] = entry
				col++
			})
			row++
		})
	}
})





function filled_region(region){
	let [start_row, start_col, end_row, end_col] = region

	let real_end_row = 0, real_end_col = 0

	Object.keys(user_content)
	// .concat(Object.keys(autofill_content))
	.forEach(k => {
		let [r, c] = k.split(',')
		if(r >= start_row && r <= end_row && c >= start_col && c <= end_col){
			real_end_col = Math.max(real_end_col, c)
			real_end_row = Math.max(real_end_row, r)
		}
	})

	return [start_row, start_col, real_end_row, real_end_col]
}



function to_text(region){
	let [start_row, start_col, end_row, end_col] = filled_region(region)

	return _.range(start_row, end_row+1)
	.map(row => _.range(start_col, end_col+1)
	 			.map(col => evaluate(cell_text(row, col)))
	 			.join('\t'))
	.join('\n')
}


document.addEventListener('copy', function(e){

	if(is_typing()) return;

	e.preventDefault()

	let data
	let region = get_selection_region()

	if(region){
		data = to_text(region)
	} else {
		data = evaluate(cell_text(selected_row, selected_col))
	}

	e.clipboardData.setData('text/plain', data);

})


document.addEventListener('cut', e => {
	if(is_typing()) return;
	e.preventDefault()

	let data
	let region = get_selection_region()

	if(region){
		data = to_text(region)
		delete_region(region)
	} else {
		data = evaluate(cell_text(selected_row, selected_col))
		user_content[[selected_row, selected_col]] = ''
	}

	e.clipboardData.setData('text/plain', data);
})


function delete_region(region){
	let [start_row, start_col, end_row, end_col] = filled_region(region)

	_.range(start_row, end_row+1)
	.forEach(row =>
		_.range(start_col, end_col+1)
		.forEach(col =>{
			delete user_content[[row, col]]
		}))

	// delete all empty columns
	cleanup_autofill()
}


keygetter.addEventListener('blur', e=> {
	keygetter.style.display = 'none';
	// if(user_content[[selected_row, selected_col]] && user_content[[selected_row, selected_col]].length === 0)
	// 	delete user_content[[selected_row, selected_col]]
})


function sync_canvas_and_keygetter() {
	ctx.save()
	ctx.font = content_font
	let desired_width = ctx.measureText(keygetter.value).width
	keygetter.style.width = (ctx.measureText(keygetter.value).width + cell_left_padding + 2) / devicePixelRatio
	user_content[[selected_row, selected_col]] = keygetter.value
	ctx.restore()
}


keygetter.addEventListener('input', sync_canvas_and_keygetter)


function apply_program(program, sigma){
	if(!program) return '';
	try {
		return program.apply(sigma)
	} catch (err) {
		return ''
	}
	
}

function get_sigma(row, col){
	var sigma = _.range(+col)
		.map(c => 
			evaluate(cell_text(row, c)))
	return [row + ''].concat(sigma);
}

function cell_text(r, c){

	if(user_content[[r, c]]){
		return user_content[[r, c]];
	}
	
	if(autofill_programs[c]){
		let program = autofill_programs[c];
		return apply_program(program, get_sigma(r, c))
	}

	return ''
}

function linear_program(numsigma, numoutputs){

	// constant function
	if(_.every(numoutputs, k => k === numoutputs[0])){
		return function(sigma){ return numoutputs[0] }
	}

	// scalar offset
	for(var i = 0; i < numsigma[0].length; i++){
		var delta = numoutputs[0] - numsigma[0][i];
		if(_.every(numoutputs, (k, f) => numsigma[f][i] + delta == k)){
			return function(sigma){ return sigma[i] + delta }
		}
	}

	// linear thingy
	if(numsigma.length >= 2){
		for(var i = 0; i < numsigma[0].length; i++){
			var m = (numoutputs[1] - numoutputs[0]) / (numsigma[1][i] - numsigma[0][i])
			var b = numoutputs[0] - m * numsigma[0][i]
			if(_.every(numoutputs, (k, f) => m * numsigma[f][i] + b == k)){
				return function(sigma){ return m * sigma[i] + b }
			}
		}	
	}
	
}


function sample_program(examples){
	var inputs = examples.map(k => k[0]),
		outputs = examples.map(k => k[1])

	// console.log(inputs, outputs)
	if(outputs.every(output => output.match(/^\d+$/))){
		let input_to_vec = input_vec_transform(inputs),
			numsigma = inputs.map(input_to_vec),
			numoutputs = outputs.map(k => +k),
			numexamples = _.zip(numsigma, numoutputs)

		var lp = linear_program(numsigma, numoutputs);
		if(lp) return { apply: sigma => lp(input_to_vec(sigma)) + '' };

		let wolo = regress(numsigma, numoutputs)
		if(wolo) return { apply: sigma => wolo(input_to_vec(sigma)) + '' };
	}

	var pset = lazy_generate_intersect_multidags(inputs, outputs);
	console.log(inputs, outputs, pset)
	try {
		var program = pset.sample()
	} catch (err) { 
		console.log('sample error', pset, err)
	}
	console.log(program)
	return program;
}


function auto_fill(){
	var nonempty = Object.keys(user_content).filter(k => user_content[k]);
	var cols  = _.groupBy(nonempty, k => k.split(',')[1]);
	var rows  = _.groupBy(nonempty, k => k.split(',')[0]);
	// if(_.values(cols).length === 0) return;
	// let max_col_height = _.maxBy(_.values(cols), 'length').length

	var col_ids = _.sortBy(Object.keys(cols), k => +k);

	for(var i = 0; i < col_ids.length; i++){
		// if(!cols[i]) continue;
		// if(cols[i].length === max_col_height) continue;

		let col = col_ids[i];
		let row_ids = cols[col];
	
		// TODO: make sure most recently edited thing is part of the sample
		// alternatively, don't sample and use everything... 
		// if we can make intersect_lazy_whatever_generate_something 
		// sufficiently speedy
		let examples = _.sampleSize(row_ids, 5)
			.map(k => {
				var row_prefix = k.split(',')[0];
				return [get_sigma(row_prefix, col), user_content[k]]
			})

		// if the previously cached program still works, use that
		// and don't do the expensive recomputation

		let cached_program = autofill_programs[col]
		if(cached_program){
			if(_.every(examples.map(([sigma, out]) => 
				apply_program(cached_program, sigma) == out))){
				continue
			}
		}

		// intersect_programs
		let program = sample_program(examples);
		if(program){
			autofill_programs[col] = program;
		}else{
			delete autofill_programs[col]
		}

	}
}


let handle_keydown = e=> {
	if([8,9,13,37,38,39,40,46].includes(e.keyCode)){
		if(e.keyCode == 9) {
			e.preventDefault()
			auto_fill()
			e.shiftKey
				? bump_selected(0, -1)
				: bump_selected(0, 1)
		}
		if(e.keyCode == 13 && is_typing()){
			auto_fill()
			bump_selected(1, 0)
		} else if(e.keyCode == 13 && !is_typing()) start_typing()
		var bump = e.shiftKey ? bump_selected_end : bump_selected
		if(e.keyCode == 37 && (!is_typing() || keygetter.selectionStart === 0 )) bump(0, -1)
		if(e.keyCode == 38) bump(-1, 0)
		if(e.keyCode == 39 && (!is_typing() || keygetter.selectionEnd === keygetter.value.length)) bump(0, 1)
		if(e.keyCode == 40) bump( 1, 0)


		if((e.keyCode == 8 || e.keyCode == 46) && !is_typing()) {
			let region = get_selection_region()
			if(region){
				delete_region(region)
			}else{
				delete user_content[[selected_row, selected_col]]
				cleanup_autofill()
			} 
		}
	}
}

function cleanup_autofill(){
	var nonempty_columns = _.uniq(Object.keys(user_content).map(k => k.split(',')[1]))
	_.difference(Object.keys(autofill_programs), nonempty_columns).forEach(col => {
		delete autofill_programs[col]
	})
}

let handle_keypress = e=> {
	if(!is_typing() && e.keyCode != 13) {
		// console.log(String.fromCharCode(e.keyCode)
		user_content[[selected_row, selected_col]] = ''
		start_typing()
	}
}

document.addEventListener('keydown', handle_keydown)
document.addEventListener('keypress', handle_keypress)


document.addEventListener('mousemove', e => {
	mouse_x = e.clientX * devicePixelRatio
	mouse_y = e.clientY * devicePixelRatio
})

canvas.addEventListener('mousedown', e => {

	let start_x = e.clientX * devicePixelRatio
	let start_y = e.clientY * devicePixelRatio

	let [clicked_row, clicked_col] = cell_row_col(start_x, start_y)
	let col_divider = get_hovered_col_divider()
	let row_divider = get_hovered_row_divider()


	if(defined(clicked_row) && defined(clicked_col)){
		if(e.shiftKey){
			selected_end_row = clicked_row
			selected_end_col = clicked_col
		} else {
			set_selected(clicked_row,clicked_col)
		}

		function move() {
			scroll_into_view(selected_end_row, selected_end_col)
			;[selected_end_row, selected_end_col] = cell_row_col(mouse_x, mouse_y)
			if(!defined(selected_end_row)) selected_end_row = Math.max(row - 1, 0)
			if(!defined(selected_end_col)) selected_end_col = Math.max(col - 1, 0)
		}

		let int = setInterval(move, 30)

		function up() {
			clearInterval(int)
		}

	} else if(defined(clicked_row) && defined(row_divider)){

		let start_row_height = row_heights[row_divider] || default_row_height
		hovered_row_divider = row_divider

		function move(e){
			let dy = e.clientY * devicePixelRatio - start_y
			row_heights[row_divider] = Math.max(start_row_height + dy, default_row_height)
		}

		function up() {
			hovered_row_divider = undefined
		}

	} else if(defined(clicked_col) && defined(col_divider)){

		let start_col_width = col_widths[col_divider] || default_col_width
		hovered_col_divider = col_divider

		function move(e){
			let dx = e.clientX * devicePixelRatio - start_x
			col_widths[col_divider] = Math.max(start_col_width + dx, default_col_width)
		}

		function up() {
			hovered_col_divider = undefined
		}

	} else if(defined(clicked_col)){

		selected_row = 0
		selected_col = clicked_col

		selected_end_col = undefined
		selected_end_row = undefined

		function move(e){
			scroll_into_view(undefined, selected_end_col)
			selected_end_row = Infinity
			;[,selected_end_col] = cell_row_col(mouse_x, mouse_y)
			if(!defined(selected_end_col)) selected_end_col = Math.max(col - 1, 0)
		}

		let int = setInterval(move, 30)

		function up() {
			clearInterval(int)
		}

	} else if(defined(clicked_row)){

		selected_col = 0
		selected_row = clicked_row

		selected_end_col = undefined
		selected_end_row = undefined

		function move(e){
			scroll_into_view(selected_end_row, undefined)
			selected_end_col = Infinity
			;[selected_end_row] = cell_row_col(mouse_x, mouse_y)
			if(!defined(selected_end_row)) selected_end_row = Math.max(row - 1, 0)
		}

		let int = setInterval(move, 30)

		function up() {
			clearInterval(int)
		}

	}else{

		function up() {
			
		}		
	}

	function onup() {
		up()
		document.removeEventListener('mousemove', move)
		document.removeEventListener('mouseup', onup)
	}

	document.addEventListener('mousemove', move)
	document.addEventListener('mouseup', onup)

})


document.addEventListener('dblclick', function(e){
	ctx.save()
	ctx.font = content_font

	let [row, col] = cell_row_col(
		e.clientX * devicePixelRatio, 
		e.clientY * devicePixelRatio)
	
	let col_divider = get_hovered_col_divider()

	if(defined(row) && defined(col) && !is_typing()){
		start_typing()
	} else if(defined(col_divider)) {
		let max_width = default_col_width - cell_left_padding * 2


		max_width = Math.max(max_width, _.max(
			Object.keys(user_content)
			// _.union(Object.keys(user_content), Object.keys(autofill_content))
			.filter(k => k.split(',')[1] == col_divider)
			.map(k => {
				let [r, c] = k.split(',');
				let text = cell_text(r, c)
				let result = evaluate(text)
				return (text == result) ? text : (text + ' ' + result)
			})
			.filter(k => k.length > 1)
			.map(k => ctx.measureText(k).width)))
		
		col_widths[col_divider] = max_width + cell_left_padding * 2

	} 

	ctx.restore()
})





function get_hovered_col_divider(){
	let [row, col] = cell_row_col(mouse_x, mouse_y)

	if(!defined(row) && defined(col)){
		
		let [,prev_x,width] = visible_col_n(col)
		let next_x = prev_x + width

		if(mouse_x - prev_x <= resize_handle_width / 2) return col - 1
		if(next_x - mouse_x <= resize_handle_width / 2) return col

	}
}

function get_hovered_row_divider(){
	let [row, col] = cell_row_col(mouse_x, mouse_y)

	if(!defined(col) && defined(row)){
		
		let [,prev_y,height] = visible_row_n(row)
		let next_y = prev_y + height

		if(mouse_y - prev_y <= resize_handle_width / 2) return row - 1
		if(next_y - mouse_y <= resize_handle_width / 2) return row

	}
}





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
	selected_end_row = undefined
	selected_end_col = undefined

	scroll_into_view(row, col)
}


function set_selected_end(row, col){
	row = Math.max(row, 0)
	col = Math.max(col, 0)

	// selected_col = col
	// selected_row = row

	keygetter.blur()
	selected_end_row = row
	selected_end_col = col

	scroll_into_view(row, col)
}


function bump_selected_end(rows, cols){
	set_selected_end(
		_.defaultTo(selected_end_row, selected_row) + rows, 
		_.defaultTo(selected_end_col, selected_col) + cols)
}

function bump_selected(rows, cols) {
	set_selected(selected_row + rows, selected_col+cols)
}

function scroll_into_view(r, c){
	if(defined(r) && r < row) row = r;
	if(defined(c) && c < col) col = c;

	let [last_row] = last_visible_row()
	let [last_col] = last_visible_col()

	if(defined(r) && r > last_row - 1) row += r - last_row + 1
	if(defined(c) && c > last_col - 1) col += c - last_col + 1
}



function start_typing(){
	console.log('start typing')

	selected_end_col = undefined
	selected_end_row = undefined
	
	keygetter.style.display = 'initial'
	keygetter.focus()
	keygetter.value = user_content[[selected_row, selected_col]] || ''
	let [x, y] = cell_x_y(selected_row, selected_col)
	keygetter.style.top = y / devicePixelRatio + 'px'
	keygetter.style.left = x / devicePixelRatio + 'px'
	keygetter.style['padding-left'] = cell_left_padding / devicePixelRatio + 'px'
	keygetter.style.height = (row_heights[selected_row] || default_row_height) / devicePixelRatio + 'px'
	keygetter.style['font-size'] = (default_row_height - 20) / devicePixelRatio +'px'
	sync_canvas_and_keygetter()
}


function defined(x){
	return typeof x != 'undefined'
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

auto_fill()