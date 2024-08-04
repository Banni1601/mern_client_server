import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function About() {
  const navigate = useNavigate();
  if (Cookies.get("p_token") === undefined) {
    return navigate("/login");
  }
  return <div>About</div>;
}

export default About;
