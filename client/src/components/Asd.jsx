import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Missions from './missions/Missions';
import Credits from './credits/Credits';
import './asd.css';

const Asd = () => {
let location = useLocation();
  
const [user] = useState(location.state);
return (
  <div className='back-pic'>
    <Missions
      missions={user}
    />
    <div className='credits-container'>
      <Credits/>
    </div>
  </div>
);
}

export default Asd;