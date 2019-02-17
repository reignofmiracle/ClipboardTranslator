import { clipboard } from 'electron'
import Rx from 'rxjs'
import unescape from 'lodash/unescape'

let query = 'https://translate.google.com/#view=home&op=translate&sl={0}&tl={1}&text={2}'

class ClipboardTranslator {
    constructor() {
        this.state = {
            translateFrom: "en",
            translateTo: "ko",            
            newline_sentence: false
        }

        this.clipboardTexts = new Rx.Subject()
        this.results = new Rx.Subject()

        Rx.Observable.interval(200).timeInterval().subscribe(v => {
            this.clipboardTexts.next(clipboard.readText('selection'))
        })

        this.clipboardTexts.distinctUntilChanged().subscribe(v => {
            var translate = this.translate.bind(this)
            var update = this.update.bind(this)
            var parse = this.parse.bind(this)
            var formatting = this.formatting.bind(this)

            var from = this.state.translateFrom            
            var to = this.state.translateTo                

            this.translate(v, from, to, update)
        })
    }

    setState(state) {
        this.state = state
    }

    translate(text, from, to, func) {
        var url = query.replace('{0}', from).replace('{1}', to).replace('{2}', encodeURI(text))        
        var xhttp = new XMLHttpRequest()

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                func(xhttp.responseText)
            }
        }
        xhttp.open('GET', url, true)
        xhttp.send()
    }

    update(text) {
        var result = this.formatting(this.parse(text), this.state.newline_sentence)
        this.results.next(result)
    }

    parse(str) { 
        console.log(str)               
        ret = eval(str)
        TRANSLATED_TEXT = ret.message
        return TRANSLATED_TEXT
    }

    formatting(str, active) {
        if (active) {
            return str.replace(/\.\s+/g, '.|')
                .replace(/\?\s/g, '?|')
                .replace(/\!\s/g, '!|')
                .replace(/\|/gi, "<br>")
        }
        else {
            return str.replace(/\<br\>/gi, " ")
        }
    }
}

function createClipboardTranslator() {
    return new ClipboardTranslator()
}

export default createClipboardTranslator