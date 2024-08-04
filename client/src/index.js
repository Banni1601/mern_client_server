import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./components/Home/Home";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Login from "./components/Login/Login";
import reportWebVitals from "./reportWebVitals";
import Task from "./components/Task/Task";
import About from "./components/About/About";
import Support from "./components/Support/Support";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<Login />} />
      <Route path="task" element={<Task />} />
      <Route path="about" element={<About />} />
      <Route path="support" element={<Support />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
