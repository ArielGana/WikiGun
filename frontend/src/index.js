import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Asegúrate de que este es el nombre y la ubicación correcta de tu archivo principal
import "./styles/index.css";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Asegúrate de que este ID coincida con el de tu archivo HTML
);
