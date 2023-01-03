import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);

const changeBy = () => {
  const options = ["one", "two", "three", "four", "five"];
  const body = document.querySelector("#root");
  const random = options[Math.floor(Math.random() * options.length)];

  body.className = random;
};

setInterval(changeBy, 4000);
