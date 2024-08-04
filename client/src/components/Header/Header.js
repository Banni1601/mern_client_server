import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Header() {
  const navigate = useNavigate();
  const navigateToAbout = () => {
    if (Cookies.get("p_token") === undefined) {
      navigate("/login");
    } else {
      navigate("/about");
    }
  };
  const navigateToTask = () => {
    if (Cookies.get("p_token") === undefined) {
      navigate("/login");
    } else {
      navigate("/task");
    }
  };

  const navigateToSupport = () => {
    if (Cookies.get("p_token") === undefined) {
      navigate("/login");
    } else {
      navigate("/support");
    }
  };

  return (
    <div>
      <div className="header-page-small-device">
        <nav className="navbar navbar-dark bg-dark fixed-top">
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
                    <Link to="/login" class="nav-link">
                      login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/register" class="nav-link">
                      Sign up
                    </Link>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" onClick={navigateToSupport}>
                      Support
                    </button>
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
          <Link to="/login" className="header-page-btns-style-div-Link-styles">
            {" "}
            <button className="header-page-btns-styles-div-styles">
              Login
            </button>
          </Link>
          <Link
            to="/register"
            className="header-page-btns-style-div-Link-styles"
          >
            {" "}
            <button className="header-page-btns-styles-div-styles">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
