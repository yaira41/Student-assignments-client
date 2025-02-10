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
              clipPath:
                userType === "תלמידה"
                  ? "polygon(15% 0, 100% 0, 100% 100%, 15%  100%, 0% 50%)"
                  : "polygon(0 0, 100% 0, 100% 100%, 0 100%, 15% 50%)",
            }}
          >
            תלמידה
          </button>
          <button
            className={`tab-teacher ${userType === "מורה" ? "active" : ""}`}
            onClick={() => handleTabChange("מורה")}
            style={{
              marginRight: "-8px",
              clipPath:
                userType === "מורה"
                  ? "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0% 100%)"
                  : "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)",
            }}
          >
            מורה
          </button>
        </div>
        <div className="login-title">
          <h1>התחברות</h1>
          <h3
            className={`${userType === "מורה" ? "blue-color" : "green-color"}`}
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
