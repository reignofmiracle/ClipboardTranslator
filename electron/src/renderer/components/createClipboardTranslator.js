import { clipboard } from 'electron'
import Rx from 'rxjs'

let query = 'http://www.google.com/translate_t?hl={0}&ie=UTF8&text={1}&langpair={2}'

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
            this.translate(v, this)
        })
    }

    setState(state) {
        this.state = state
    }

    translate(text, props) {
        var from = props.state.translateFrom
        var to = props.state.translateTo
        var url = query.replace('{0}', from).replace('{1}', encodeURI(text)).replace('{2}', from + "|" + to)
        var xhttp = new XMLHttpRequest()

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                props.update(xhttp.responseText)
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
        var from = str.indexOf("TRANSLATED_TEXT='")
        var to = str.indexOf("';var", from)
        var sub = str.substring(from, to + 2)
        var TRANSLATED_TEXT = ""
        eval(sub)
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