import React from "react";
import "./Task.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Task() {
  const navigate = useNavigate();
  if (Cookies.get("p_token") === undefined) {
    return navigate("/login");
  }
  return <div>Task</div>;
}

export default Task;
