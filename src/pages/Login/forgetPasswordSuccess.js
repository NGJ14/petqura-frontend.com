import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { Modal } from "reactstrap";
import logo from "../../assets/images/logo.jpg";
import Register from "../Register";
import {
  forgotPassword,
  forgotVerifyPassword,
  resetErrors,
} from "../../store/UserStore/Login/action";
import ForgotPasswordOtpVerification from "./otpVerification";

const ForgetPasswordSuccess = ({
  modalChangePasswordSuccess,
  setChangePasswordSuccessModal,
  setmodal_center,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal isOpen={modalChangePasswordSuccess} centered={true}>
        <div className="modal-header mb-5 text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setChangePasswordSuccessModal(false);
              dispatch(resetErrors());
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex flex-column text-center">
            <div className="form-title text-center">
              <h2>
                <i
                  className="fa fa-check bg-info rounded-circle text-white"
                  style={{ fontSize: "20px", padding: "5px" }}
                  aria-hidden="true"
                ></i>{" "}
                Success
              </h2>
              <h5>Successfully changed the password</h5>
            </div>

            <button
              type="submit"
              className="btn btn-info  btn-round  mb-3"
              style={{
                padding: "5px 80px",
                fontWeight: "bold",
                fontSize: "13px",
              }}
              onClick={() => {
                dispatch(resetErrors());
                setmodal_center(true);
                setChangePasswordSuccessModal(false);
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ForgetPasswordSuccess;
