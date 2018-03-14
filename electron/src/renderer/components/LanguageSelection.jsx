import React from "react"
import style from "./LanguageSelection.css"

export default function LanguageSelection(props) {
    return (
        <div id="languageSelection" className={`${props.className} ${style.languageSelection}`} >
            <label for="translateFrom">From</label>
            <select id="translateFrom"></select>
            <label for="translateTo">To</label>
            <select id="translateTo"></select>            
        </div>
    )
}