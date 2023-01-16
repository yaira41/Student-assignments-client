import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './Card.css';

export default function Card ({title, content}) {
    const [isFinished, setIsFinished] = useState(false);

    useEffect(()=> {
        Object.keys(content).forEach(element => {
            if(typeof(element) === 'string' && element.includes('ציון סופי')){
                setIsFinished(true);
                return;
            }
        })
    },[])

    return(
        <div className="card-container">
            <div className={isFinished ? "card-title finish" : "card-title"}>
                <h3>{isFinished ? `${title} ✔️` : title}</h3>
            </div>
            <div className="card-content">
                {Object.keys(content).map((subject, index) => {
                if(subject.includes("ציון סופי")){
                    return (
                        <div className="final-score"> 
                            <div className="final-score-subject">{subject}</div>
                            <div className="final-score-grade">{content[subject]}</div>
                        </div>
                    )
                }
                return (
                <p className={index%2 === 0 ? "": "aaaa"}>
                    {`${subject}`} <h4>{content[subject]}
                    </h4></p>)})}
            </div>
        </div>
    )
}