const {clipboard, remote} = require('electron')
const {Menu, MenuItem} = remote
const storage = require('electron-json-storage');

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
    'translateFrom': 'en',
    'translateTo': 'ko',
    'newline_sentence': false,
    'fontSize': '30px'
}

console.log(storage.getDataPath())

function loadSettings() {
    storage.get('settings', function(error, data) {
        if (!error) {
            settings.translateFrom = data.translateFrom
            settings.translateTo = data.translateTo
            settings.newline_sentence = data.newline_sentence
            settings.fontSize = data.fontSize
            adjustSettings(settings)
        }
    });
}

function saveSettings(settings) {
    storage.set('settings', settings, function(error) {
        if (error) console.error(error)
    })
}

function adjustSettings(settings) {
    menu.items[0].submenu.items.find(function(elem) { return elem.label == settings.fontSize }).checked = true
    resultDiv.style.fontSize = settings.fontSize
    menu.items[1].checked = settings.newline_sentence
    resultDiv.innerHTML = newLine(resultDiv.innerHTML, settings.newline_sentence)
    saveSettings(settings)
}

loadSettings(settings)

let menu = new Menu()

function updateFontSize(menuItem) {
    settings.fontSize = menuItem.label
    adjustSettings(settings)
}

menu.append(new MenuItem({label: 'FontSize', submenu: [
    new MenuItem({label: '20px', type: 'radio', click: updateFontSize}),
    new MenuItem({label: '30px', type: 'radio', click: updateFontSize}),
    new MenuItem({label: '40px', type: 'radio', click: updateFontSize}),
    new MenuItem({label: '50px', type: 'radio', click: updateFontSize}),
    new MenuItem({label: '60px', type: 'radio', click: updateFontSize}),
    new MenuItem({label: '70px', type: 'radio', click: updateFontSize})
]}))
menu.append(new MenuItem({label: 'NewLine Sentence', type: 'checkbox', click(menuItem) 
{
    settings.newline_sentence = menuItem.checked
    adjustSettings(settings)
}}))

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

function parse(str) {    
    from = str.indexOf("TRANSLATED_TEXT='")
    to = str.indexOf("';var", from)
    sub = str.substring(from, to + 2)
    eval(sub)
    return TRANSLATED_TEXT
}

function newLine(str, active) {
    if (active) {
        return str.replace(/\.\s+/g,'.|')
                    .replace(/\?\s/g,'?|')
                    .replace(/\!\s/g,'!|')
                    .replace(/\|/gi, "<br>")
    }
    else {
        return str.replace(/\<br\>/gi, " ")
    }
}

let latestText = null
function update() {
    var newText = clipboard.readText('selection')
    if (latestText == newText) return

    translate(newText, translateFrom.value, translateTo.value, (r) => {
        resultDiv.innerHTML = newLine(parse(r), settings.newline_sentence)
    })
    latestText = newText
}

setInterval(update, 200)