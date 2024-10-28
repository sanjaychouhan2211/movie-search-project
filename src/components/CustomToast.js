import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const CustomToast = ({ message, show, setShow }) => (
  <ToastContainer position="top-end" className="p-3">
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </ToastContainer>
);

export default CustomToast;
