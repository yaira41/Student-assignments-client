import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Missions from './missions/Missions';

const Asd = () => {
let location = useLocation();
  
const [user] = useState(location.state);
return (
  <div>
    <Missions
      missions={user}
    />
  </div>
);
}

export default Asd;