const {clipboard} = require('electron')

class ClipboardTranslator {
    constructor() {
        this.latestText = ""
        setInterval(this.observe, 200)
    }

    observe() {
        var newText = clipboard.readText('selection')
        if (this.latestText == newText) return
        this.latestText = newText

        console.log(newText)
    }
}

function createClipboardTranslator() {
    return new ClipboardTranslator()
}

export default createClipboardTranslator