import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarerType } from "../../../store/carer/action";
import {
  registerCarer,
  sendCarerOtp,
  verifyCarerOtp,
} from "../../../store/CarerRegister/actions";
import logo from "../../../assets/images/logo.jpg";
import Footer from "../../../components/Layout/footer";
import { Redirect, useHistory } from "react-router";
import {
  checkIfValidEmail,
  checkIfValidIndianMobileNumber,
  getLocalStorage,
  checkIfValidPasswordWithSpecialCharacters,
  checkIfValidPasswordWithNumbers,
} from "../../../helpers/utils";
import SuccessConfirmationAlert from "../../../components/SuccessConfirmationAlert";
import { UncontrolledAlert } from "reactstrap";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";

const CarerRegister = () => {
  const CarerDetails = useSelector((state) => state.Carer);

  let [showPwd, setShowPwd] = useState(true);
  const showPasswordClass = "fa fa-eye-slash";
  const hidePasswordClass = "fa fa-eye";
  let [loginPhone, setLoginPhone] = useState();

  let [verifyOtp, setVerifyOtp] = useState(false);
  let [userName, setUserName] = useState();
  let [firstName, setfirstName] = useState();
  let [lastName, setlastName] = useState();
  let [phone, setPhone] = useState();
  let [registerPhone, setRegisterPhone] = useState("");
  let [registerphoneValild, setRegisterphoneValid] = useState(true);
  let [businessType, setBusinessType] = useState();
  let [password, setPassword] = useState();
  let [repassword, setRePassword] = useState();
  let [showOTPForm, setShowOTPForm] = useState(false);
  let [otp, setOtp] = useState();
  let [custError, setCustError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [disableRegister, setDisableRegister] = useState(true);
  let [disablePhone, setDisablePhone] = useState(true);
  const [modal, setModal] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const [showTimer, setshowTimer] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [sixCharacter, setSixCharacter] = useState(false);
  let [recaptcha_response, setRecaptcha_response] = useState("");
  let [captcha, setCaptcha] = useState(false);
  const recaptchaRef = React.createRef();

  const history = useHistory();
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (
      password?.length >= 6 &&
      checkIfValidPasswordWithSpecialCharacters(password) &&
      checkIfValidPasswordWithNumbers(password)
    ) {
      setSixCharacter(true);
    } else {
      setSixCharacter(false);
    }
  }, [password]);

  useEffect(() => {
    if (password != undefined && repassword != undefined) {
      if (password != repassword) {
        setEmailError("Password must match");
      } else {
        setEmailError("");
      }
    }
  }, [repassword]);
  const CarerRegister = useSelector((state) => state.CarerRegister);
  const dispatch = useDispatch();

  const handleCaptcha = (key) => {
    setCaptcha(true);
    // this.setState({
    //   captcha: true,
    //   "g-recaptcha-response": key,
    // });
    setRecaptcha_response(key);
  };

  const registerphoneChangeHandler = (value) => {
    if (value) {
      setRegisterPhone(value);
      if (isValidPhoneNumber(value)) {
        setRegisterphoneValid(true);
      }
    }
  };
  const registerphoneOnBlurHandler = () => {
    if (!isValidPhoneNumber(registerPhone)) {
      setRegisterphoneValid(false);
    }
  };

  const handleValidSubmit = (event) => {
    event.preventDefault();
    if (checkIfValidEmail(userName)) {
      setEmailError("");
      dispatch(
        registerCarer({
          user: {
            first_name: firstName,
            last_name: lastName,
            email: userName,
            // phone: `+91${phone}`,
            phone: registerPhone,
            carer_type_id: businessType,
            password: password,
          },
          toggle: () => toggle(),
        })
      );
    } else {
      setEmailError("Invalid Email ID");
    }
  };

  useEffect(() => {
    dispatch(getCarerType());
  }, []);

  // const [seconds, setSeconds] = useState(60);

  // useEffect(() => {
  // if (timer && seconds > 0) {
  // setTimeout(() => setSeconds(seconds - 1), 1000);
  // }
  // }, [seconds]);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  function updateTime() {
    // if (showTimer == true) {
    if (minutes == 0 && seconds == 0) {
      //reset
      setSeconds(0);
      setMinutes(0);
    } else {
      if (seconds == 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }
    // }
  }

  useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    return function cleanUp() {
      clearTimeout(token);
    };
  }, []);

  useEffect(() => {
    CarerDetails?.carerInitial && setBusinessType(CarerDetails?.carerInitial);
  }, [CarerDetails?.carerInitial]);

  const handleSendOtp = (e) => {
    if (isValidPhoneNumber(registerPhone)) {
      if (!captcha) {
        return setCustError("Please verify captcha");
      }
      e.preventDefault();
      setCustError("");
      dispatch(
        sendCarerOtp({
          data: {
            phone: registerPhone,
            otp: otp,
            "g-recaptcha-response": recaptcha_response,
          },
          callback: () => {
            setShowOTPForm(true);
            setOtpSend(true);
            setshowTimer(true);
          },
        })
      );
    } else {
      setOtpSend(false);
      setshowTimer(false);
      setMinutes(2);
      setSeconds(0);

      setCustError("Invalid Mobile Number");
    }
  };

  useEffect(() => {
    if (
      CarerRegister?.error == "An account already exists with this phone number"
    ) {
      setOtpSend(false);
      setshowTimer(false);
      setMinutes(2);
      setSeconds(0);
    }
  }, [CarerRegister?.error]);

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(
      verifyCarerOtp({
        data: { phone: registerPhone, otp: otp },
        callback: () => {
          setVerifyOtp(true);
          setShowOTPForm(false);
          setOtpVerify(true);
          setshowTimer(false);
          setMinutes(2);
          setSeconds(0);
        },
      })
    );
  };

  useEffect(() => {
    if (
      !registerPhone ||
      !otp ||
      !firstName ||
      !lastName ||
      !userName ||
      !password ||
      !repassword ||
      password != repassword ||
      !sixCharacter
    ) {
      setDisableRegister(true);
    } else {
      setDisableRegister(false);
    }
  }, [registerPhone, otp, firstName, lastName, userName, password, repassword]);

  useEffect(() => {
    console.log(registerPhone);
    if (!registerphoneValild || registerPhone == "") {
      setDisablePhone(true);
    } else {
      setDisablePhone(false);
    }
  }, [registerphoneValild, registerPhone]);

  return getLocalStorage("AUTH_DETAILS") &&
    getLocalStorage("AUTH_DETAILS")?.user?.role != "pet_owner" ? (
    <Redirect to="/carer/seller/dashboard" />
  ) : (
    <>
      <header className=" header-container  d-flex justify-content-between">
        <a href="/">
          <img src={logo} />{" "}
        </a>

        <a href="/" className="text-dark mt-4 mr-4 pt-2">
          Return to home
        </a>
      </header>
      <section
        className="divider parallax layer-overlay overlay-dark-8 carer-cust-margin"
        data-bg-img="http://placehold.it/1920x1280"
      >
        <div className="container-fluid p-0">
          <div className="row equal-height">
            <div className="col-md-6 bg-light pt-30">
              <div className="p-70">
                <div className="row">
                  {(CarerDetails?.error || CarerDetails?.success) && (
                    <div>
                      <UncontrolledAlert
                        color={CarerDetails?.error ? "danger" : "success"}
                        className="alert-dismissible fade show"
                        role="alert"
                      >
                        {CarerDetails?.error || CarerDetails?.success}
                      </UncontrolledAlert>
                    </div>
                  )}
                  <div className="col-md-10">
                    <h2 className="mt-0 line-height-1 mb-20">
                      <span>
                        Sign Up
                        <span className="text-theme-colored"> Now</span>
                      </span>
                    </h2>

                    <form
                      onSubmit={handleValidSubmit}
                      className="form-transparent mt-20"
                    >
                      <div className="row">
                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20">
                            {/* <input
                              name="phone"
                              className="custom-form-control"
                              type="number"
                              required
                              placeholder="Enter Phone Number"
                              autoComplete="false"
                              aria-required="true"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              disabled={verifyOtp ? true : false}
                            /> */}
                            <PhoneInput
                              international={false}
                              addInternationalOption={false}
                              id="phone"
                              defaultCountry="IN"
                              placeholder="Mobile number"
                              value={registerPhone}
                              onChange={registerphoneChangeHandler}
                              onBlur={registerphoneOnBlurHandler}
                              disabled={verifyOtp ? true : false}
                              className={
                                !registerphoneValild
                                  ? "InvalidPhoneInput loginPhoneInput"
                                  : "loginPhoneInput"
                              }
                            />
                          </div>
                        </div>

                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20">
                            <button
                              type="button"
                              className="btn btn-theme-colored text-uppercase btn-block"
                              onClick={handleSendOtp}
                              disabled={
                                disablePhone || verifyOtp ? true : false
                              }
                            >
                              Send OTP
                              {otpSend && (
                                <span className="font-weight-bold "> ✓ </span>
                              )}
                            </button>
                            {/* {showTimer && (
                              <span className="ml-100">
                                {minutes}:{seconds} sec
                              </span>
                            )} */}
                            {/* {timer && <span>{seconds}</span>} */}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20">
                            <ReCAPTCHA
                              onChange={handleCaptcha}
                              ref={recaptchaRef}
                              //This ref can be used to call captcha related functions in case you need.
                              // sitekey="6Lcp2Q8hAAAAAHPYgFNOhLkORwaEzONE22eSl3z3"
                              sitekey="6LewnBAhAAAAAIzftXHC0DvJELrZB74qiaAB-nwm"
                              theme="light"
                            />
                          </div>
                        </div>
                      </div>

                      {custError && (
                        <p className="text-danger mt-0 mb-4 ml-2">
                          {custError}
                        </p>
                      )}
                      {showOTPForm && (
                        <div className="row">
                          <div className="col-sm-5 col-md-6">
                            <div className="form-group mb-20">
                              <input
                                name="phone"
                                className="custom-form-control"
                                type="number"
                                required
                                placeholder="Enter OTP"
                                aria-required="true"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                disabled={verifyOtp ? true : false}
                              />
                            </div>
                          </div>
                          <div className="col-sm-5 col-md-6">
                            <div className="form-group mb-20">
                              <button
                                type="button"
                                className="btn btn-theme-colored text-uppercase btn-block"
                                onClick={handleVerifyOtp}
                                disabled={
                                  !showOTPForm || verifyOtp ? true : false
                                }
                              >
                                Verify OTP
                                {otpVerify && (
                                  <span className="font-weight-bold "> ✓ </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* {CarerRegister?.error &&
 typeof CarerRegister?.error === "string" &&
 CarerRegister?.error == "Invalid OTP" && (
 <p className="text-danger mt-0 mb-4 ml-2">
 {CarerRegister?.error}
 </p>
 )} */}
                      <div className="row">
                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20 ">
                            <input
                              name="form_name"
                              className="custom-form-control "
                              type="text"
                              placeholder="Enter First Name"
                              value={firstName}
                              onChange={(e) => setfirstName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20">
                            <input
                              name="form_name"
                              className="custom-form-control"
                              type="text"
                              placeholder="Enter Last Name"
                              aria-required="true"
                              value={lastName}
                              onChange={(e) => setlastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20">
                            <input
                              name="form_email"
                              className="custom-form-control required email"
                              type="text"
                              placeholder="Enter Email"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20">
                            <input
                              name="form_date"
                              className="custom-form-control required datetime-picker"
                              type="password"
                              placeholder="Password"
                              aria-required="true"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordChange(true);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20">
                            <input
                              name="form_repassword"
                              className="custom-form-control required datetime-picker"
                              type="password"
                              placeholder="Retype Password"
                              aria-required="true"
                              value={repassword}
                              onChange={(e) => {
                                setRePassword(e.target.value);
                                setPasswordChange(true);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-5 col-md-6">
                          <div className="form-group mb-20">
                            <div className="styled-select">
                              <select
                                id="booking_service"
                                name="booking_service"
                                className="custom-form-control"
                                required
                                value={businessType}
                                onChange={(e) =>
                                  setBusinessType(e.target.value)
                                }
                              >
                                {CarerDetails?.carers?.result?.length &&
                                  CarerDetails?.carers?.result?.map((carer) => (
                                    <option value={carer?.id}>
                                      {`${carer?.display_name
                                        ?.slice(0, 1)
                                        ?.toUpperCase()}${carer?.display_name?.slice(
                                        1
                                      )}`}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      {CarerRegister?.error &&
                        typeof CarerRegister?.error === "string" &&
                        (CarerRegister?.error !=
                          "An account already exists with this phone number" ||
                          CarerRegister?.error != "Invalid OTP") && (
                          <p className="text-danger mt-0 mb-4 ml-2">
                            {CarerRegister?.error}
                          </p>
                        )}

                      {emailError && (
                        <p className="text-danger mt-0 mb-4 ml-2">
                          {emailError}
                        </p>
                      )}

                      {passwordChange ? (
                        <div className="d-flex">
                          {sixCharacter ? (
                            <i
                              className="fa fa-check mr-1"
                              style={{ fontSize: "16px", color: "green" }}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-close mr-1"
                              style={{ fontSize: "16px", color: "red" }}
                            ></i>
                          )}
                          <p>
                            Need at least one number,special character and total
                            of six characters{" "}
                          </p>
                        </div>
                      ) : null}

                      <div className="form-group mb-0 mt-20">
                        <button
                          type="submit"
                          className=" btn btn-dark btn-theme-colored text-uppercase custom-btn btn-block"
                          disabled={disableRegister ? true : false}
                        >
                          Create Account
                        </button>
                        <p className="mt-3 ml-1 text-muted">
                          By clicking you agree to our{" "}
                          <a href="#">Terms & Conditions</a>
                        </p>
                        <h5 className="mt-4">
                          Already have an account?{" "}
                          <a href="/carer/login" className="text-info">
                            Login
                          </a>
                        </h5>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 cust-col-md-offset-1">
              <div className="p-70">
                <div className="row">
                  <div
                    className=" col-xs-12 col-sm-5 col-md-6 col-lg-6 mb-md-50 text-white mb-50
 "
                  >
                    <div className="funfact text-center">
                      <div className="funfact-content">
                        <div className="funfact-icon">
                          <i className="flaticon-pet-man font-100" />
                        </div>

                        <h4 className="text-uppercase text-white">
                          Service Provider
                        </h4>
                        {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xs-12 col-sm-5 col-md-6 col-lg-6 mb-md-50 text-white mb-100
 "
                  >
                    <div className="funfact text-center">
                      <div className="funfact-content">
                        <div className="funfact-icon">
                          <i className="flaticon-pet-veterinarian-hospital font-100" />
                        </div>

                        <h4 className="text-uppercase text-white">Clinic</h4>
                        {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className=" col-xs-12 col-sm-5 col-md-6 col-lg-6 mb-md-50 text-white mb-20
 "
                  >
                    <div className="funfact text-center">
                      <div className="funfact-content">
                        <div className="funfact-icon">
                          <i className="flaticon-pet-shopping-cart-with-product-inside font-100" />
                        </div>

                        <h4 className="text-uppercase text-white">Store</h4>
                        {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className=" col-xs-12 col-sm-5 col-md-6 col-lg-6 mb-md-50 text-white mb-20
 "
                  >
                    <div className="funfact text-center">
                      <div className="funfact-content">
                        <div className="funfact-icon">
                          <i className="flaticon-pet-feeding-the-dog  font-100" />
                        </div>

                        <h4 className="text-uppercase text-white">Carer</h4>
                        {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <SuccessConfirmationAlert
        modal_center={modal}
        setmodal_center={setModal}
        content="Account created successfully"
        toggle={toggle}
        okHandleClick={() => history.push("/carer/login")}
        okHandle
      />
    </>
  );
};

export default CarerRegister;
