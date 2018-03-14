import React from "react"
import LanguageSelection from "./LanguageSelection"
import ResultViewer from "./ResultViewer"
import style from "./ClipboardTranslator.css"
import { ipcRenderer } from "electron";

export default class ClipboardTranslator extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            translateFrom: "en",
            translateTo: "ko",
            text: "" 
        }
    }

    componentDidMount() {
        ipcRenderer.on("UPDATE_TEXT", (_e, text) => {
            this.setState({ text });
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        return (
            <div className={style.clipboardTranslator}>
                <LanguageSelection
                    translateFrom={this.state.translateFrom}
                    translateTo={this.state.translateTo} />
                <ResultViewer
                    value={this.state.text} />
            </div>
        )
    }
}