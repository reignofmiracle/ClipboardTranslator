import React from "react"
import style from "./ClipboardTranslator.css"
import createClipboardTranslator from "./createClipboardTranslator"

export default class ClipboardTranslator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }

        this.clipboardTranslator = createClipboardTranslator()
        this.clipboardTranslator.results.subscribe(v => this.setState({ text: v }))
    }

    render() {
        return (
            <div className={style.clipboardTranslator}>
                <div id="resultViewer" className={style.resultViewer} >
                    <span dangerouslySetInnerHTML={{ __html: this.state.text }} />
                </div>
            </div>
        )
    }
}