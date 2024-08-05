import React, { useContext, useState } from "react";
import "./Header.css";
import { Data } from "../../Context/userContext";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Header() {
  const navigate = useNavigate();
  const { state, setState } = useContext(Data);
  const [show, setShow] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const navigateToAbout = () => {
    if (Cookies.get("p_token") === undefined) {
      setLoginModal(true);
      navigate("/login");
    } else {
      navigate("/about");
    }
  };
  const navigateToTask = () => {
    if (Cookies.get("p_token") === undefined) {
      setLoginModal(true);
      navigate("/login");
    } else {
      navigate("/task");
    }
  };
  const navigateToSupport = () => {
    if (Cookies.get("p_token") === undefined) {
      setLoginModal(true);
      navigate("/login");
    } else {
      navigate("/support");
    }
  };
  const logoutComponent = () => {
    if (state.isUserLogin) {
      Cookies.remove("p_token");
      setState((i) => ({ ...i, isUserLogin: false }));
      navigate("/login", { replace: "/login" });
      setShow(false);
    } else {
      setShow(false);
      navigate("/login");
    }
  };
  const loginAndLogout = () => {
    if (state.isUserLogin) {
      setShow(true);
    } else {
      setShow(false);
      navigate("/login");
    }
  };
  const clickSignup = () => {
    navigate("/register");
  };
  return (
    <div>
      <div className="header-page-small-device">
        <nav className="navbar navbar-dark bg-dark ">
          <div className="container-fluid">
            <Link to="" className="navbar-brand navbarName">
              BUNNY
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabindex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                  Menu
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <Link to="" className="nav-link " aria-current="page">
                      Home
                    </Link>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" onClick={navigateToAbout}>
                      About
                    </button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" onClick={navigateToTask}>
                      Task
                    </button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" onClick={navigateToSupport}>
                      Support
                    </button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" onClick={loginAndLogout}>
                      {state.isUserLogin ? "Logout" : "Login"}
                    </button>
                  </li>
                  <li class="nav-item" onClick={clickSignup}>
                    {!state.isUserLogin ? (
                      <Link to="/register" class="nav-link">
                        Sign up
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="header-page-style">
        <div className="header-page-website-name-style-div">
          <Link to="" className="header-pages-features-style-para-style">
            <p className="header-page-website-name-style">BUNNY</p>
          </Link>
        </div>

        <div className="header-pages-features-style">
          <Link to="" className="header-pages-features-style-para-style">
            <p className="header-pages-para-styles">Home</p>
          </Link>
          <p onClick={navigateToAbout} className=" header-pages-para-styles">
            About
          </p>
          <p onClick={navigateToTask} className=" header-pages-para-styles">
            Task
          </p>
          <p onClick={navigateToSupport} className=" header-pages-para-styles">
            Support
          </p>
        </div>
        <div className="header-page-btns-tyle-div">
          <button
            className="header-page-btns-styles-div-styles"
            onClick={loginAndLogout}
          >
            {state.isUserLogin ? "Logout" : "Login"}
          </button>
          {!state.isUserLogin ? (
            <button
              onClick={clickSignup}
              className="header-page-btns-styles-div-styles"
            >
              {" "}
              <p>Sign Up</p>{" "}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal
        size="sm"
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Body>Are You Sure, Want to Logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="primary" onClick={logoutComponent}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="md"
        show={loginModal}
        onHide={() => setLoginModal(!loginModal)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm" className="loginModal">
            Please Login or Signup for Access
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-row justify-content-center align-content-center">
          Default EmailId: 1@gmail.com <br></br>
          Password: 1234567890
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
