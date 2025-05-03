import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "reactstrap";
import {
  forgotVerifyOtp,
  resetErrors,
} from "../../store/UserStore/Login/action";
import Success from "../Register/success";
import ForgetPasswordConfirm from "./forgetPasswordConfirm";

const ForgotPasswordOtpVerification = ({
  setotpmodal_center,
  otpmodal_center,
  setmodal_center,
}) => {
  const dispatch = useDispatch();

  const [otp1, setotp1] = useState("");
  const [otp2, setotp2] = useState("");
  const [otp3, setotp3] = useState("");
  const [otp4, setotp4] = useState("");
  const [otp5, setotp5] = useState("");
  const [otp6, setotp6] = useState("");
  const [disable, setdisable] = useState(true);
  // const [modalsuccess, setModalSuccess] = useState(false);
  const [modalChangePassword, setChangePasswordModal] = useState(false);
  const Login = useSelector((state) => state.Login);
  const otpData = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      forgotVerifyOtp({
        // data: { phone: userData?.user?.phone, otp: otpData },
        data: {
          phone: Login?.user?.phone,
          otp: otpData,
          user_type: "pet_owner",
        },
        callback: () => {
          setChangePasswordModal(true);
          setotpmodal_center(false);
          setotp1("");
          setotp2("");
          setotp3("");
          setotp4("");
          setotp5("");
          setotp6("");
        },
      })
    );
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      if (elmnt?.target?.value || typeof elmnt?.target?.value == "number") {
        const next = elmnt.target.tabIndex;
        if (next < 6) {
          elmnt.target.form.elements[next].focus();
        }
      }
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

  return (
    <>
      <Modal isOpen={otpmodal_center} centered={true}>
        <div className="modal-header mb-5 text-center">
          <h5>OTP Verification</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setotpmodal_center(false);
              dispatch(resetErrors());
              setotp1("");
              setotp2("");
              setotp3("");
              setotp4("");
              setotp5("");
              setotp6("");
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="modal-body">
          <div className=" text-center">
            <h5>
              Please enter the one time password <br /> to verify your account
            </h5>
            <span className="mt-5 mb-5">
              A code has been sent to *******{Login?.user?.phone?.slice(9, 13)}
            </span>
            <form onSubmit={handleSubmit}>
              <div className="otpContainer">
                <input
                  name="otp1"
                  type="number"
                  autoComplete="off"
                  className="otpInput"
                  value={otp1}
                  onChange={(e) => setotp1(e.target.value)}
                  tabIndex="1"
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                  onKeyDown={handleKeyDown}
                />
                <input
                  name="otp2"
                  type="number"
                  autoComplete="off"
                  className="otpInput"
                  value={otp2}
                  onChange={(e) => setotp2(e.target.value)}
                  tabIndex="2"
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                  onKeyDown={handleKeyDown}
                />
                <input
                  name="otp3"
                  type="number"
                  autoComplete="off"
                  className="otpInput"
                  value={otp3}
                  onChange={(e) => setotp3(e.target.value)}
                  tabIndex="3"
                  maxLength="1"
                  onKeyDown={handleKeyDown}
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  name="otp4"
                  type="number"
                  autoComplete="off"
                  className="otpInput"
                  value={otp4}
                  onChange={(e) => setotp4(e.target.value)}
                  tabIndex="4"
                  maxLength="1"
                  onKeyDown={handleKeyDown}
                  onKeyUp={(e) => inputfocus(e)}
                />

                <input
                  name="otp5"
                  type="number"
                  autoComplete="off"
                  className="otpInput"
                  value={otp5}
                  onChange={(e) => setotp5(e.target.value)}
                  tabIndex="5"
                  maxLength="1"
                  onKeyDown={handleKeyDown}
                  onKeyUp={(e) => inputfocus(e)}
                />

                <input
                  name="otp6"
                  type="number"
                  autoComplete="off"
                  className="otpInput"
                  value={otp6}
                  onChange={(e) => setotp6(e.target.value)}
                  tabIndex="6"
                  maxLength="1"
                  onKeyDown={handleKeyDown}
                  onKeyUp={(e) => inputfocus(e)}
                />
              </div>

              {Login?.error && <p className="text-danger">{Login?.error}</p>}

              <button
                type="submit"
                className="btn btn-info btn-round my-4"
                style={{
                  padding: "8px 30px",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
                // onClick={() => {
                //   setChangePasswordModal(true);
                //   setotpmodal_center(false);
                // }}
              >
                Submit
              </button>
            </form>
          </div>
          {/* <div className="text-center">
            <span className="mr-2">Didn't get the code</span>
            <a href="#" className="text-decoration-none ms-3">
              Resend
            </a>
          </div> */}
        </div>
        <div className="modal-footer d-flex justify-content-center ">
          <div className="signup-section ">
            <a
              style={{ cursor: "pointer" }}
              className="text-info"
              onClick={() => {
                setotpmodal_center(false);
                setmodal_center(true);
              }}
            >
              Login
            </a>
          </div>
        </div>
      </Modal>
      <ForgetPasswordConfirm
        modalChangePassword={modalChangePassword}
        setChangePasswordModal={setChangePasswordModal}
        setmodal_center={setmodal_center}
      />
    </>
  );
};

export default ForgotPasswordOtpVerification;
