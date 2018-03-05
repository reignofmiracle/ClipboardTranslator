const {clipboard, remote} = require('electron')
const {Menu, MenuItem} = remote

languageList = [
    ["Afrikaans","af"],
    ["Albanian","sq"],
    ["Amharic","am"],
    ["Arabic","ar"],
    ["Armenian","hy"],
    ["Azeerbaijani","az"],
    ["Basque","eu"],
    ["Belarusian","be"],
    ["Bengali","bn"],
    ["Bosnian","bs"],
    ["Bulgarian","bg"],
    ["Catalan","ca"],
    ["Cebuano","ceb"],
    ["Chinese (Simplified)","zh-CN"],
    ["Chinese (Traditional)","zh-TW"],
    ["Corsican","co"],
    ["Croatian","hr"],
    ["Czech","cs"],
    ["Danish","da"],
    ["Dutch","nl"],
    ["English","en"],
    ["Esperanto","eo"],
    ["Estonian","et"],
    ["Finnish","fi"],
    ["French","fr"],
    ["Frisian","fy"],
    ["Galician","gl"],
    ["Georgian","ka"],
    ["German","de"],
    ["Greek","el"],
    ["Gujarati","gu"],
    ["Haitian Creole","ht"],
    ["Hausa","ha"],
    ["Hawaiian","haw"],
    ["Hebrew","iw"],
    ["Hindi","hi"],
    ["Hmong","hmn (ISO-639-2)"],
    ["Hungarian","hu"],
    ["Icelandic","is"],
    ["Igbo","ig"],
    ["Indonesian","id"],
    ["Irish","ga"],
    ["Italian","it"],
    ["Japanese","ja"],
    ["Javanese","jw"],
    ["Kannada","kn"],
    ["Kazakh","kk"],
    ["Khmer","km"],
    ["Korean","ko"],
    ["Kurdish","ku"],
    ["Kyrgyz","ky"],
    ["Lao","lo"],
    ["Latin","la"],
    ["Latvian","lv"],
    ["Lithuanian","lt"],
    ["Luxembourgish","lb"],
    ["Macedonian","mk"],
    ["Malagasy","mg"],
    ["Malay","ms"],
    ["Malayalam","ml"],
    ["Maltese","mt"],
    ["Maori","mi"],
    ["Marathi","mr"],
    ["Mongolian","mn"],
    ["Myanmar (Burmese)","my"],
    ["Nepali","ne"],
    ["Norwegian","no"],
    ["Nyanja (Chichewa)","ny"],
    ["Pashto","ps"],
    ["Persian","fa"],
    ["Polish","pl"],
    ["Portuguese (Portugal , Brazil)","pt"],
    ["Punjabi","pa"],
    ["Romanian","ro"],
    ["Russian","ru"],
    ["Samoan","sm"],
    ["Scots Gaelic","gd"],
    ["Serbian","sr"],
    ["Sesotho","st"],
    ["Shona","sn"],
    ["Sindhi","sd"],
    ["Sinhala (Sinhalese)","si"],
    ["Slovak","sk"],
    ["Slovenian","sl"],
    ["Somali","so"],
    ["Spanish","es"],
    ["Sundanese","su"],
    ["Swahili","sw"],
    ["Swedish","sv"],
    ["Tagalog (Filipino)","tl"],
    ["Tajik","tg"],
    ["Tamil","ta"],
    ["Telugu","te"],
    ["Thai","th"],
    ["Turkish","tr"],
    ["Ukrainian","uk"],
    ["Urdu","ur"],
    ["Uzbek","uz"],
    ["Vietnamese","vi"],
    ["Welsh","cy"],
    ["Xhosa","xh"],
    ["Yiddish","yi"],
    ["Yoruba","yo"],
    ["Zulu","zu"]]

languageList.forEach((element, index, array) => {
    option = document.createElement("option")
    option.label = element[0]
    option.value = element[1]
    translateFrom.add(option)
})
translateFrom.selectedIndex = languageList.findIndex(elem => elem[1] == 'en')

languageList.forEach((element, index, array) => {
    option = document.createElement("option")
    option.label = element[0]
    option.value = element[1]
    translateTo.add(option)
})
translateTo.selectedIndex = languageList.findIndex(elem => elem[1] == 'ko')

let settings = {
    "newline_sentence" : false,
    "fontSize" : '50px'
}

function adjustSettings(settings) {
    resultTextArea.style.fontSize = settings.fontSize
}

adjustSettings(settings)

const menu = new Menu()
menu.append(new MenuItem({label: 'FontSize', submenu: [
    new MenuItem({label: '10px', type: 'checkbox', click(menuItem, browserWindow) { }}),
    new MenuItem({label: '15px', type: 'checkbox', click(menuItem, browserWindow) { }}),
    new MenuItem({label: '20px', type: 'checkbox', click(menuItem, browserWindow) { }}),
    new MenuItem({label: '25px', type: 'checkbox', click(menuItem, browserWindow) { }}),
    new MenuItem({label: '30px', type: 'checkbox', click(menuItem, browserWindow) { }})
]}))
menu.append(new MenuItem({label: 'NewLine Sentence', type: 'checkbox', click(menuItem) { settings.newline_sentence = menuItem.checked }}))

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false)

let query = 'http://www.google.com/translate_t?hl={0}&ie=UTF8&text={1}&langpair={2}'
function translate(text, from, to, func) {
    url = query.replace('{0}', from).replace('{1}', encodeURI(text)).replace('{2}', from + "|" + to)
    console.log(url)

    xhttp=new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            func(xhttp.responseText)        
        }
    }
    xhttp.open('GET', url, true)
    xhttp.send()    
}

function parse(r) {    
    from = r.indexOf("TRANSLATED_TEXT='")
    to = r.indexOf("';var", from)
    sub = r.substring(from, to + 2)
    eval(sub)
    return TRANSLATED_TEXT
}

let latestText = null
function update() {
    var newText = clipboard.readText('selection')
    if (latestText == newText) return

    translate(newText, translateFrom.value, translateTo.value, (r) => {resultTextArea.innerHTML = parse(r)})
    latestText = newText
}

setInterval(update, 200)