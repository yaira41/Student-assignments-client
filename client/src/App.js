import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="login-container">
        <div className="login-title">
          <h1>התחברות</h1>
          <h3>ברוכה הבאה!</h3>
        </div>
        <Login />
      </div>
    </div>
  );
}

export default App;
