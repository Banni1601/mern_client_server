import React from "react";
import ".//Support.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Support() {
  const navigate = useNavigate();
  if (Cookies.get("p_token") === undefined) {
    return navigate("/login");
  }
  return <div>Support</div>;
}

export default Support;
