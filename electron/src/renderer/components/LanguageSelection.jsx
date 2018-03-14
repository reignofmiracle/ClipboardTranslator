import React from "react"
import style from "./LanguageSelection.css"

export default function ResultViewer(props) {
    return (
        <div id="languageSelection" className={`${props.className} ${style.languageSelection}`} >
            <label for="translateFrom">From</label>
            <select id="translateFrom" value={props.translateFrom}>
                <option value="volvo">Volvo</option>
            </select>
            <label for="translateTo">To</label>
            <select id="translateTo" value={props.translateTo}>
                <option value="volvo">Volvo</option>
            </select>
        </div>
    )
}