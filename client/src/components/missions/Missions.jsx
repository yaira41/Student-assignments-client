import React from 'react';
import { SPECIAL_SUBJECTS } from '../../utils/utils';
import PersonalData from '../personalArea/PersonalArea';
import Card from '../cards/Card';
import './missions.css'

const getSubjectName = (subject) => {
    return subject.split('_')[0];
}

const orderSubjects = (missions) => {
    const newData = {};
    const subTitles = {};
    const grades = {};
    const personalData = {};
    
    const uniqueNames = getUniqueSubjects(Object.keys(missions[missions.length - 1]));

    uniqueNames.forEach(element => {
        if(SPECIAL_SUBJECTS.includes(element)){
            personalData[`${element}`] = missions[missions.length - 1][element]
        } else{
            subTitles[`${element}`] = [];
            fillData(subTitles, element, missions[0]);
            grades[`${element}`] = [];
            fillData(grades, element, missions[missions.length - 1]);
        }
    });
    newData['personalData'] = personalData;
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

    return uniqueNames;
}

const roundNumber = (grade) => {
    return isNaN(grade) ? grade : Math.round(grade);
}

function Missions({missions}) {
    const e = orderSubjects(missions);
    return (
        <div className='details-container'>
            <div className='logo-container'>
                <div className='logo'></div>
                <div className='grades-title'><h2>גליון ציונים אישי</h2></div>
            </div>
            <PersonalData
                content={e['personalData']}
            />
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
                    key={index}
                    title={subject[0]}
                    content={content}
                    />
                    )
                })}
            </div>
        </div>
    )
}

export default Missions;