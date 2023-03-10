import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://167.99.233.23/api";
// axios.defaults.baseURL = "http://document_manager.appp/api";
// const user = JSON.parse(localStorage.getItem("user"));

// if (user)
//   axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
//     localStorage.getItem("token")
//   )}`;

// console.log(localStorage.getItem("user"));
console.log();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
