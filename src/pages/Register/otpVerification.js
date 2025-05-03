import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "reactstrap";
import { getLocalStorage, setLocalStorage } from "../../helpers/utils";
import {
  resetUserRegisterErrors,
  verifyOtp,
} from "../../store/UserRegister/action";
import { verifyOtpGuest } from "../../store/UserStore/Guest/action";
import Success from "./success";

const OtpVerification = ({
  setotpmodal_center,
  otpmodal_center,
  setregmodal_center,
  setmodal_center,
  successMessage,
  backbuttonTitle,
  showPassword,
}) => {
  const dispatch = useDispatch();

  const [otp1, setotp1] = useState("");
  const [otp2, setotp2] = useState("");
  const [otp3, setotp3] = useState("");
  const [otp4, setotp4] = useState("");
  const [otp5, setotp5] = useState("");
  const [otp6, setotp6] = useState("");
  const [disable, setdisable] = useState(true);
  const [modalsuccess, setModalSuccess] = useState(false);

  const userData = useSelector((state) => state.Register);
  const Guest = useSelector((state) => state.Guest);
  const otpData = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
  const auth = getLocalStorage("AUTH_DETAILS");
  if (auth) {
    auth["phone_verified"] = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showPassword) {
      dispatch(
        verifyOtp({
          data: { phone: userData?.user?.phone, otp: otpData },
          callback: () => {
            setModalSuccess(true);
            setotpmodal_center(false);
          },
        })
      );
    } else {
      dispatch(
        verifyOtpGuest({
          data: { phone: auth?.phone, otp: otpData, guest_id: auth?.guest_id },
          callback: () => {
            setModalSuccess(true);
            setotpmodal_center(false);
            setLocalStorage("AUTH_DETAILS", auth);
          },
        })
      );
    }
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
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
              dispatch(resetUserRegisterErrors());
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
              A code has been sent to *******
              {auth?.phone
                ? auth?.phone?.slice(9, 13)
                : userData?.user?.phone?.slice(9, 13)}
            </span>
            <form onSubmit={handleSubmit}>
              <div className="otpContainer">
                <input
                  name="otp1"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={otp1}
                  onChange={(e) => setotp1(e.target.value)}
                  tabIndex="1"
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  name="otp2"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={otp2}
                  onChange={(e) => setotp2(e.target.value)}
                  tabIndex="2"
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  name="otp3"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={otp3}
                  onChange={(e) => setotp3(e.target.value)}
                  tabIndex="3"
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                />
                <input
                  name="otp4"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={otp4}
                  onChange={(e) => setotp4(e.target.value)}
                  tabIndex="4"
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                />

                <input
                  name="otp5"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={otp5}
                  onChange={(e) => setotp5(e.target.value)}
                  tabIndex="5"
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                />

                <input
                  name="otp6"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={otp6}
                  onChange={(e) => setotp6(e.target.value)}
                  tabIndex="6"
                  maxLength="1"
                  onKeyUp={(e) => inputfocus(e)}
                />
                {Guest?.error && (
                  <p className="text-danger mt-3">{Guest?.error}</p>
                )}
                {userData?.error && (
                  <p className="text-danger mt-3">{userData?.error}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-info btn-round my-4"
                style={{
                  padding: "8px 30px",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
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

            {/* <a
            style={{ cursor: "pointer" }}
            className="text-info"
            onClick={() => {
              setotpmodal_center(false);
              setregmodal_center(true);
            }}
          >
            Login
          </a> */}
          </div>
        </div>
      </Modal>
      <Success
        modalsuccess={modalsuccess}
        setModalSuccess={setModalSuccess}
        setmodal_center={setmodal_center}
        successMessage={successMessage}
        backbuttonTitle={backbuttonTitle}
      />
    </>
  );
};

export default OtpVerification;
