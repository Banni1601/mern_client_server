import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./Context/userContext";
import Header from "./components/Header/Header";
import Footer from ".//components/Footer/Footer";
import Home from "./components/Home/Home";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Login from "./components/Login/Login";
import Task from "./components/Task/Task";
import About from "./components/About/About";
import Support from "./components/Support/Support";

function App() {
  return (
    <UserContext>
      <div>
        <Header />
      </div>
      <div>
        <Routes to="/">
          <Route path="" element={<Home />} />
          <Route path="/task" element={<Task />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>

      <Footer />
    </UserContext>
  );
}

export default App;
