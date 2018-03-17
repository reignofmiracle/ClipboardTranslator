import { clipboard } from 'electron'
import Rx from 'rxjs'

let query = 'http://www.google.com/translate_t?hl={0}&ie=UTF8&text={1}&langpair={2}'

class ClipboardTranslator {
    constructor() {
        this.translateFrom = "en"
        this.translateTo = "ko"

        this.clipboardTexts = new Rx.Subject()
        this.results = new Rx.Subject()

        Rx.Observable.interval(200).timeInterval().subscribe(v => {
            this.clipboardTexts.next(clipboard.readText('selection'))
        })

        this.clipboardTexts.distinctUntilChanged().subscribe(v => {
            this.translate(v, this)
        })
    }

    translate(text, props) {
        var from = props.translateFrom
        var to = props.translateTo
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
        this.results.next(this.parse(text))
    }

    parse(str) {
        var from = str.indexOf("TRANSLATED_TEXT='")
        var to = str.indexOf("';var", from)
        var sub = str.substring(from, to + 2)
        var TRANSLATED_TEXT = ""
        eval(sub)
        return TRANSLATED_TEXT
    }
}

function createClipboardTranslator() {
    return new ClipboardTranslator()
}

export default createClipboardTranslator