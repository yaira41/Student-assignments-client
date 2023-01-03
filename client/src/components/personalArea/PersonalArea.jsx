import React from "react";
import Seperator from "../seperator/Seperator";
import './personalArea.css';

export default function PersonalData ({content}) {
    return(
        <div className="personal-container">
            {Object.keys(content).map((a, index) =>
                <div className="data-container">
                    <div className="detail">{a} :</div> 
                    {content[a]} {Object.keys(content).length - 1 === index  ? "" : <Seperator/>}
                </div>
                )}
        </div>
    )
}