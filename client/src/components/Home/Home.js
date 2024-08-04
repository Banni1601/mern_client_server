import React, { useContext } from "react";
import "./Home.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";
import { Data } from "../../Context/userContext";
function Home() {
  const [showA, setShowA] = useState(true);
  const { state, setState } = useContext(Data);

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
        <Toast show={showA} onClose={() => setShowA(!showA)} className="">
          <Toast.Header className="">
            <img
              src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
              className="rounded me-0 "
              height={50}
              alt=""
            />
            <strong className="me-auto ">{state.emailId}</strong>
          </Toast.Header>
          <Toast.Body className="text-center text-dark">
            You Successfully login
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Home;
