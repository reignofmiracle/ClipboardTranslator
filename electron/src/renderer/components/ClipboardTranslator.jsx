import React from "react"
import style from "./ClipboardTranslator.css"
import createClipboardTranslator from "./createClipboardTranslator"
import createSettingManager from "./createSettingManager"
import languageList from "./languageList"

export default class ClipboardTranslator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            translateFrom: "en",
            translateTo: "ko",
            newline_sentence: false,
            fontSize: '50px'
        }

        this.settingManager = createSettingManager()
        this.settingManager.loadSettings(v => this.setState(v))

        this.clipboardTranslator = createClipboardTranslator()
        this.clipboardTranslator.results.subscribe(v => this.setState({ text: v }))
    }

    onSelectedLanguageChange(e) {
        if (e.target.id == "translateFrom") {
            this.setState(
                { translateFrom: e.target.value },
                this.updateState.bind(this)
            )
        }
        if (e.target.id == "translateTo") {
            this.setState(
                { translateTo: e.target.value },
                this.updateState.bind(this)
            )
        }
    }

    updateState() {
        this.clipboardTranslator.translateFrom = this.state.translateFrom
        this.clipboardTranslator.translateTo = this.state.translateTo
        this.settingManager.saveSettings(this.state)
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
                    <span dangerouslySetInnerHTML={{ __html: this.state.text }} fontSize={this.state.fontSize}/>
                </div>
            </div>
        )
    }
}