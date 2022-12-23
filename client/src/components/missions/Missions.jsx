import React from 'react';
import Mission from './Mission';
import './missions.css'

const getSubjectName = (subject) => {
    if(subject.includes('מס יח')){
        return 'מספר יחידות';
    }
    return subject.split('_')[0];
}

function Missions({missions}) {
    return (
        <div className="post-list-container">
            {Object.keys(missions[missions.length - 1]).map((mission,index) => {
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
                </>)
            }
            )}
        </div>
    )
}

export default Missions;