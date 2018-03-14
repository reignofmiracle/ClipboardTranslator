import { app, Menu, BrowserWindow } from "electron"

function setAppMenu(options) {
    const template = [
        {
            label: "From"            
        },
        {
            label: "To"
        },
        {
            label: "FontSize"
        },
        {
            label: "Settings"
        }
    ]

    if (process.platform === "darwin") {
        template.unshift(
            {
                label: "MarkdownNote",
                submenu: [
                    { label: "Quit", accelerator: "CmdOrCtrl+Q", click: () => app.quit() }
                ]
            }
        )
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

export default setAppMenu