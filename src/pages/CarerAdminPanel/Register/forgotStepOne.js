import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import {
  forgotPassword,
  resetErrors,
} from "../../../store/UserStore/Login/action";
const StepOne = ({ nextStep, haldleFormDataVal, values }) => {
  let [registerPhone, setRegisterPhone] = useState("");
  let [registerphoneValild, setRegisterphoneValid] = useState(true);
  let [custError, setCustError] = useState("");
  let [recaptcha_response, setRecaptcha_response] = useState("");
  const Login = useSelector((state) => state.Login);
  let [captcha, setCaptcha] = useState(false);
  const recaptchaRef = React.createRef();
  const dispatch = useDispatch();

  let { phone } = values;
  const registerphoneChangeHandler = (value) => {
    haldleFormDataVal("phone", value);
    if (value) {
      setRegisterPhone(value);
      if (isValidPhoneNumber(value)) {
        setRegisterphoneValid(true);
      }
    }
  };
  const registerphoneOnBlurHandler = (event) => {
    console.log(registerPhone);
    if (!isValidPhoneNumber(registerPhone)) {
      setRegisterphoneValid(false);
    }
    console.log(registerphoneValild);
  };
  const handleCaptcha = (key) => {
    setCaptcha(true);
    setRecaptcha_response(key);
  };

  const handleValidSubmit = (event) => {
    event.preventDefault();
    setCustError("");

    if (!isValidPhoneNumber(registerPhone)) {
      return setCustError("Invalid Mobile number");
    }
    if (!captcha) {
      return setCustError("Please verify captcha");
    } else {
      dispatch(
        forgotPassword({
          data: {
            phone: registerPhone,
            "g-recaptcha-response": recaptcha_response,
            user_type: "pet_carer",
          },
          callback: () => {
            nextStep();
          },
        })
      );
    }
  };
  return (
    <>
      <form onSubmit={haldleFormDataVal} className="">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-1 ml-1 text-muted">
              Step 1. Enter your Mobile Number
            </h5>
          </div>
        </div>
        <div className="form-group mb-20">
          <PhoneInput
            international={false}
            addInternationalOption={false}
            id="phone"
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
        <div className="form-group mb-20">
          <ReCAPTCHA
            onChange={handleCaptcha}
            ref={recaptchaRef}
            // sitekey="6Lcp2Q8hAAAAAHPYgFNOhLkORwaEzONE22eSl3z3"
            sitekey="6LewnBAhAAAAAIzftXHC0DvJELrZB74qiaAB-nwm"
            theme="light"
          />
        </div>
        {custError && <p className="text-danger mt-0 mb-4 ">{custError}</p>}
        {(Login?.error || Login?.success) && (
          <p className={Login?.error ? "text-danger" : "text-success"}>
            {Login?.error || Login?.success}
          </p>
        )}
        <div className="form-group mb-0 mt-10 ml-2">
          <input
            id="form_botcheck"
            name="form_botcheck"
            className="form-control"
            type="hidden"
            defaultValue
          />

          <button
            type="submit"
            className="
              btn btn-dark btn-theme-colored
              text-uppercase"
            data-loading-text="Please wait..."
            onClick={handleValidSubmit}
          >
            SUBMIT
          </button>
          <h5 className="mt-4">
            New to PawWalker?{" "}
            <a
              href="/carer/register"
              className="text-info"
              style={{ cursor: "pointer" }}
            >
              Sign Up
            </a>
          </h5>
        </div>
      </form>
    </>
  );
};
export default StepOne;
