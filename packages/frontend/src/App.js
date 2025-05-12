import React, { useState } from "react";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [userType, setUserType] = useState("תלמידה"); // ערך ברירת מחדל

  const handleTabChange = (type) => {
    setUserType(type);
  };

  return (
    <div id="app" className="App">
      <div className="login-container">
        <div className="tabs">
          <button
            className={`tab-student ${userType === "תלמידה" ? "active" : ""}`}
            onClick={() => handleTabChange("תלמידה")}
            style={{
              marginLeft: "-8px",
            }}
          >
            תלמידה
          </button>
          <button
            className={`tab-teacher ${userType === "מורה" ? "active" : ""}`}
            onClick={() => handleTabChange("מורה")}
            style={{
              marginRight: "-8px",
            }}
          >
            מורה
          </button>
        </div>
        <div className="login-title">
          <h1>התחברות</h1>
          <h3
            className={`${userType === "מורה" ? "blue-color" : "pink-color"}`}
          >
            ברוכה הבאה!
          </h3>
        </div>
        <Login userType={userType} />
      </div>
    </div>
  );
}

const changeBy = () => {
  const options = ["one", "two", "three", "four", "five"];
  const appDiv = document.querySelector("#app");
  const random = options[Math.floor(Math.random() * options.length)];

  if (appDiv) appDiv.className = random;
};

setInterval(changeBy, 4000);

export default App;
