const {
    app,
    clipboard,
    BrowserWindow
} = require('electron')

const {
    interval,
    Subject
} = require('rxjs')

const {
    distinctUntilChanged
} = require('rxjs/operators')

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,        
        webPreferences: {
            nodeIntegration: true,
        }
    })

    win.setAlwaysOnTop(true, "floating")
    
    win.webContents.once("dom-ready", () => {  
        win.webContents.executeJavaScript(`
            const { ipcRenderer } = require('electron')
            ipcRenderer.on('source', (event, arg) => {                  
                var source = document.getElementById('source')          
                source.value = arg
            })
        `)        
    })

    win.loadURL('https://translate.google.com')
    
    getClipboardObservable().subscribe(v => {        
        win.webContents.send('source', v)        
    })
}

function getClipboardObservable() {
    var subject = new Subject()
    interval(200).subscribe(v => {
        subject.next(clipboard.readText('selection'))
    })
    return subject.pipe(distinctUntilChanged())
}

app.on('ready', createWindow)