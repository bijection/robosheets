import {payment, paymentHelpers} from './payment'
// import X from 'xlsx'
import 'lodash'

const el = name => document.createElement(name)

const $ = selector => selector.startsWith('#')
    ? document.querySelector(selector)
    : [].slice.call(document.querySelectorAll(selector))

const first_sheet_name = 'Sheet1'

function addSheet(name){
    let s = sheets()
    let n = s.length+1
    let newsheetname = name || 'Sheet' + n
    if(!name) while(s.indexOf(newsheetname) >=0) newsheetname = 'Sheet' + n++
    console.log('adding', newsheetname)
    s.push(newsheetname)
    sheets(s)
    loadSheet(newsheetname)
    show_sheet[newsheetname]()
}

$('#new-sheet').addEventListener('click', e => addSheet())

let show_sheet = {}

function loadSheet(name){
    console.log(name)
    let a = el('a')
    show_sheet[name] = () => {
        var tabs = $('#tabs').querySelectorAll('a');
        $('#spreadsheet').contentWindow.load(name)
        tabs.forEach(tab => tab.classList.toggle('active', tab === a))
        active_sheet(name)
        focussheet()
    }
    a.addEventListener('click', e => e.target === a && show_sheet[name]())
    a.tabname = name
    a.innerHTML = name
    a.className = 'tab'
    $('#tabs').insertBefore(a, $('#new-sheet'))

    let d = document.createElement('div')
    d.className = 'tab-after'
    d.innerHTML = '\u00D7'
    a.appendChild(d)

    d.addEventListener('click', () => deleteSheet(name))
}

function deleteSheet(name){

    $('#spreadsheet').contentWindow.clear(name)

    delete show_sheet[name]

    $('#tabs').querySelectorAll('a').forEach(tab => {
        if(tab.tabname == name) $('#tabs').removeChild(tab)
    })

    let s = sheets()
        .filter(sheet => sheet != name)

    sheets(s)

    if(!sheets().length) addSheet()

    if(active_sheet() == name) active_sheet(sheets()[sheets().length - 1])
    show_sheet[active_sheet()]()
}

function active_sheet(v){
    if(typeof v !== 'undefined') localStorage.activeSheet = v
    else return 'activeSheet' in localStorage ? localStorage.activeSheet : first_sheet_name
}

function sheets(v){
    if(typeof v !== 'undefined') localStorage.sheets = JSON.stringify(v)
    else return 'sheets' in localStorage ? JSON.parse(localStorage.sheets) : [first_sheet_name]
}

$('#spreadsheet')
.contentWindow
.addEventListener('DOMContentLoaded', () => {
    sheets().forEach(loadSheet)
    show_sheet[active_sheet()]()
    $('#spreadsheet').style.background = '#fff'
})


let focussheet = e => $('#spreadsheet').contentWindow.focus()
window.addEventListener("load", focussheet)
window.CRISP_READY_TRIGGER = function() {
    $crisp.on("chat:closed", focussheet)
};
const show_pricing = () => {
    $('#app').style.filter = 'blur(5px)';
    $('#pricing-modal-wrap').style.display = 'flex';
    $('#spreadsheet')
    .contentWindow
    .pause()
}
$('#pricing').addEventListener('click', show_pricing)
// $('#export').addEventListener('click', show_pricing)


function hidemodals(){
    $('#app').style.filter = '';
    $('#pricing-modal-wrap').style.display = 'none';
    $('#spreadsheet')
    .contentWindow
    .resume()       
}
$('#pricing-modal-plan-free').addEventListener('click', hidemodals)
$('#pricing-x').addEventListener('click', hidemodals)


let signup_inputs = $('.signup-input')
let signup_confirms = $('.signup-confirm')
let signup_questions = $('.signup-question')

signup_questions.forEach(q => q.addEventListener('click', e=> {
    if(e.target.className === 'signup-confirm') return;

    let input = q.querySelector('.signup-input')
    if (input) input.focus()
    else ungray_question(signup_questions.indexOf(q))
}))

signup_inputs.forEach((input, i) => {
    input.addEventListener('keydown', e => {
        console.log('e.keyCode')

        if(e.keyCode == 13) activate_input(i+1)
        else if(e.keyCode == 9){
            e.preventDefault();
            if(!e.shiftKey) activate_input(i+1)
            else activate_input(i-1)
        }
    })
    input.addEventListener('focus', e => {
        ungray_question(i)
    })
})

signup_confirms.forEach((confirm, i) => {
    confirm.addEventListener('click', e => activate_input(i+1))
})

function ungray_question(i){
    signup_questions.forEach(q => q.classList.add('gray'))
    signup_questions[i].classList.remove('gray')

    if( i > 0 && i < signup_questions.length - 1) $('#secure').classList.add('expanded')
    else $('#secure').classList.remove('expanded')
}

function activate_input(i){
    if( i < 0 ||  i > signup_questions.length - 1) return;

    let q = signup_questions[i],
        rect = q.getBoundingClientRect(),
        pm = $('#pricing-modal-wrap')
    
    signup_inputs.forEach(i => i.blur())
    
    let input = q.querySelector('.signup-input')
    if (!input) ungray_question(i)

    scrollTo(pm, pm.scrollTop + rect.top - innerHeight / 2 + rect.height / 2, 300, () => {
        if(input
            && input.getBoundingClientRect().bottom < innerHeight
            && input.getBoundingClientRect().top > 0
            ){
            input.focus()
        }
        else q.focus()
    })

}

function select_plan(el){

    let name = el.querySelector('.plan-name').firstChild.wholeText.trim()
    let price = el.querySelector('.plan-price').firstChild.wholeText.trim()

    ;[].slice.call(document.querySelectorAll('.selected-name')).forEach(b => b.innerHTML = name)
    ;[].slice.call(document.querySelectorAll('.selected-price')).forEach(b => b.innerHTML = price)

    $('#signup').style.display = 'block'

    ;[].slice.call(document.querySelectorAll('.plan')).forEach(el => el.classList.remove('selected'))
    el.classList.add('selected')
    // let selected = el.cloneNode(true)
    // let wrap = $('#selected-plan')
    // if(wrap.firstChild) wrap.removeChild(wrap.firstChild);       
    // wrap.appendChild(selected)

    activate_input(0)
}

let basic = $('.basic')[0],
    advanced = $('.advanced')[0]
// let plans = [].slice.call(document.querySelectorAll('.plan'))
basic.addEventListener('click', e => select_plan(basic))
advanced.addEventListener('click', e => select_plan(advanced))

window.addEventListener('wheel', e => cancelAnimationFrame(current_animation))

let current_animation
function scrollTo(el, scrollTop, time, each){
    let startTop = el.scrollTop,
        v = (scrollTop - startTop ) / time,
        elapsed = 0,
        last_time

    function raf(f) {
        current_animation = requestAnimationFrame(f)
    }

    function tick(t){
        let dt = Math.min(t - last_time, time - elapsed)
        last_time = t
        elapsed += dt

        let now = Math.pow(elapsed / time - 1, 3) + 1

        el.scrollTop = startTop + (scrollTop - startTop) * now

        each()

        if(elapsed < time) raf(tick)
    }

    cancelAnimationFrame(current_animation)

    raf(t => {
        last_time = t
        raf(tick)
    })
}

Stripe.setPublishableKey('pk_test_6Eg7yBirVyhF6YvwDKhiPoPj');
$('#signup-submit').addEventListener('click', e => {
    Stripe.card.createToken($('#signup'), (status, response) => {
        console.log(status, response)
    });
})


function load_as_csv(workbook) {
    var result = [];
    workbook.SheetNames.forEach(sheetName => {
        var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName], {FS: '\t'});
        if(csv.length > 0){
            console.log(csv)
            $('#spreadsheet').contentWindow.insert_csv(csv)
        }
    });
    return result.join("\n");
}

$('#hidden-picker').addEventListener('change', e => {
    let f = e.target.files[0]
    console.log(f)
    var reader = new FileReader();
    reader.onload = function(e) {
        if(f.type === "text/csv"){
            $('#spreadsheet').contentWindow.insert_csv(data)
        } else {
            var data = e.target.result;
            let wb = X.read(data, {type: 'binary'});
            load_as_csv(wb);            
        }
    };
    reader.readAsBinaryString(f);
});


$('#export').addEventListener('click', e => {
    // show_pricing()
    $('#spreadsheet').contentWindow.save_csv()
})


payment.formatCardNumber($('#number'))
payment.formatCardCVC($('#cvc'))
payment.formatCardExpiry($('#date'))


;['number', 'cvc', 'date', 'name'].forEach(field => {
    let def = $('#summary-'+field).innerHTML
    $('#'+field).addEventListener('blur', e => {
        $('#summary-'+field).innerHTML = e.target.value || def
    })
})

function addChangeListener(el, f){
    el.addEventListener('keypress', f)
    el.addEventListener('keydown', f)
    el.addEventListener('change', f)
    el.addEventListener('input', f)  
}

// [kerberos, number, exp, cvc, ringsize].forEach(function(el){
//     addChangeListener(el, function(){
//         wolo.fn.removeClass(el,'error')
//     })
// })

var cardims = {
    amex: "assets/cards/flat/amex.svg",
    diners: "assets/cards/flat/diners.svg",
    discover: "assets/cards/flat/discover.svg",
    jcb: "assets/cards/flat/jcb.svg",
    mastercard: "assets/cards/flat/mastercard.svg",
    visa: "assets/cards/flat/visa.svg"
}


addChangeListener($('#number'), e => {
    var cardim = cardims[paymentHelpers.cardType(number.value)]
    if(cardim){
        $('#card').style.opacity = 1
        $('#card').style['background-image'] = 'url('+cardim+')'
    }
    else {
        $('#card').style.opacity = 0
    }
})