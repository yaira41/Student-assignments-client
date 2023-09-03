import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div id="app" className="App">
      <div className="login-container">
        <div className="login-title">
          <h2>התחברות</h2>
          <h4>ברוכה הבאה!</h4>
        </div>
        <Login />
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
