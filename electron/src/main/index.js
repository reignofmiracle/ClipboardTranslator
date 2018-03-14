import { app, console } from "electron"
import createMainWindow from "./createMainWindow"
import createSettingManager from "./createSettingManager"
import createClipboardTranslator from "./createClipboardTranslator"

let mainWindow
let settingManager
let clipboardTranslator

app.on("ready", () => {
    mainWindow = createMainWindow()
    settingManager = createSettingManager()
    clipboardTranslator = createClipboardTranslator()    
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", (_e, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        mainWindow = createMainWindow()
        settingManager = createSettingManager()
        clipboardTranslator = createClipboardTranslator() 
    }
})