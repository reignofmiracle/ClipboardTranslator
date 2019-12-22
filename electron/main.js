const {
    app,
    BrowserWindow,    
    clipboard,
    Menu    
} = require('electron')

const {
    interval,
    Subject
} = require('rxjs')

const {
    distinctUntilChanged
} = require('rxjs/operators')

var isWatch = true

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,                
        webPreferences: {
            nodeIntegration: true,
        }
    })    
    
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

    let menu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            submenu:[
                {
                    label: 'Watch',
                    type: 'checkbox',
                    checked: true,
                    click: function(item) {
                        isWatch = item.checked
                    },
                },
                {
                    label: 'Float',
                    type: 'checkbox',
                    checked: false,
                    click: function(item) {
                        if (item.checked) {
                            win.setAlwaysOnTop(true, "floating")
                        } else {
                            win.setAlwaysOnTop(false)
                        }
                    },
                }
            ]
        }        
    ])    

    Menu.setApplicationMenu(menu)
}

function getClipboardObservable() {
    var subject = new Subject()
    interval(200).subscribe(v => {
        if (isWatch) {
            subject.next(clipboard.readText())    
        }
    })
    return subject.pipe(distinctUntilChanged())
}

app.on('ready', createWindow)