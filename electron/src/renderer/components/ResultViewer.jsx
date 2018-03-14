import React from "react"
import style from "./ResultViewer.css"

export default function ResultViewer(props) {
    return (
        <div id="resultViewer" className={`${props.className} ${style.resultViewer}`} >
            <span dangerouslySetInnerHTML={{ __html: props.value }} />            
        </div>
    )
}