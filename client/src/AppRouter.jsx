import React from "react";
import {Routes, Route} from 'react-router-dom';
import App from "./App.js";
import Assignments from "./components/Assignments.jsx";
import Asd from "./components/Asd.jsx";
import ManagerRoom from './components/managerRoom/ManagerRoom.jsx';
// import CreateNewPost from "./pages/PostEditorPage";
// import PostPage from "./pages/PostPage"; 

function AppRouter() {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<App/>}/>
                <Route path="assignments" element={<Assignments/>}/>
                <Route path="a2" element={<Asd/>}/>
                <Route path="managerRoom" element={<ManagerRoom/>}/>
            </Routes>
        </div>
    );
}

export default AppRouter;