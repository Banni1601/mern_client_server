import React, { useContext } from "react";
import "./Home.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Data } from "../../Context/userContext";

function Home() {
  const { state, setState, popUps, setPopUps } = useContext(Data);

  return (
    <div className="home-page-main-div text-center bg-light text-dark">
      <h1>Bunny</h1>
      <h1>Bunny</h1>
      <h1>Bunny</h1>
      <h1>Bunny</h1>
      <h1>Bunny</h1>
      <ToastContainer
        className="p-5"
        position="bottom-end"
        style={{ zIndex: 1 }}
      >
        <Toast
          show={popUps.showToast}
          onClose={() => setPopUps((i) => ({ ...i, showToast: false }))}
          className=""
        >
          <Toast.Header className="">
            <img
              src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
              className="rounded me-0 "
              height={30}
              alt=""
            />
            <strong className="me-auto ">Hi {state.currentUserName}</strong>
          </Toast.Header>
          <Toast.Body className="text-center text-dark">
            You successfully logged in
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Home;
