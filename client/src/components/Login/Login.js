import React, { useContext, useState } from "react";
import "./Login.css";
import { Data } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
//import createBrowserHistory from "history";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Toast from "react-bootstrap/Toast";
//import ToastContainer from "react-bootstrap/ToastContainer";

function Login() {
  const { state, setState } = useContext(Data);
  const [showA, setShowA] = useState(false);

  const navigate = useNavigate();
  //const history = useHistory();

  const navigateToRegisterPage = () => {
    navigate("/register");
  };
  const changeViewOfPasswordField = () => {
    setState((i) => ({ ...i, viewPassword: !state.viewPassword }));
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();

    const formData = {
      email: state.emailId,
      password: state.password
    };

    await axios
      .post("http://localhost:8000/api/login", formData)
      .then((response) => {
        if (response.status === 200) {
          const p_token = response.data.token;
          Cookies.set("p_token", p_token, { expires: 30 });
          setState((i) => ({
            ...i,
            viewPassword: true,
            loginMessage: "Login Successful and wait for 2 secs",
            loginStatus: true
          }));
          setShowA(!showA);
          setTimeout(() => {
            setState((i) => ({
              ...i,
              userName: "",
              password: "1234567890",
              loginStatus: false,
              isUserLogin: !state.isUserLogin
            }));
            navigate("/", { replace: true });
          }, 500);
        } else if (
          response.status === 201 ||
          response.status === 203 ||
          response.status === 202
        ) {
          setState((i) => ({
            ...i,
            loginMessage: "invalid username or password",
            loginStatus: true
          }));
          alert("Invalid Username or Password and Please Try Again");
        }
      })

      .catch((error) => {
        if (error.response.status === 204) {
          setState((i) => ({
            ...i,
            loginMessage: "Network problem please wait and try again",
            loginStatus: true
          }));
        }
      });
  };

  const changeEmailID = (e) => {
    setState((i) => ({ ...i, emailId: e.target.value }));
    //console.log(state.userName);
  };
  const changePassword = (e) => {
    setState((i) => ({ ...i, password: e.target.value }));
    //console.log(state.password);
  };

  return (
    <div className="Login-page">
      <div className="Login-card">
        <h1 className="Login-heading">Bunny</h1>
        <form className="LoginForm" onSubmit={onSubmitForm}>
          <label htmlFor="input1" className="Login-label-name">
            EMAIL
          </label>
          <input
            type="email"
            id="input1"
            placeholder="Enter a Email"
            className="Login-input"
            onChange={changeEmailID}
            value={state.emailId}
          />

          <label htmlFor="input3" className="Login-label-name">
            PASSWORD
          </label>
          <input
            className="Login-input "
            type={state.viewPassword ? "password" : "text"}
            id="input3"
            placeholder="Enter a Password"
            onChange={changePassword}
            value={state.password}
          />

          <div className="Login-checkbox-div">
            <input
              className="Login-checkbox"
              type="checkbox"
              id="input4"
              onClick={changeViewOfPasswordField}
            />
            <label htmlFor="input4" className="Login-label-name">
              Show Password
            </label>
          </div>
          {state.loginStatus && (
            <p className="Login-successful">{state.loginMessage}</p>
          )}
          <button type="submit" className="Login-button">
            Login
          </button>
        </form>
        <button className="Register-button" onClick={navigateToRegisterPage}>
          User Register
        </button>
      </div>
    </div>
  );
}

export default Login;
