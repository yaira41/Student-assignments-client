import React from "react";
import './mission.css';

function Mission({content}){

    return (
        <div className="mission-block">
            {content.map((raw) => {
               return( <div className="mission-content">
                {raw ? raw : "-" }
            </div>)
            })}
        </div>
    )
}

export default Mission;