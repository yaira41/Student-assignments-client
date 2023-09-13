import React from "react";
import {Routes, Route} from 'react-router-dom';
import App from "./App.js";
import GradesOverview from "./components/GradesOverview.jsx";
import ManagerRoom from './components/managerRoom/ManagerRoom.jsx';

function AppRouter() {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<App/>}/>
                <Route path="gradesOverView" element={<GradesOverview/>}/>
                <Route path="managerRoom" element={<ManagerRoom/>}/>
            </Routes>
        </div>
    );
}

export default AppRouter;