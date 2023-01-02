import React from "react";
import './personalArea.css';

export default function PersonalData ({content}) {
    return(
        <div className="personal-container">
            {Object.keys(content).map((a, index) =>
                <div className="data-container">
                    <h4>{a} :</h4> 
                    {content[a]} {Object.keys(content).length - 1 === index ? "" : "|"}
                </div>
                )}
        </div>
    )
}