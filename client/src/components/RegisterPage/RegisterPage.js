import React, { useContext } from "react";
import "./RegisterPage.css";
import { Data } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function RegisterPage() {
  const { state, setState } = useContext(Data);
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate("/login");
  };
  const changeViewOfPasswordField = () => {
    setState((i) => ({ ...i, viewPassword: !state.viewPassword }));
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();

    let nameCheck = state.userName.length >= 3 ? false : true;
    let mailCheck = state.emailId.length >= 11 ? false : true;
    let passwordCheck = state.password.length >= 8 ? false : true;
    setState((i) => ({ ...i, userNameError: nameCheck }));
    setState((i) => ({ ...i, mailIdError: mailCheck }));
    setState((i) => ({ ...i, passwordError: passwordCheck }));

    if (
      state.userName.length >= 3 &&
      state.emailId.length >= 10 &&
      state.password.length >= 8
    ) {
      const formData = {
        name: state.userName,
        email: state.emailId,
        password: state.password
      };

      await axios
        .post("http://localhost:8000/api/signup", formData)
        .then((response) => {
          if (response.status === 201) {
            setState((i) => ({
              ...i,
              registerMessage: "Give All Details",
              registerStatus: true
            }));
          } else if (response.status === 200) {
            console.log(response.status);
            const p_token = response.data.token;
            Cookies.set("p_token", p_token, { expires: 30 });
            setState((i) => ({
              ...i,
              viewPassword: true,
              registerMessage: "Register Successful and wait for 2 secs",
              registerStatus: true
            }));
            setTimeout(() => {
              setState((i) => ({
                ...i,
                userName: "",
                emailId: "",
                password: "",
                registerStatus: false,
                isUserLogin: true
              }));
              navigate("/");
            }, 1000);
          }
        })
        .catch((error) => {
          if (error.response.status === 203) {
            setState((i) => ({
              ...i,
              registerMessage: "Network problem please wait and try again",
              registerStatus: true
            }));
          }
          console.error("Error:", error);
        });
    } else {
      setState((i) => ({
        ...i,
        registerMessage: "Give proper details as per above mention",
        registerStatus: true
      }));
    }

    //console.log(passwordCheck);
  };
  const changeUserName = (e) => {
    setState((i) => ({ ...i, userName: e.target.value }));
    //console.log(state.userName);
  };
  const changeMailId = (e) => {
    setState((i) => ({ ...i, emailId: e.target.value }));
    //console.log(state.emailId);
  };
  const changePassword = (e) => {
    setState((i) => ({ ...i, password: e.target.value }));
    //console.log(state.password);
  };

  return (
    <div className="Register-page">
      <div className="Register-card">
        <h1 className="Register-heading">Bunny</h1>
        <form className="RegisterForm" onSubmit={onSubmitForm}>
          <label htmlFor="input1" className="label-name">
            USERNAME
          </label>
          <input
            type="name"
            id="input1"
            placeholder="Enter a Name"
            className="Register-input"
            onChange={changeUserName}
          />
          {state.userNameError && (
            <p className="error-message">Name must contain 3 letters</p>
          )}

          <label htmlFor="input2" className="label-name">
            EMAIL
          </label>
          <input
            className="Register-input"
            type="mailaddress"
            id="input2"
            placeholder="Enter a Email Address"
            onChange={changeMailId}
          />
          {state.mailIdError && (
            <p className="error-message">mailId must contain 10 letters</p>
          )}

          <label htmlFor="input3" className="label-name">
            PASSWORD
          </label>
          <input
            className="Register-input "
            type={state.viewPassword ? "password" : "text"}
            id="input3"
            placeholder="Enter a Password"
            onChange={changePassword}
          />
          {state.passwordError && (
            <p className="error-message">password must contain 8 letters</p>
          )}

          <div className="Register-checkbox-div">
            <input
              className="Register-checkbox"
              type="checkbox"
              id="input4"
              onClick={changeViewOfPasswordField}
            />
            <label htmlFor="input4" className="label-name">
              Show Password
            </label>
          </div>
          {state.registerStatus && (
            <p className="register-successful">{state.registerMessage}</p>
          )}
          <button type="submit" className="Register-page-register-button">
            Register
          </button>
        </form>
        <button
          onClick={navigateToLoginPage}
          className="Register-page-Login-button"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
