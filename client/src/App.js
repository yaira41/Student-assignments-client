import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
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

export default App;
