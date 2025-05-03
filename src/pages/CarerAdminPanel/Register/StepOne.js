import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import {
  checkIfValidEmail,
  getLocalStorage,
  checkIfValidPasswordWithSpecialCharacters,
  checkIfValidPasswordWithNumbers,
} from "../../../helpers/utils";

import { initiateregisterCarer } from "../../../store/CarerRegister/actions";

import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { UncontrolledAlert } from "reactstrap";

const StepOne = ({ nextStep, haldleFormDataVal, values }) => {
  const CarerDetails = useSelector((state) => state.Carer);

  //creating error state for validation
  let [showPwd, setShowPwd] = useState(false);
  let [showRePwd, setShowRePwd] = useState(false);
  const showPasswordClass = "fa fa-eye-slash";
  const hidePasswordClass = "fa fa-eye";
  let [repassword, setRePassword] = useState();
  const [passwordChange, setPasswordChange] = useState(false);
  let [disableRegister, setDisableRegister] = useState(true);
  let [business_type, setBusinessType] = useState();
  const [sixCharacter, setSixCharacter] = useState(false);
  let [recaptcha_response, setRecaptcha_response] = useState("");
  let [captcha, setCaptcha] = useState(false);
  const recaptchaRef = React.createRef();
  let [emailError, setEmailError] = useState("");
  let [custError, setCustError] = useState("");
  let [registerPhone, setRegisterPhone] = useState("");
  let [registerphoneValild, setRegisterphoneValid] = useState(true);
  const [otpSend, setOtpSend] = useState(false);
  const [showTimer, setshowTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  const dispatch = useDispatch();

  let { firstName, lastName, userName, password, businessType, phone } = values;

  useEffect(() => {
    setDisableRegister(true);
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !password ||
      !repassword ||
      !registerPhone ||
      !captcha ||
      password != repassword ||
      !sixCharacter
    ) {
      setDisableRegister(true);
    } else {
      setDisableRegister(false);
    }
  }, [
    firstName,
    lastName,
    userName,
    password,
    repassword,
    registerPhone,
    captcha,
  ]);

  const handleCaptcha = (key) => {
    setCaptcha(true);
    setRecaptcha_response(key);
  };

  const changeHandle = (e) => {
    haldleFormDataVal(e.target.name, e.target.value);
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

  const registerphoneChangeHandler = (value) => {
    haldleFormDataVal("phone", value);
    if (value) {
      setRegisterPhone(value);
      if (isValidPhoneNumber(value)) {
        setRegisterphoneValid(true);
      }
    }
  };
  const registerphoneOnBlurHandler = () => {
    console.log(registerPhone);
    if (!isValidPhoneNumber(registerPhone)) {
      setRegisterphoneValid(false);
    }
    console.log(registerphoneValild);
  };

  const handleValidSubmit = (event) => {
    event.preventDefault();
    setCustError("");
    if (!isValidPhoneNumber(registerPhone)) {
      return setCustError("Invalid Mobile number");
    }
    if (checkIfValidEmail(userName)) {
      setEmailError("");
      dispatch(
        initiateregisterCarer({
          user: {
            first_name: firstName,
            last_name: lastName,
            email: userName,
            carer_type_id: businessType,
            password: password,
            phone: registerPhone,
            "g-recaptcha-response": recaptcha_response,
          },
          callback: () => {
            nextStep();
          },
        })
      );
    } else {
      setEmailError("Invalid Email ID");
    }
  };
  useEffect(() => {
    CarerDetails?.carerInitial && setBusinessType(CarerDetails?.carerInitial);
    haldleFormDataVal("businessType", CarerDetails?.carerInitial);
  }, [CarerDetails?.carerInitial]);

  return (
    <form onSubmit={handleValidSubmit} className="form-transparent mt-20">
      {custError && <p className="text-danger mt-0 mb-4 ml-2">{custError}</p>}
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
      <div className="row">
        <div className="col-md-12">
          <h5 className="mt-1 ml-1 text-muted">
            Step 1. Enter Personnal Details
          </h5>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="form-group mb-20 ">
            <input
              name="firstName"
              className="custom-form-control "
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={changeHandle}
            />
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="form-group mb-20">
            <input
              name="lastName"
              className="custom-form-control"
              type="text"
              placeholder="Enter Last Name"
              aria-required="true"
              value={lastName}
              onChange={changeHandle}
            />
          </div>
        </div>

        <div className="col-sm-6 col-md-12">
          <div className="form-group mb-20">
            <input
              name="userName"
              className="custom-form-control required email"
              type="text"
              placeholder="Enter Email"
              value={userName}
              onChange={changeHandle}
            />
          </div>
        </div>

        <div className="col-sm-6 col-md-6">
          <div className="form-group mb-20 cust-login-fieldWrapper">
            <input
              name="password"
              className="custom-form-control required datetime-picker"
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              aria-required="true"
              value={password}
              onChange={changeHandle}
            />
            <div
              className="cust-pwd-eye"
              onClick={() => setShowPwd(!showPwd)}
              data-testid="component-login-passwordMask"
            >
              <i
                className={showPwd ? hidePasswordClass : showPasswordClass}
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="form-group mb-20 cust-login-fieldWrapper">
            <input
              name="form_repassword"
              className="custom-form-control required datetime-picker"
              type={showRePwd ? "text" : "password"}
              placeholder="Retype Password"
              aria-required="true"
              value={repassword}
              onChange={(e) => {
                setRePassword(e.target.value);
                setPasswordChange(true);
              }}
            />
            <div
              className="cust-pwd-eye"
              onClick={() => setShowRePwd(!showRePwd)}
              data-testid="component-login-passwordMask"
            >
              <i
                className={showRePwd ? hidePasswordClass : showPasswordClass}
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="form-group mb-20">
            <div className="styled-select">
              <select
                id="booking_service"
                name="businessType"
                className="custom-form-control"
                required
                value={businessType}
                onChange={changeHandle}
                // onChange={handleFormData("businessType")}
              >
                {CarerDetails?.carers?.result?.length &&
                  CarerDetails?.carers?.result?.map((carer) => (
                    <option value={carer?.id}>
                      {`${carer?.display_name
                        ?.slice(0, 1)
                        ?.toUpperCase()}${carer?.display_name?.slice(1)}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
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
              name="phone"
              defaultCountry="IN"
              placeholder="Mobile number"
              value={phone}
              onChange={registerphoneChangeHandler}
              onBlur={registerphoneOnBlurHandler}
              className={
                !registerphoneValild
                  ? "InvalidPhoneInput loginPhoneInput"
                  : "loginPhoneInput"
              }
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div className="col-sm-6 col-md-6">
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
        </div>
        <div className="col-md-12">
          <button
            type="button"
            onClick={handleValidSubmit}
            className=" btn btn-dark btn-theme-colored text-uppercase custom-btn btn-block"
            disabled={disableRegister ? true : false}
          >
            Next
          </button>
          <p className="mt-3 ml-1 text-muted">
            By clicking you agree to our{" "}
            <a href="/terms-of-service">Terms & Conditions</a>
          </p>
        </div>
      </div>
      {emailError && <p className="text-danger mt-0 mb-4 ml-2">{emailError}</p>}

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
            Need at least one number,special character and total of six
            characters{" "}
          </p>
        </div>
      ) : null}
    </form>
  );
};
export default StepOne;
