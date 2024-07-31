import React from "react";
import bgImg from "../../assets/bgImg.jpg";
import Form from "../../modules/Form";
import ReactDOM from "react-dom";

const Modal = ({ closeModel, children }) => {
  return ReactDOM.createPortal(
    <>
      <div
        className="backdrop-blur-sm bg-white/30 fixed inset-0"
        onClick={closeModel}
      ></div>
      <div className="flex justify-center items-center z-10   rounded-md drop-shadow-lg mb-12 fixed top-0 left-1/4 translate-x-1/2">
        {children}
      </div>
    </>,
    document.body
  );
};

export default Modal;
