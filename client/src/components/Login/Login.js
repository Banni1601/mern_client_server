import React, { useContext } from "react";
import "./Login.css";
import { Data } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
function Login() {
  const { state, setState, popUps, setPopUps } = useContext(Data);
  const navigate = useNavigate();

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
          setPopUps((i) => ({ ...i, loading: true }));
          const p_token = response.data.token;
          Cookies.set("p_token", p_token, { expires: 30 });
          setState((i) => ({
            ...i,
            viewPassword: true,
            loginMessage: "Login Successful and wait for 2 secs",
            loginStatus: true
          }));
          // setShowA(!showA);
          setTimeout(() => {
            setState((i) => ({
              ...i,
              currentUserName: response.data.name,
              currentUserMailId: response.data.email,
              userName: "",
              password: "",
              emailId: "",
              loginStatus: false,
              isUserLogin: !state.isUserLogin
            }));
            setPopUps((i) => ({ ...i, showToast: true, loading: false }));

            navigate("/", { replace: true });
          }, 3000);
        } else if (
          response.status === 201 ||
          response.status === 203 ||
          response.status === 202
        ) {
          // setLoading(false);
          setState((i) => ({
            ...i,
            loginMessage: "invalid username or password",
            loginStatus: true
          }));

          //  alert("Invalid Username or Password and Please Try Again");
        }
      })

      .catch((error) => {
        if (error.response.status === 204) {
          // setLoading(false);
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
  };
  const changePassword = (e) => {
    setState((i) => ({ ...i, password: e.target.value }));
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
        {popUps.loading ? (
          <Modal
            size="sm"
            show={popUps.loading}
            aria-labelledby="example-modal-sizes-title-sm"
            centered
            className="d-flex flex-row justify-content-center"
          >
            <Modal.Body className="d-flex">
              {" "}
              <strong className="">Please Wait...</strong>
              <Spinner animation="border" role="status" className="loader">
                <span className="visually-hidden"> </span>
              </Spinner>
            </Modal.Body>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Login;
