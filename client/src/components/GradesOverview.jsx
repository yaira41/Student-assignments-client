import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Missions from './missions/Missions';
import Credits from './credits/Credits';
import './gradesOverview.css';

const GradesOverview = () => {
let location = useLocation();
  
const [user] = useState(location.state);
return (
  <div className='back-pic'>
    {user ? <Missions
      missions={user}
    />:
    <p>אין פרטים כעת, אנא פנה לאחראי</p>}
    <div className='credits-container'>
      <Credits/>
    </div>
  </div>
);
}

export default GradesOverview;