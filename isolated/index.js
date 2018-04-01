// import 'babel-polyfill'
// import 'lodash'
// import * as language from '../shared/lang'

let ctx = canvas.getContext('2d')

let row = 0
let col = 0

const DEFAULT_COL_WIDTH = 200
const DEFAULT_ROW_HEIGHT = 50

const LEFT_MARGIN = 60
const TOP_MARGIN = 40

const RESIZE_HANDLE_WIDTH = 20
const RESIZE_HANDLE_DRAWN_WIDTH = 4

const SELECTION_COLOR = '#48f'

const CONTENT_FONT = DEFAULT_ROW_HEIGHT - 20 +'px Helvetica'
const SCALE = 2

let max_row = 50
let max_col = 10

let col_widths = {}
let row_heights = {}

let selected_row = 0
let selected_col = 0

let selected_end_row;
let selected_end_col;

let command_down = false;

let user_content = {}
// let autofill_content = {}
var autofill_programs = {}
var loading_programs = {}

let undo_actions = []
let redo_actions = []

let dragging_col_divider
let dragging_row_divider

let mouse_x
let mouse_y

let sheetName

let paused = false

function pause(){
    paused = true;
}

function resume(){
    paused = false;
}

window.pause = pause
window.resume = resume

keygetter.style.display = 'none';

// let worker = new Worker(window.workerpath)

// function getWorkerMessage({data}){
//     let {program, col} = data

//     console.log('got', col, program)

//     autofill_programs[col] = hydrate(program)

//     clearTimeout(loading_programs[col])
//     delete loading_programs[col]
// }

// worker.onmessage = getWorkerMessage


function hydrate(frag){

    if(!defined(frag)) return;

    if(!frag.type) return frag

    let greg = new language[frag.type]()

    Object.keys(frag).forEach(key => {
        if(Array.isArray(frag[key])) greg[key] = frag[key].map(hydrate)
        else greg[key] = hydrate(frag[key])
    })

    return greg
}

function render() {

    canvas.width = innerWidth * SCALE
    canvas.height = innerHeight * SCALE

    canvas.style.width = innerWidth+'px'
    canvas.style.height = innerHeight+'px'

    ctx.clearRect(0,0,canvas.width, canvas.height)

    draw_label_backgrounds()

    draw_horizontal_lines_and_labels()
    draw_vertical_lines_and_labels()

    draw_hovered_divider()

    if(!paused) draw_cells_text()

    draw_selected_cell()
    draw_selection_region()

    if(Math.random() < 1/60) save()

    // ctx.fillStyle = 'rgba(0,0,0,.1)'
    // if(row > 0) ctx.fillRect(LEFT_MARGIN, TOP_MARGIN, canvas.width, 10);
    // if(col > 0) ctx.fillRect(LEFT_MARGIN, TOP_MARGIN, 10, canvas.height);

}



function save(){
    localStorage[sheetName] = JSON.stringify({
        user_content,
        row,
        col,
        col_widths,
        row_heights,
        selected_row,
        selected_col,
        selected_end_row,
        selected_end_col,
        autofill_programs,
    })
}
window.save = save

function clear(sn){
    delete localStorage[sn]
}
window.clear = clear

function load(sn){

    sheetName = sn

    // if(!localStorage[sheetName]) return; //loadfake();

    ;({
        user_content,
        row,
        col,
        col_widths,
        row_heights,
        selected_row,
        selected_col,
        selected_end_row,
        selected_end_col,
        autofill_programs,
    } = Object.assign({
        user_content:{
            "0,0": ""
        },
        row:0,
        col:0,
        col_widths:{},
        row_heights:{},
        selected_row:0,
        selected_col:0,
        autofill_programs:{}
    }, JSON.parse(localStorage[sheetName] || '{}')))    

    Object.keys(autofill_programs).forEach(key => {
        autofill_programs[key] = hydrate(autofill_programs[key])
    })
    loading_programs = {}
}

window.load = load

function loadfake(){
    let data = `Elsie   Graham  2/6/1986
    Troy    Osborne 6/25/1967
    Jared   King    2/14/1985
    Evan    Cummings    8/10/1972
    Daisy   Cobb    6/9/1976
    Nora    Baldwin 4/28/1996
    Esther  Bailey  8/20/1958
    Christina   Aguilar 8/9/1980
    Gordon  Burns   5/6/1956
    Gary    Schneider   3/30/1987
    Randall Burton  5/29/1972
    Cordelia    Vasquez 4/24/1982
    Verna   Walsh   10/21/1987
    Isabella    Parks   10/31/1985
    Eliza   Kelly   11/14/1984
    Lou Luna    5/5/1955
    Louis   Poole   4/11/1964
    Terry   Perkins 3/17/1956
    Leonard Russell 5/5/1996
    Elijah  Colon   3/27/1958
    Leo McKinney    1/29/1997
    Tom Rivera  9/23/1984
    Hettie  Ferguson    3/28/1984
    Sallie  Wheeler 6/13/1997
    Francis Duncan  11/1/1972
    Myrtle  Francis 8/22/1965
    Mason   Franklin    4/28/1974
    Jeffrey Thornton    3/1/1966
    Melvin  Castillo    12/10/1952
    Pauline Maxwell 6/18/1996
    Jerome  Holt    8/3/1981
    Ellen   Romero  7/28/1995
    Lydia   Gordon  8/29/1963
    Lois    Brooks  10/18/1997
    Edward  Francis 6/23/1973
    Nelle   Pena    3/13/1965
    Edward  Welch   7/15/1970
    Helen   Simon   12/25/1976
    Marc    Love    2/18/1973
    Vera    Martinez    7/13/1996
    Eric    Wise    4/2/1990
    Winnie  Williamson  9/26/1990
    Adam    Reynolds    9/26/1954
    Alberta Carter  5/9/1972
    Barry   Flores  12/28/1968
    Mathilda    Price   8/3/1995
    May Maxwell 7/20/1980
    Jay Frazier 6/2/1991
    Christian   Hardy   7/18/1994
    Ronnie  Terry   4/8/1965
    Teresa  Price   12/13/1953
    Olive   Matthews    9/13/1965
    Harold  Salazar 1/18/1967
    Connor  Brock   10/3/1963
    Kathryn Lane    10/12/1988
    Katharine   Schneider   12/4/1995
    Emilie  Burgess 5/26/1991
    Lucile  Walker  4/21/1989
    Lewis   Lynch   3/20/1952
    Cornelia    Stephens    10/20/1988
    Jeremy  Owens   10/18/1974
    Eva Smith   3/17/1987
    Jeremy  Harmon  9/27/1985
    William Clarke  12/23/1994
    Frederick   Collins 6/23/1967
    Donald  Moore   2/15/1970
    Todd    Alvarado    8/31/1986
    Randy   Baldwin 9/11/1989
    Elijah  Hunt    5/5/1982
    Hattie  Fleming 5/2/1952
    Blake   Bennett 8/11/1970
    Myra    Simpson 11/4/1988
    Cynthia Lowe    5/27/1971
    Ivan    Gonzalez    2/8/1986
    Rosetta Carson  8/22/1960
    Tillie  Wilkerson   5/11/1993
    Luella  Alvarado    10/18/1952
    Louis   Hines   7/26/1958
    Roy Fields  9/4/1983
    Lee Walker  7/24/1987
    Bess    Fuller  8/14/1991
    Edna    Shaw    12/6/1993
    Connor  Soto    5/23/1957
    Phoebe  Alvarez 8/4/1952
    Katie   Perkins 5/28/1978
    Teresa  Martin  12/8/1968
    Benjamin    Welch   12/11/1974
    Micheal Lynch   1/24/1994
    Mollie  Floyd   7/25/1971
    Sylvia  Caldwell    8/28/1975
    Wayne   Cortez  5/24/1997
    Jacob   Stokes  11/19/1983
    Elizabeth   Moran   1/25/1981
    Nettie  Bryant  3/14/1954
    Jean    Pope    7/28/1954
    Lena    Berry   7/30/1969
    Dale    Curtis  9/25/1964
    Rhoda   Floyd   10/23/1991
    Dale    Frank   11/23/1993
    Cody    Little  5/21/1954`
    let row = 0
    data.split('\n').forEach(line => {
        let col = 0
        let entries = line.split('\t');
        entries.forEach(entry => {
            user_content[[row, col]] = entry
            col++
        })
        row++
    })
}


function draw_label_backgrounds(){
    ctx.save()
    ctx.fillStyle = '#eee'
    ctx.fillRect(0,0,canvas.width, TOP_MARGIN)
    ctx.fillRect(0,0,LEFT_MARGIN, canvas.height)
    ctx.fillStyle = '#222'
    ctx.restore()
}



function draw_hovered_divider(){
    ctx.save()
    ctx.fillStyle = SELECTION_COLOR

    let col_divider = defined(dragging_col_divider) 
        ? dragging_col_divider
        : get_hovered_col_divider()
    let row_divider = defined(dragging_row_divider)
        ? dragging_row_divider
        : get_hovered_row_divider()

    document.body.style.cursor = 'default'

    if(defined(col_divider) && col_divider >= 0){
        document.body.style.cursor = 'col-resize'
        let [,x,width] = visible_col_n(col_divider)
        ctx.fillRect(x + width - RESIZE_HANDLE_DRAWN_WIDTH / 2, 0, RESIZE_HANDLE_DRAWN_WIDTH, TOP_MARGIN)
    }

    if(defined(row_divider) && row_divider >= 0){
        document.body.style.cursor = 'row-resize'
        let [,y, height] = visible_row_n(row_divider)
        ctx.fillRect(0, y + height - RESIZE_HANDLE_DRAWN_WIDTH / 2, LEFT_MARGIN, RESIZE_HANDLE_DRAWN_WIDTH)
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
            ctx.fillRect(0, rendered_height, LEFT_MARGIN, height)
        }
        ctx.fillStyle = '#222'
        ctx.fillText(row + 1, LEFT_MARGIN - 10, rendered_height + height / 2)

        ctx.beginPath()
        ctx.moveTo(0, rendered_height)
        ctx.lineTo(canvas.width, rendered_height)
        ctx.stroke()
    }

    ctx.restore()
}












const colname = c => c.toString(26).split('').map(c => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'['0123456789abcdefghijklmnop'.indexOf(c)]).join('')


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
            ctx.fillRect(rendered_width, 0, width, TOP_MARGIN)
        }
        ctx.fillStyle = '#222'
        // let letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        // let b26 = '0123456789abcdefghijklmnop'
        // let text = col.toString(26).split('').map(c => letters[b26.indexOf(c)]).join('')
        let text = colname(col)
        ctx.fillText(text, rendered_width + width / 2, TOP_MARGIN / 2)

        ctx.beginPath()
        ctx.moveTo(rendered_width, 0)
        ctx.lineTo(rendered_width, canvas.height)
        ctx.stroke()        
    }

    ctx.restore()
}













const cell_horizontal_padding = 6
const cell_bottom_padding = 14
let suggestion_color = '#08c773'//'hsl(134, 50%, 50%)'


function draw_cell_text(row, col){
    ctx.save()

    ctx.font = CONTENT_FONT
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.lineWidth = 1
    ctx.strokeStyle = '#ccc'

    let [r, y, height] = row
    let [c, x, width] = col

    let drawing_suggestion_text = !user_content[[r, c]]
    let text = cell_text(r, c)
    
    if(!text) return;

    let editing_this_cell = is_typing() && selected_row == r && selected_col == c
    let [edit_width, display_width] = cell_text_display_width(r, c)
    let cell_width = editing_this_cell
        ? edit_width
        : display_width

    ctx.clearRect(x+1, y+1, cell_width, height - 2)

    let text_width = measure_text(text).width;

    let result = evaluate(text);
    let drawing_result = result != text

    let result_width = measure_text(result).width + cell_horizontal_padding * 2

    let drawing_upgrade_text = !editable(r,c)
    
    function draw_normal_text(){
        let cropped_text = text.slice(0, 5 + text.length * cell_width / text_width)
        ctx.textAlign = 'start'
        ctx.fillStyle = drawing_suggestion_text
            ? suggestion_color
            : '#222'
        ctx.fillText(cropped_text, x + cell_horizontal_padding, y + height/2 )
    }

    // function draw_fancy_upgrade_text(){
    //  let cropped_text = text.slice(0, 5 + text.length * cell_width / text_width)
    //  ctx.textAlign = 'start'
    //  // let n = (1 - 1/Math.log((r*r + c*c)/100))
    //  // ctx.fillStyle = 'rgba(0,0,0,'+n+')'
    //  // if(Math.random() > .99) console.log(ctx.fillStyle, n)

    //  let dr = r - max_row
    //  let dc = c - max_col

    //  let d = Math.min(Math.max(dr,dc)/20, 1)
    //  let now = Date.now() / 500


    //  const perlin = (a,b) => {
    //      const rand = x => {
    //          for (let i = 0; i < 3; i++) x = (x * 16807 % 2147483647) - 1
    //          return x / 2147483646
    //      }

    //      let sum = 0
    //      for (var i = 0; i < 5; i++){
    //          a = a >> 1
    //          b = b >> 1
    //          sum += rand(1/2 * (a+b) * (a+b+1) + b)
    //      }

    //      return sum / i  
    //  }

    //  const blurlin = (a,b) => (perlin(a,b) +
    //                  perlin(a+1,b) +  
    //                  perlin(a,b+1) /2 +  
    //                  perlin(a-1,b) +  
    //                  perlin(a,b-1) /2 )/4

    //  let h = blurlin(r,c*5)
    //  if( h > .7) ctx.fillStyle = 'rgba(0,100,0,'+h+')'
    //  else if( h > .6) ctx.fillStyle = 'rgba(120,100,0,'+h+')'
    //  else if( h > .6) ctx.fillStyle = '#ddca92'
    //  else ctx.fillStyle = 'rgba(0,0,255,'+(1-h)+')'

    //  ctx.fillRect(x+1, y+1, cell_width - 2, height - 2)
    //  ctx.fillStyle =  'rgba(0,0,0,.3)'

    //  let wavex = cell_horizontal_padding * Math.sin( now + r ) * d
    //  let wavey = cell_horizontal_padding * Math.cos( now + c ) * d
    //  ctx.fillText(
    //      cropped_text, 
    //      x + cell_horizontal_padding + wavex,
    //      y + height/2 + wavey
    //  )
    // }



    function draw_upgrade_text(){

        // if(r != selected_row || c != selected_col) return;

        let cropped_text = text.slice(0, 5 + text.length * cell_width / text_width)
        ctx.textAlign = 'start'
        ctx.fillStyle = 'rgba(0,0,0,.05)'

        ctx.fillRect(x+1, y+1, cell_width - 2, height - 2)
        ctx.fillStyle =  'rgba(0,0,0,.3)'

        ctx.fillText(cropped_text, x + cell_horizontal_padding, y + height/2)
    }

    function draw_squished_text(){
        let cropped_text = text.slice(-Math.floor(text.length * (cell_width - result_width) / text_width))
        ctx.textAlign = 'end'
        ctx.fillStyle = drawing_suggestion_text ? suggestion_color : '#222'


        var gradient = ctx.createLinearGradient(x,0,x+30,0);
        gradient.addColorStop(0.5,"rgba(255, 255, 255, 1)");
        gradient.addColorStop(1,"rgba(255, 255, 255, 0)");

        ctx.fillText(cropped_text, x+cell_horizontal_padding + cell_width - result_width, y + height/2 )

        ctx.fillStyle = gradient
        ctx.fillRect(x+1, y + 1, 30, height - 2);
    }

    function draw_result(){
        // ctx.clearRect(x+1+cell_width - result_width, y+1, result_width, height - 2)
        ctx.textAlign = 'end'
        ctx.fillStyle = (result === 'ERROR') ? 'red' : '#007fff'
        ctx.fillText(result, x + cell_width - cell_horizontal_padding, y + height / 2)
    }


    if(drawing_upgrade_text){
        
        draw_upgrade_text()

    }else if(defined(loading_programs[c]) && drawing_suggestion_text){
        
        // console.log('asdf')
        const now = (Date.now() / 100) % (Math.PI * 2)

        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = '#48f'
        ctx.arc(x + width / 2, y + height / 2, 10, now, now + Math.PI*2* 3/4)
        ctx.stroke()
        ctx.restore()

    } else if(drawing_result){
        // let selected = c == selected_col //&& r == selected_row
        
        // let region = get_selection_region()      
        // if(region){
        //  let [ssrow, sscol, serow, secol] = region
        //  selected = selected || ssrow <= r && r <= serow 
        //          && sscol <= c && c <= secol
        // }

        draw_result()
        if(result_width + text_width < cell_width){
            draw_normal_text()
        }else{
            draw_squished_text()
        }
    
    } else {
        draw_normal_text()
    }
    

    ctx.beginPath()
    ctx.moveTo(x + cell_width, y)
    ctx.lineTo(x + cell_width, y+height)
    ctx.stroke()
    
    ctx.restore()
}


function evaluate(text){
    // prefix notation or suffix notation that is the question
    if(text.trim().endsWith('=')){
        
        try {
            var result = eval(text.trim().replace(/=$/, ''))
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
    ctx.font = CONTENT_FONT
    let text = cell_text(r, c)
    var desired_width = measure_text(text).width + cell_horizontal_padding;

    let result = evaluate(text)
    if(result != text){
        text += result;
        desired_width += measure_text(result).width + cell_horizontal_padding
    }

    let display_width = col_width(c)
    let edit_width = display_width
    let next_col = c + 1
    let hit_filled_cell = false
    while(edit_width < desired_width){
        let next_col_width = col_width(next_col)
    
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
        : col_width(selected_col)

    let height = row_heights[selected_row] || DEFAULT_ROW_HEIGHT
    let [selected_x, selected_y] = cell_x_y(selected_row, selected_col)

    ctx.strokeStyle = SELECTION_COLOR
    ctx.lineWidth = 4
    ctx.strokeRect(selected_x, selected_y, width, height)
    // ctx.fillStyle = SELECTION_COLOR
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
    ctx.strokeStyle = SELECTION_COLOR
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
    
    let width = col_width(col)
    let height = row_heights[row] || DEFAULT_ROW_HEIGHT
    let prev_width = col_width(col - 1)
    let prev_height = row_heights[row-1] || DEFAULT_ROW_HEIGHT
    
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




function paste(text, region = [selected_row, selected_col]){
    let row = region[0]
    text.split(/\r\n|\r|\n/).forEach(line => {
        let col = region[1]
        line.split('\t').forEach(entry => {
            if(editable(row, col)) user_content[[row, col]] = entry
            col++
        })
        row++
    })
}



function insert_csv(data, row=0, col=0){
    let lines = data.split(/\r\n|\r|\n/).map(line => line.split('\t'))

    let region = [
        row,
        col,
        row + lines.length,
        col + Math.max(...lines.map(line => line.length))
    ]

    add_undo_action(region)

    paste(data, region)
    auto_fill() 
}

window.insert_csv = insert_csv

let exported;
function save_csv(){
    var data = new Blob([to_text([0,0,Infinity,Infinity])], {type: 'text/csv'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (exported !== null) window.URL.revokeObjectURL(exported);

    exported = window.URL.createObjectURL(data);

    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = exported
    a.download = sheetName + '.csv';
    document.body.appendChild(a)
    a.click()
}

window.save_csv = save_csv

document.addEventListener('paste', function(e){
    let data = e.clipboardData.getData('text/plain')
    if(data.includes('\n') || data.includes('\t') || !is_typing()){
        e.preventDefault()
        insert_csv(data, selected_row, selected_col)
    }
})





function filled_region(region){
    let [start_row, start_col, end_row, end_col] = region

    if(end_row == Infinity){ // copy ot end of allowed region if finite
        let finite_end_row = max_row == Infinity ? start_row : max_row
        let finite_end_col = max_col == Infinity ? start_col : max_col
        
        Object.keys(user_content).forEach(k => {
            let [r, c] = k.split(',')
            finite_end_row = Math.max(finite_end_row, r);
            finite_end_col = Math.max(finite_end_col, c);
        })

        end_row = finite_end_row
        end_col = finite_end_col
    }

    return [start_row, start_col, end_row, end_col]
}



function to_text(region, method='computed'){
    let [start_row, start_col, end_row, end_col] = filled_region(region)

    return _.range(start_row, end_row+1)
    .map(row => _.range(start_col, end_col+1)
                .map(col => {
                    if(method === 'computed') return evaluate(cell_text(row, col))
                    else if(method === 'autofilled') return cell_text(row, col)
                    else if(method === 'input') return user_content[[row, col]]
                    else throw 'on no!'
                })
                .join('\t'))
    .join('\n')
}


document.addEventListener('copy', function(e){

    if(is_typing()) return;

    e.preventDefault()

    let region = get_selection_region() || [selected_row, selected_col, selected_row, selected_col]
    let data = e.shiftKey ? to_text(region, 'autofilled') : to_text(region, 'computed')

    e.clipboardData.setData('text/plain', data);

})


document.addEventListener('cut', e => {
    if(is_typing()) return;
    e.preventDefault()

    let region = get_selection_region() || [selected_row, selected_col, selected_row, selected_col]

    let data = to_text(region)
    delete_region(region)

    e.clipboardData.setData('text/plain', data);
})


function delete_region(region){
    let [start_row, start_col, end_row, end_col] = filled_region(region)

    add_undo_action(region)

    _.range(start_row, end_row+1)
    .forEach(row =>
        _.range(start_col, end_col+1)
        .forEach(col =>{
            delete user_content[[row, col]]
        }))

    // delete all empty columns
    // cleanup_autofill()
    auto_fill()

}


keygetter.addEventListener('blur', e=> {
    keygetter.style.display = 'none';
    auto_fill()
    // if(user_content[[selected_row, selected_col]] && user_content[[selected_row, selected_col]].length === 0)
    //  delete user_content[[selected_row, selected_col]]
})


function sync_canvas_and_keygetter() {
    ctx.save()
    ctx.font = CONTENT_FONT
    let desired_width = measure_text(keygetter.value).width
    keygetter.style.width = (measure_text(keygetter.value).width + cell_horizontal_padding + 2) / SCALE
    user_content[[selected_row, selected_col]] = keygetter.value
    ctx.restore()
}


keygetter.addEventListener('input', sync_canvas_and_keygetter)

let program_cache = new WeakMap()
function apply_program(program, sigma){
    if(!program) return '';

    if(!program_cache.has(program)) program_cache.set(program, new Map())
    
    let res = program_cache.get(program),
        key = JSON.stringify(sigma)

    if(res.has(key)) return res.get(key)

    try {

        let val = program.apply(sigma)
        res.set(key, val)

        return val
    } catch (err) {
        return ''
    }
}

let resets = []

function frame_memo(f){
    let cache = {}
    resets.push(() => cache = {})
    return (...args) => {
        let a = JSON.stringify(args)

        if(a in cache) return cache[a]

        let b = f(...args)
        cache[a] = b
        return b
    }
}

function _get_sigma(row, col){
    var sigma = _.range(+col)
        .map(c => 
            evaluate(cell_text(row, c)))

    let ret = [
        +row+1 + '',
        +row > 0 ? evaluate(cell_text(row-1, col)) : '',
        +row > 1 ? evaluate(cell_text(row-2, col)) : ''
    ]

    return ret.concat(sigma);
}

let get_sigma = frame_memo(_get_sigma)

function cell_text(r, c){


    // let teaser = colname(c) + (r+1) + ': upgrade to unlock this cell! '
    // // let t = Math.floor(Date.now()/1000 * r * c ) % teaser.length

    // if(r >= max_row || c >= max_col) return teaser//teaser.slice(t) + teaser.slice(0, t)

    if(user_content[[r, c]]){
        return user_content[[r, c]];
    }
    
    if(autofill_programs[c]) {
        let program = autofill_programs[c];
        // debugger
        return apply_program(program, get_sigma(r, c))
    }

    return ''
}



function numerical_simple(numsigma, numoutputs){
    function train(x0, fn){
        for(var col = 0; col < numsigma[0].length; col++){
            // try {
                var result = minimize(function f(x){
                    return _.sum(numoutputs.map((k, i) => 
                        (fn([numsigma[i][col], ...x]) - k)**2))
                }, x0)
            // } catch (err) {
            //  console.log('failed', err, x0)
            // }
            if(result && result.f < 0.001){
                var rounded = result.solution.map(k => Math.round(k * 1024) / 1024);

                return function(sigma){
                    return fn([sigma[col], ...rounded])
                }
                console.log(result.solution, 'solved')
            }
        }
    }

    var constant = train([1], ([x, p]) => p)
    if(constant) return constant;

    var constant = train([1], ([x, p]) => x + p)
    if(constant) return constant;

    var constant = train([1, 1], ([x, p, n]) => x * p + n)
    if(constant) return constant;

    var constant = train([1], ([x, p]) => p ** x)
    if(constant) return constant;

    var constant = train([1], ([x, p]) => x ** p)
    if(constant) return constant;
    
    var constant = train([1, 2], ([x, p, n]) => n * p ** x)
    if(constant) return constant;

    var constant = train([2, 1], ([x, p, n]) => n * p ** (x + 1))
    if(constant) return constant;
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

        try{
            var lp = numerical_simple(numsigma, numoutputs);
            if(lp) return { apply: sigma => lp(input_to_vec(sigma)) + '' };             
        } catch(e){}

        try{
            let wolo = regress(numsigma, numoutputs)
            if(wolo) return { apply: sigma => wolo(input_to_vec(sigma)) + '' };
        } catch(e){}
    }

    var pset = lazy_generate_intersect_multidags(inputs, outputs);
    
    try {
        var program = pset.sample()
    } catch (err) { 
        console.log('sample error', pset, err)
    }
    
    console.log(inputs, outputs, pset, program)

    return program;
}


function auto_fill(){

    cleanup_autofill()

    var nonempty = Object.keys(user_content).filter(k => user_content[k]);
    var cols  = _.groupBy(nonempty, k => k.split(',')[1]);
    var col_ids = _.sortBy(Object.keys(cols), k => +k);

    for(var i = 0; i < col_ids.length; i++){
        let col = col_ids[i];
        let row_ids = cols[col];

        let max_col_height = _.max(col_ids.slice(0, i).map(k => 
            _.max(_.flatten(cols[k].map(e => +e.split(',')[0])))))

        if(max_col_height && cols[col].length >= max_col_height) continue;

        // TODO: make sure most recently edited thing is part of the sample
        // alternatively, don't sample and use everything... 
        // if we can make intersect_lazy_whatever_generate_something 
        // sufficiently speedy

        const is_formula = r => cell_text(+r, col).trim().endsWith('=')

        let _examples = _.sampleSize(row_ids, 5)
        
        let has_formula = _examples.some(e => is_formula(e.split(',')[0]))

        let examples = _examples.map(k => {
            var row_prefix = k.split(',')[0];
            // ignore non-formula inputs
            if(!has_formula || is_formula(row_prefix)) return [get_sigma(row_prefix, col), user_content[k]]
        }).filter(x=>x)

        // if the previously cached program still works, use that
        // and don't do the expensive recomputation

        // worker.postMessage({examples, col})
        // console.log('filling', col)
        loading_programs[col] = setTimeout(() => {
            // console.log('killing worker due to timeout')
            // worker.terminate()
            // worker = new Worker('../magic/worker.js')
            // worker.onmessage = getWorkerMessage

            clearTimeout(loading_programs[col])
            delete loading_programs[col]
        }, 5000)

        // let cached_program = autofill_programs[col]
        // if(cached_program){
        //  if(_.every(examples.map(([sigma, out]) => 
        //      apply_program(cached_program, sigma) == out))){
        //      continue
        //  }
        // }

        // // intersect_programs
        // let program = sample_program(examples);
        // if(program){
        //  autofill_programs[col] = program;
        // }else{
        //  delete autofill_programs[col]
        // }

    }
}


let handle_keydown = e=> {
    if(e.keyCode == 9) {
        e.preventDefault()
        // auto_fill()
        e.shiftKey
            ? bump_selected(0, -1)
            : bump_selected(0, 1)
    }
    
    if(e.keyCode == 13 && is_typing()){
        // auto_fill()
        bump_selected(1, 0)
    } else if(e.keyCode == 13 && !is_typing()) start_typing()
    
    var bump = e.shiftKey ? bump_selected_end : bump_selected
    if(e.keyCode == 37 && (!is_typing() || keygetter.selectionStart === 0 )) bump(0, -1)
    if(e.keyCode == 38) bump(-1, 0)
    if(e.keyCode == 39 && (!is_typing() || keygetter.selectionEnd === keygetter.value.length)) bump(0, 1)
    if(e.keyCode == 40) bump( 1, 0)


    if((e.keyCode == 8 || e.keyCode == 46) && !is_typing()) {
        let region = get_selection_region() || [selected_row, selected_col, selected_row, selected_col]
        delete_region(region)
    }

    if([17, 91].includes(e.keyCode)) command_down = true

    // console.log(e.keyCode)
    if(e.keyCode == 67 && command_down && !is_typing()){ //z
        console.log('asdf')
    }


    if(e.keyCode == 90 && command_down && !is_typing()){ //z
        e.preventDefault()
        if(e.shiftKey) redo()
        else undo()
        auto_fill()
    }
    if(e.keyCode == 65 && command_down && !is_typing()){ //a
        set_selected(0,0)
        selected_end_row = Infinity
        selected_end_col = Infinity
    }
}

document.addEventListener('keyup', e => {
    if([17, 91].includes(e.keyCode)) command_down = false
})

function cleanup_autofill(){
    var nonempty_columns = _.uniq(
        Object.keys(user_content)
        .filter(k => user_content[k])
        .map(k => k.split(',')[1]));

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
    mouse_x = e.clientX * SCALE
    mouse_y = e.clientY * SCALE
})

canvas.addEventListener('mousedown', e => {

    let start_x = e.clientX * SCALE
    let start_y = e.clientY * SCALE

    let [clicked_row, clicked_col] = cell_row_col(start_x, start_y)
    let col_divider = get_hovered_col_divider()
    let row_divider = get_hovered_row_divider()

    var move, up

    if(defined(clicked_row) && defined(clicked_col)){
        if(e.shiftKey){
            selected_end_row = clicked_row
            selected_end_col = clicked_col
        } else {
            set_selected(clicked_row,clicked_col)
        }

        move = function() {
            scroll_into_view(selected_end_row, selected_end_col)
            ;[selected_end_row, selected_end_col] = cell_row_col(mouse_x, mouse_y)
            if(!defined(selected_end_row)) selected_end_row = Math.max(row - 1, 0)
            if(!defined(selected_end_col)) selected_end_col = Math.max(col - 1, 0)
        }

        let int = setInterval(move, 30)

        up = function() {
            clearInterval(int)
        }

    } else if(defined(clicked_row) && defined(row_divider)){

        let start_row_height = row_heights[row_divider] || DEFAULT_ROW_HEIGHT
        dragging_row_divider = row_divider

        move = function(e){
            let dy = e.clientY * SCALE - start_y
            row_heights[row_divider] = Math.max(start_row_height + dy, DEFAULT_ROW_HEIGHT)
        }

        up = function() {
            dragging_row_divider = undefined
        }

    } else if(defined(clicked_col) && defined(col_divider)){

        let start_col_width = col_width(col_divider)
        dragging_col_divider = col_divider

        move = function(e){
            let dx = e.clientX * SCALE - start_x
            col_widths[col_divider] = Math.max(start_col_width + dx, DEFAULT_COL_WIDTH)
        }

        up = function() {
            dragging_col_divider = undefined
        }

    } else if(defined(clicked_col)){

        selected_row = 0
        selected_col = clicked_col

        selected_end_col = undefined
        selected_end_row = undefined

        move = function(e){
            scroll_into_view(undefined, selected_end_col)
            selected_end_row = Infinity
            ;[,selected_end_col] = cell_row_col(mouse_x, mouse_y)
            if(!defined(selected_end_col)) selected_end_col = Math.max(col - 1, 0)
        }

        let int = setInterval(move, 30)

        up = function() {
            clearInterval(int)
        }

    } else if(defined(clicked_row)){

        selected_col = 0
        selected_row = clicked_row

        selected_end_col = undefined
        selected_end_row = undefined

        move = function(e){
            scroll_into_view(selected_end_row, undefined)
            selected_end_col = Infinity
            ;[selected_end_row] = cell_row_col(mouse_x, mouse_y)
            if(!defined(selected_end_row)) selected_end_row = Math.max(row - 1, 0)
        }

        let int = setInterval(move, 30)

        up = function() {
            clearInterval(int)
        }

    }

    function onup() {
        if(up) up();
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', onup)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', onup)

})


document.addEventListener('dblclick', function(e){
    ctx.save()
    ctx.font = CONTENT_FONT

    let [row, col] = cell_row_col(
        e.clientX * SCALE, 
        e.clientY * SCALE)
    
    let col_divider = get_hovered_col_divider()

    if(defined(row) && defined(col) && !is_typing()){
        start_typing()
    } else if(defined(col_divider)) {
        let max_width = DEFAULT_COL_WIDTH - cell_horizontal_padding * 2
        let max_row = Math.max(...Object.keys(user_content).map(k => +k.split(',')[0]), last_visible_row()[0])
        
        for(var r = 0; r < max_row; r++){
            let text = cell_text(r, col_divider)
            let result = evaluate(text)
            let combined = (text == result) ? text : (text + ' ' + result);
            if(combined.length > 1){
                max_width = Math.max(max_width, measure_text(combined).width)
            }
        }
        col_widths[col_divider] = max_width + cell_horizontal_padding * 2
    } 

    ctx.restore()
})





function get_hovered_col_divider(){
    let [row, col] = cell_row_col(mouse_x, mouse_y)

    if(!defined(row) && defined(col)){
        
        let [,prev_x,width] = visible_col_n(col)
        let next_x = prev_x + width

        if(mouse_x - prev_x <= RESIZE_HANDLE_WIDTH / 2) return col - 1
        if(next_x - mouse_x <= RESIZE_HANDLE_WIDTH / 2) return col

    }
}

function get_hovered_row_divider(){
    let [row, col] = cell_row_col(mouse_x, mouse_y)

    if(!defined(col) && defined(row)){
        
        let [,prev_y,height] = visible_row_n(row)
        let next_y = prev_y + height

        if(mouse_y - prev_y <= RESIZE_HANDLE_WIDTH / 2) return row - 1
        if(next_y - mouse_y <= RESIZE_HANDLE_WIDTH / 2) return row

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

const editable = (r, c) => r < max_row && c < max_col
const col_width = c => col_widths[c] || (c < max_col ? DEFAULT_COL_WIDTH : 440)

function is_typing() {
    return document.activeElement === keygetter
}

function *visible_cols(){
    let rendered_width = LEFT_MARGIN
    let cur_col = col
    while(rendered_width <= canvas.width){
        let width = col_width(cur_col)
        yield [cur_col++, rendered_width, width]
        rendered_width += width
    }
}

function *visible_rows(){
    let rendered_height = TOP_MARGIN
    let cur_row = row
    while(rendered_height <= canvas.height){
        let height = row_heights[cur_row] || DEFAULT_ROW_HEIGHT
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

function display_help_message(message){
    window.parent.$crisp.debug.Trigger.__action_message({}, {default: message})
}

let warned = false

function set_selected(row, col){

    let old_text = cell_text(selected_row, selected_col)
    if(old_text.startsWith('=')){

        console.log(old_text)
        if(!warned) {
            warned = true
            display_help_message('Sorry! Robosheets doesn\'t support excel-style formulas.')
        }

    }

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
    // console.log('start typing')

    if(!editable(selected_row, selected_col)) return

    add_undo_action([selected_row, selected_col, selected_row, selected_col])

    selected_end_col = undefined
    selected_end_row = undefined
    
    keygetter.style.display = 'initial'
    keygetter.focus()
    keygetter.value = user_content[[selected_row, selected_col]] || ''
    let [x, y] = cell_x_y(selected_row, selected_col)
    keygetter.style.top = y / SCALE + 'px'
    keygetter.style.left = x / SCALE + 'px'
    keygetter.style['padding-left'] = cell_horizontal_padding / SCALE + 'px'
    keygetter.style.height = (row_heights[selected_row] || DEFAULT_ROW_HEIGHT) / SCALE + 'px'
    keygetter.style['font-size'] = (DEFAULT_ROW_HEIGHT - 20) / SCALE +'px'
    sync_canvas_and_keygetter()
}

let measure_text_cache = {}
function measure_text(text){
    
    if(! measure_text_cache[text]){
        ctx.save()
        ctx.font = CONTENT_FONT
        measure_text_cache[text] = ctx.measureText(text)
        ctx.restore()       
    }

    return measure_text_cache[text]

}


function defined(x){
    return typeof x != 'undefined'
}

const action = region => ({
    region,
    data: to_text(region, 'input'),
    row, col,
    selected_row, selected_col, 
    selected_end_row, selected_end_col
}) 

function add_undo_action(region, clear_redo = true){
    if(clear_redo) redo_actions = []
    undo_actions.push(action(region))
}

function add_redo_action(region){
    redo_actions.push(action(region))
}

function execute(action){
    ;({
        row, col,
        selected_row, selected_col, 
        selected_end_row, selected_end_col
    } = action)
    paste(action.data, action.region)
    // auto_fill()
}

function undo(){
    let action = undo_actions.pop()
    if(!action) return;

    add_redo_action(action.region)
    execute(action)
}


function redo(){
    let action = redo_actions.pop()

    if(!action) return;

    add_undo_action(action.region, false)
    execute(action)
}

let tick = () => {
    requestAnimationFrame(tick)
    resets.forEach(r => r())
    render()
}
requestAnimationFrame(tick)

auto_fill()