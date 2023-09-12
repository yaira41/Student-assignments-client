import React from "react";
import Seperator from "../seperator/Seperator";
import './personalArea.css';

export default function PersonalData ({personalDetails}) {
    return(
        <div className="personal-container">
            {Object.keys(personalDetails).map((detail, index) =>
                <div key={index} className="data-container">
                    <div className="detail">{detail}: </div> 
                    {personalDetails[detail]} {Object.keys(personalDetails).length - 1 === index  ? "" : <Seperator/>}
                </div>
                )}
        </div>
    )
}