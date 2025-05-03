import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Modal } from "reactstrap";
import logo from "../../assets/images/logo.jpg";
import Register from "../Register";
import ReCAPTCHA from "react-google-recaptcha";
import {
  forgotPassword,
  resetErrors,
} from "../../store/UserStore/Login/action";
import ForgotPasswordOtpVerification from "./otpVerification";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const ForgetPassword = ({
  modal_center,
  setmodal_center,
  setforgetmodal_center,
  modalforget_center,
}) => {
  const [modalOtp, setOtpModal] = useState(false);
  const Login = useSelector((state) => state.Login);

  const wrapperRef = useRef(null);
  const [modalReg, setRegModal] = useState(false);
  const toggle = () => setRegModal(!modalReg);
  const dispatch = useDispatch();

  // let [phone, setphone] = useState();
  let [forgotphone, setforgotphone] = useState("");
  let [forgotphoneValild, setforgotphoneValid] = useState(true);
  let [disableLogin, setDisableLogin] = useState(true);

  let [recaptcha_response, setRecaptcha_response] = useState("");
  let [captcha, setCaptcha] = useState(false);
  const [customError, setCustomError] = useState("");
  const recaptchaRef = React.createRef();

  useEffect(() => {
    if (!forgotphone) {
      setDisableLogin(true);
    } else {
      setDisableLogin(false);
    }
  }, [forgotphone]);

  const handleValidSubmit = (e) => {
    e.preventDefault();
    if (!forgotphone) {
      return setCustomError("Please Enter Phone Number");
    }
    if (!captcha) {
      return setCustomError("Please verify captcha");
    }
    dispatch(
      forgotPassword({
        data: {
          phone: forgotphone,
          "g-recaptcha-response": recaptcha_response,
          user_type: "pet_owner",
        },
        callback: () => {
          setforgetmodal_center(false);
          setOtpModal(true);
        },
      })
    );
  };

  const handleCaptcha = (key) => {
    setCaptcha(true);
    setRecaptcha_response(key);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setRegModal(false);
    }
  };

  const handleKeyDown = () => {
    window.addEventListener(
      "keydown",
      function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "69"].indexOf(e.code) > -1) {
          e.preventDefault();
        }
      },
      false
    );
  };

  const forgotphoneChangeHandler = (value) => {
    if (value) {
      setforgotphone(value);
      if (isValidPhoneNumber(value)) {
        setforgotphoneValid(true);
      }
    }
  };
  const loginphoneOnBlurHandler = () => {
    if (!isValidPhoneNumber(forgotphone)) {
      setforgotphoneValid(false);
    }
  };

  return (
    <>
      <Modal isOpen={modalforget_center} centered={true}>
        <div className="modal-header mb-5 text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setforgetmodal_center(false);
              dispatch(resetErrors());
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex flex-column text-center">
            <form onSubmit={handleValidSubmit}>
              <div className="form-title text-center">
                <h2>Forget Password</h2>
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                {/* <input
                  type="number"
                  className="form-control "
                  id="phone"
                  placeholder="Phone Number"
                  style={{ fontSize: "1.5rem" }}
                  onChange={(e) => setphone(e.target.value)}
                  onKeyDown={handleKeyDown}
                /> */}
                <PhoneInput
                  international={false}
                  id="phone"
                  defaultCountry="IN"
                  placeholder="Mobile number"
                  value={forgotphone}
                  onChange={forgotphoneChangeHandler}
                  onBlur={loginphoneOnBlurHandler}
                  className={
                    !forgotphoneValild
                      ? "InvalidPhoneInput loginPhoneInput"
                      : "loginPhoneInput"
                  }
                />
              </div>

              {Login?.error ? (
                Login?.error == "User does not exit" ? null : (
                  <p className="text-danger">{Login?.error}</p>
                )
              ) : null}

              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <ReCAPTCHA
                  onChange={handleCaptcha}
                  ref={recaptchaRef}
                  // sitekey="6Lcp2Q8hAAAAAHPYgFNOhLkORwaEzONE22eSl3z3"
                  sitekey="6LewnBAhAAAAAIzftXHC0DvJELrZB74qiaAB-nwm"
                  theme="light"
                />
              </div>
              {customError && <p className="text-danger">{customError}</p>}
              <button
                type="submit"
                className="btn btn-info  btn-round"
                style={{
                  padding: "5px 80px",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                Send OTP
              </button>
            </form>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <div className="signup-section">
            <h5>
              <a
                style={{ cursor: "pointer" }}
                className="text-info"
                onClick={() => {
                  setforgetmodal_center(false);
                  setmodal_center(true);
                }}
              >
                Login
              </a>
            </h5>
          </div>
        </div>
      </Modal>
      <ForgotPasswordOtpVerification
        otpmodal_center={modalOtp}
        setotpmodal_center={setOtpModal}
        setmodal_center={setmodal_center}
      />
    </>
  );
};

export default ForgetPassword;
