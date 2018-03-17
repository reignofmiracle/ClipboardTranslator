import React from "react"
import style from "./ClipboardTranslator.css"
import createClipboardTranslator from "./createClipboardTranslator"
import createStateManager from "./createStateManager"
import createContextMenu from "./createContextMenu"
import { remote } from 'electron'
import languageList from "./languageList"

export default class ClipboardTranslator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            translateFrom: "en",
            translateTo: "ko",
            newline_sentence: false,
            fontSize: '30px'
        }

        this.stateManager = createStateManager()
        this.stateManager.getState(state => {
            this.setState(state)

            this.clipboardTranslator = createClipboardTranslator()
            this.clipboardTranslator.setState(state)
            this.clipboardTranslator.results.subscribe(v => this.setState({ text: v }))

            this.menu = createContextMenu(
                state,
                v => this.setState(v, this.updateState.bind(this)))

            window.addEventListener('contextmenu', (e) => {
                e.preventDefault()
                this.menu.popup(remote.getCurrentWindow())
            }, false)
        })
    }

    onSelectedLanguageChange(e) {
        var state = {}
        if (e.target.id == "translateFrom") state.translateFrom = e.target.value
        if (e.target.id == "translateTo") state.translateTo = e.target.value
        if (state) {
            this.setState(state, this.updateState.bind(this))
        }
    }

    updateState() {
        this.clipboardTranslator.setState(this.state)
        this.stateManager.setState(this.state)
    }

    render() {
        let options = languageList.map(v => {
            return <option value={v[1]}>{v[0]}</option>
        })

        return (
            <div className={style.clipboardTranslator}>
                <div className={style.languageSelection}>
                    <label>From</label>
                    <select id="translateFrom" onChange={this.onSelectedLanguageChange.bind(this)} value={this.state.translateFrom}>
                        {options}
                    </select>
                    <label>To</label>
                    <select id="translateTo" onChange={this.onSelectedLanguageChange.bind(this)} value={this.state.translateTo}>
                        {options}
                    </select>
                </div>
                <div id="resultViewer" className={style.resultViewer} >
                    <span style={{ fontSize: this.state.fontSize }}
                        dangerouslySetInnerHTML={{ __html: this.state.text }} />
                </div>
            </div>
        )
    }
}