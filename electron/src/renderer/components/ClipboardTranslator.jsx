import React from "react"
import LanguageSelection from "./LanguageSelection"
import ResultViewer from "./ResultViewer"
import style from "./ClipboardTranslator.css"

export default class ClipboardTranslator extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={style.clipboardTranslator}>
                <LanguageSelection />
                <ResultViewer />
            </div>
        )
    }
}