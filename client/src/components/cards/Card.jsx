import React from "react";
import { useState } from "react";
import './Card.css';


export default function Card ({title, content}) {
    const [isActive, setIsActive] = useState(false);

    const click = () => {
        setIsActive(!isActive);
    }

    return(
        <div className="card-container">
            <div className="card-title" onClick={click}>
                <h3>{title}</h3>
            </div>
            {/* <div className={isActive ? "show" : "" + "card-content"}> */}
            <div className="card-content">
                {Object.keys(content).map((a, index) => <p className={index%2 === 0 ? "aaaa": ""}>{a}: <h4>{content[a]}</h4></p>)}
            </div>
        </div>
    )
}