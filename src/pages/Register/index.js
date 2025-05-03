import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "reactstrap";
import {
  registerUser,
  resetUserRegisterErrors,
} from "../../store/UserRegister/action";
import OtpVerification from "./otpVerification";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import {
  checkIfValidEmail,
  getLocalStorage,
  checkIfValidIndianMobileNumber,
  removeItem,
  checkIfValidPasswordWithNumbers,
  checkIfValidPasswordWithSpecialCharacters,
} from "../../helpers/utils";
import {
  addGuestDetails,
  guestResetErrors,
} from "../../store/UserStore/Guest/action";

const Register = ({
  modalreg_center,
  setregmodal_center,
  setmodal_center,
  reg_toggle,
  heading,
  successMessage,
  showPassword,
  backbuttonTitle,
  setCustomError,
  customError,
  firstname,
  lastname,
  email,
  phone,
  password,
  setFirstName,
  setEmail,
  setLastName,
  setPhone,
  setPassword,
  pass,
  errorMessage,
  setErrorMessage,
  passwordError,
  setPasswordError,
  confirmPassword,
  setConfirmPassword,
  setChecked,
  checked,
}) => {
  const dispatch = useDispatch();
  let [showPwd, setShowPwd] = useState(false);
  let [phoneValild, setphoneValid] = useState(true);
  let [showConfirmPwd, setShowConfirmPwd] = useState(false);
  let [recaptcha_response, setRecaptcha_response] = useState("");
  let [captcha, setCaptcha] = useState(false);
  const showPasswordClass = "fa fa-eye-slash";
  const hidePasswordClass = "fa fa-eye";
  const [modalOtp, setOtpModal] = useState(false);

  const Register = useSelector((state) => state.Register);
  const Guest = useSelector((state) => state.Guest);

  const auth = getLocalStorage("AUTH_DETAILS");

  const recaptchaRef = React.createRef();

  const handleCaptcha = (key) => {
    setCaptcha(true);
    // this.setState({
    //   captcha: true,
    //   "g-recaptcha-response": key,
    // });
    setRecaptcha_response(key);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !phone) {
      return setCustomError("Please enter all the required fields");
    } else {
      // if (checkIfValidIndianMobileNumber(`+91${phone}`)) {
      //   return setCustomError("Please enter valid phone number");
      // }
      if (!isValidPhoneNumber(phone)) {
        setphoneValid(false);
        return setCustomError("Please enter valid phone number");
      }
      if (password != confirmPassword) {
        return setCustomError("Password must match");
      }
      if (!passwordError) {
        return setCustomError("Password requirments not satisfied");
      }
      if (!checked) {
        return setCustomError("Please Agree the terms and conditions");
      }
      if (!captcha) {
        return setCustomError("Please verify captcha");
      }
      setCustomError("");
      if (!showPassword) {
        dispatch(
          registerUser({
            user: {
              first_name: firstname,
              last_name: lastname,
              email,
              phone: phone,
              password,
              "g-recaptcha-response": recaptcha_response,
            },
            callback: () => {
              setregmodal_center(false);
              setOtpModal(true);
              setFirstName("");
              setLastName("");
              setPhone("");
              setEmail("");
              setPassword("");
              removeItem("AUTH_DETAILS");
              dispatch(guestResetErrors());
            },
          })
        );
      } else {
        dispatch(
          addGuestDetails({
            guest: {
              guest_id: auth?.guest_id,
              first_name: firstname,
              last_name: lastname,
              email,
              phone: phone,
            },
            callback: () => {
              setregmodal_center(false);
              setOtpModal(true);
              setFirstName("");
              setLastName("");
              setPhone("");
              setEmail("");
              setPassword("");
            },
          })
        );
      }
    }
  };

  useEffect(() => {
    if (email?.length > 0 && !checkIfValidEmail(email)) {
      setErrorMessage("Enter a valid email address");
    } else {
      setErrorMessage("");
    }
  }, [email]);

  const handleKeyDown = () => {
    window.addEventListener(
      "keydown",
      function (e) {
        if (["Space", "ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
          e.preventDefault();
        }
      },
      false
    );
  };

  const phoneChangeHandler = (value) => {
    if (value) {
      setPhone(value);
      if (isValidPhoneNumber(value)) {
        setphoneValid(true);
      }
    }
  };
  const phoneOnBlurHandler = () => {
    if (!isValidPhoneNumber(phone)) {
      setphoneValid(false);
    }
  };

  useEffect(() => {
    if (
      checkIfValidPasswordWithSpecialCharacters(password) &&
      checkIfValidPasswordWithNumbers(password) &&
      password?.length >= 6
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);
  return (
    <>
      <Modal isOpen={modalreg_center} centered={true} toggle={reg_toggle}>
        <div className="modal-header mb-5 text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setregmodal_center(false);
              dispatch(resetUserRegisterErrors());
              setCustomError("");
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="d-flex flex-column text-center">
            <form onSubmit={handleSubmit}>
              <div className="form-title text-center">
                {heading ? <h4>{heading}</h4> : <h2>Signup</h2>}
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="text"
                  className="form-control "
                  id="name"
                  placeholder="First name"
                  style={{ fontSize: "1.5rem" }}
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="text"
                  className="form-control custom-input"
                  id="name"
                  placeholder="Last name"
                  style={{ fontSize: "1.5rem" }}
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="text"
                  className="form-control "
                  id="email1"
                  placeholder="Email address"
                  style={{ fontSize: "1.5rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errorMessage && (
                  <p className="mt-2 ml-1 text-left mandatory">
                    {errorMessage}
                  </p>
                )}
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
                  className="form-control custom-input"
                  id="phone"
                  placeholder="Phone Number without country code "
                  style={{ fontSize: "1.5rem" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={10}
                /> */}
                <PhoneInput
                  international={false}
                  addInternationalOption={false}
                  defaultCountry="IN"
                  placeholder="Enter Mobile number"
                  value={phone}
                  onChange={phoneChangeHandler}
                  onBlur={phoneOnBlurHandler}
                  className={
                    !phoneValild
                      ? "InvalidPhoneInput loginPhoneInput"
                      : "loginPhoneInput"
                  }
                />
              </div>
              {pass && (
                <>
                  <div
                    className="form-group cust-login-fieldWrapper"
                    style={{
                      margin: "15px 20px",
                      padding: "0px 20px",
                    }}
                  >
                    <input
                      type={showPwd ? "text" : "password"}
                      className="form-control"
                      id="password1"
                      placeholder=" Password"
                      style={{ fontSize: "1.5rem" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="cust-user-eye"
                      onClick={() => setShowPwd(!showPwd)}
                      data-testid="component-login-passwordMask"
                    >
                      <i
                        className={
                          showPwd ? hidePasswordClass : showPasswordClass
                        }
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                  <div
                    className="form-group cust-login-fieldWrapper"
                    style={{
                      margin: "15px 20px",
                      padding: "0px 20px",
                    }}
                  >
                    <input
                      type={showConfirmPwd ? "text" : "password"}
                      className="form-control"
                      id="password1"
                      placeholder="Confirm Password"
                      style={{ fontSize: "1.5rem" }}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div
                      className="cust-user-eye"
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                      data-testid="component-login-passwordMask"
                    >
                      <i
                        className={
                          showConfirmPwd ? hidePasswordClass : showPasswordClass
                        }
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </>
              )}
              <div className="d-flex ml-5 pl-3">
                <ReCAPTCHA
                  onChange={handleCaptcha}
                  ref={recaptchaRef}
                  //This ref can be used to call captcha related functions in case you need.
                  // sitekey="6Lcp2Q8hAAAAAHPYgFNOhLkORwaEzONE22eSl3z3"
                  sitekey="6LewnBAhAAAAAIzftXHC0DvJELrZB74qiaAB-nwm"
                  theme="light"
                />
              </div>
              <div className="d-flex ml-5 pl-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  value={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <label
                  for="terms"
                  className="ml-3 mt-1"
                  style={{ width: "auto" }}
                >
                  {" "}
                  I Agree to the{" "}
                  <a
                    href="/terms-of-service"
                    className="orange-font"
                    target="_blank"
                  >
                    Terms of Services
                  </a>
                </label>
              </div>

              <div className="d-flex ml-3 ">
                {passwordError ? (
                  <i
                    className="fa fa-check mr-1 mt-1"
                    style={{ fontSize: "16px", color: "green" }}
                  ></i>
                ) : (
                  <i
                    className="fa fa-close mr-1 mt-1"
                    style={{ fontSize: "16px", color: "red" }}
                  ></i>
                )}

                <p className="mb-4 mr-4">
                  Need at least one number,special character and total of six
                  characters
                </p>
              </div>

              {Register?.error && (
                <p className="mr-4 mt-2 mandatory">{Register?.error}</p>
              )}
              {Guest?.error && Guest?.error != "Guest ID not found" && (
                <p className="mr-4 mt-2 mandatory">{Guest?.error}</p>
              )}
              {!Guest?.error && !Register?.error && customError && (
                <p className="mr-4 mandatory">{customError}</p>
              )}

              <button
                type="submit"
                className="btn btn-info btn-round"
                style={{
                  padding: "5px 80px",
                  fontWeight: "bold",
                }}
              >
                Send OTP
              </button>
            </form>
          </div>
        </div>
        {!heading && (
          <div className="modal-footer d-flex justify-content-center">
            <div className="signup-section">
              <h5>
                <a
                  style={{ cursor: "pointer" }}
                  className="text-info"
                  onClick={() => {
                    setregmodal_center(false);
                    setmodal_center(true);
                    dispatch(resetUserRegisterErrors());
                  }}
                >
                  Login
                </a>
              </h5>
            </div>
          </div>
        )}
      </Modal>
      <OtpVerification
        modalreg_center={modalreg_center}
        setregmodal_center={setregmodal_center}
        otpmodal_center={modalOtp}
        setotpmodal_center={setOtpModal}
        setmodal_center={setmodal_center}
        successMessage={successMessage}
        backbuttonTitle={backbuttonTitle}
        showPassword={showPassword}
      />
    </>
  );
};

export default Register;
