import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";

console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV == "production" ? "/sudoku" : "/base");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Router basename={process.env.NODE_ENV == "production" ? "/sudoku" : ""}>
            <App />
        </Router>
    </React.StrictMode>
);
