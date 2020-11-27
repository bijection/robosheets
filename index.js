import X from 'xlsx'
import 'lodash'

console.log(X)

const el = name => document.createElement(name)

const $ = selector =>
    selector.startsWith('#')
        ? document.querySelector(selector)
        : [].slice.call(document.querySelectorAll(selector))

const first_sheet_name = 'Sheet1'

let max_sheets = Infinity

function addSheet(name) {
    let s = sheets()

    if (s.length === max_sheets) return show_pricing('Get up to <b>8</b> sheets at time!')

    let n = s.length + 1
    let newsheetname = name || 'Sheet' + n
    if (!name) while (s.indexOf(newsheetname) >= 0) newsheetname = 'Sheet' + n++
    console.log('adding', newsheetname)
    s.push(newsheetname)
    sheets(s)
    loadSheet(newsheetname)
    show_sheet[newsheetname]()
}

$('#new-sheet').addEventListener('click', e => addSheet())

let show_sheet = {}

function loadSheet(name) {
    console.log(name)
    let a = el('a')
    show_sheet[name] = () => {
        var tabs = $('#tabs').querySelectorAll('a')
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

function deleteSheet(name) {
    $('#spreadsheet').contentWindow.clear(name)

    delete show_sheet[name]

    $('#tabs')
        .querySelectorAll('a')
        .forEach(tab => {
            if (tab.tabname == name) $('#tabs').removeChild(tab)
        })

    let s = sheets().filter(sheet => sheet != name)

    sheets(s)

    if (!sheets().length) addSheet()

    if (active_sheet() == name) active_sheet(sheets()[sheets().length - 1])
    show_sheet[active_sheet()]()
}

function active_sheet(v) {
    if (typeof v !== 'undefined') localStorage.activeSheet = v
    else return 'activeSheet' in localStorage ? localStorage.activeSheet : first_sheet_name
}

function sheets(v) {
    if (typeof v !== 'undefined') localStorage.sheets = JSON.stringify(v)
    else return 'sheets' in localStorage ? JSON.parse(localStorage.sheets) : [first_sheet_name]
}

$('#spreadsheet').contentWindow.addEventListener('DOMContentLoaded', () => {
    sheets().forEach(loadSheet)
    show_sheet[active_sheet()]()
    $('#spreadsheet').style.background = '#fff'
})

let focussheet = e => $('#spreadsheet').contentWindow.focus()
window.addEventListener('load', focussheet)

$('#instructions').onclick = () => {
    $('#instructions-modal-wrap').classList.toggle('open')
}

window.closeInstructions = () => {
    localStorage.instructionsShown = true
    $('#instructions-modal-wrap').classList.remove('open')
}

if (!localStorage.instructionsShown) {
    $('#instructions-modal-wrap').classList.add('open')
}

function load_as_csv(workbook) {
    var result = []
    workbook.SheetNames.forEach(sheetName => {
        var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName], { FS: '\t' })
        if (csv.length > 0) {
            $('#spreadsheet').contentWindow.insert_csv(csv)
        }
    })
    return result.join('\n')
}

$('#hidden-picker').addEventListener('change', e => {
    let f = e.target.files[0]
    console.log(f)
    var reader = new FileReader()
    reader.onload = function (e) {
        var data = e.target.result
        console.log({ data })
        if (f.type === 'text/csv') {
            var wb = X.read(data, { type: 'string' })
            // $('#spreadsheet').contentWindow.insert_csv(data)
        } else {
            var wb = X.read(data, { type: 'binary' })
        }
        load_as_csv(wb)
    }
    reader.readAsBinaryString(f)
})

$('#export').addEventListener('click', e => {
    $('#spreadsheet').contentWindow.save_csv()
})
