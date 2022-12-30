import React from 'react';
import Mission from './Mission';
import Card from '../cards/Card'; 
import './missions.css'

const getSubjectName = (subject) => {
    // if(subject.includes('מס יח')){
    //     return 'מספר יחידות';
    // }
    return subject.split('_')[0];
}

const orderSubjects = (missions) => {
    const newData = {};
    const subTitles = {};
    const grades = {};
    const uniqueNames = getUniqueSubjects(Object.keys(missions[missions.length - 1]));
    
    uniqueNames.forEach(element => {
        subTitles[`${element}`] = [];
        fillData(subTitles, element, missions[0]);
        grades[`${element}`] = [];
        fillData(grades, element, missions[missions.length - 1]);
    });
    newData['subTitles'] = subTitles;
    newData['grades'] = grades;
    return newData;
}

const fillData = (arrayToFilled, currentKey, dataArray) => {
    Object.keys(dataArray).forEach(element => {
        if(element.startsWith(currentKey)){
            arrayToFilled[currentKey].push(dataArray[element])
        }
    })
}

const getUniqueSubjects = (missions) => {
    const uniqueNames = [];
    missions.forEach(element => {
        const subName = getSubjectName(element);
        if(!uniqueNames.includes(getSubjectName(subName))){
            uniqueNames.push(subName);
        }
    });
    return uniqueNames
}

const roundNumber = (grade) => {
    return isNaN(grade) ? grade : Math.round(grade);
}

const percentageCalculator = (grade, percentage) => {

}

function Missions({missions}) {
    const e = orderSubjects(missions);
    return (
        <div>
            <div className='logo'>
                
            </div>
            <div className="asd">
                {Object.entries(e["grades"]).map((subject, index) => {
                    const content = {};
                    for (let i = 0; i < subject[1].length; i++) {
                        if(e.subTitles[subject[0]][i]){
                            content[e.subTitles[subject[0]][i]] = Array.isArray(subject[1]) ? roundNumber(subject[1][i]) : roundNumber(subject[1]);
                        } else{
                            content[subject[0]] =  Array.isArray(subject[1]) ? roundNumber(subject[1][i]) : roundNumber(subject[1]);
                        }
                    }
                    
                    return(
                    <Card
                    title={subject[0]}
                    content={content}
                    />
                    )
                })}



                {/* {Object.keys(missions[missions.length - 1]).map((mission,index) => {
                    const subjectContent = [];
                    const formattedName = getSubjectName(mission);
                    for (let i = 0; i < missions.length; i++) {
                        const content = missions[i][mission] || '';
                        subjectContent.push(content);
                    }
                    return(
                        <>
                            {formattedName === mission ? 
                            <p className='title'>{formattedName} - </p> : 
                            <></>
                            }
                            <Mission
                                key={index}
                                content={subjectContent}
                            />
                        </>
                    )
                    // return(
                    //     <>
                    //         {formattedName === mission ? 
                    //         <p className='title'>{formattedName} - </p> : 
                    //         <></>
                    //         }
                    //         <Mission
                    //             key={index}
                    //             content={subjectContent}
                    //         />
                    //     </>
                    // )
                }
                )} */}
            </div>
        </div>
    )
}

export default Missions;