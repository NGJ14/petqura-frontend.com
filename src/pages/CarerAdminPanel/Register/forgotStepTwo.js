import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotVerifyOtp,
  resetErrors,
} from "../../../store/UserStore/Login/action";
import { UncontrolledAlert } from "reactstrap";
const submitFormData = () => {
  console.log("Hi");
};

const handleVerifyOtp = (e) => {
  e.preventDefault();
};
const StepTwo = ({ nextStep, haldleFormDataVal, prevStep, values, toggle }) => {
  let [showOTPForm, setShowOTPForm] = useState(false);
  let [otp, setOtp] = useState();
  let [custError, setCustError] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const [showTimer, setshowTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);
  let [verifyOtp, setVerifyOtp] = useState(false);
  const dispatch = useDispatch();
  const Login = useSelector((state) => state.Login);
  const { phone } = values;
  useEffect(() => {
    if (otp?.length == 6) {
      setShowOTPForm(true);
    } else {
      setShowOTPForm(false);
    }
  }, [otp]);

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // haldleFormDataVal("phone", value);
    dispatch(
      forgotVerifyOtp({
        data: { phone: phone, otp: otp, user_type: "pet_carer" },

        callback: () => {
          // setShowOTPForm(false);
          // setOtpVerify(true);
          // setshowTimer(false);
          // setMinutes(2);
          // setSeconds(0);
          nextStep();
        },
        toggle: () => toggle(),
      })
    );
  };

  return (
    <>
      <form onSubmit={submitFormData} className="">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-1 ml-1 text-muted">
              Step 2. Verify your mobile number
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="form-group mb-20">
              <input
                name="phone"
                className="form-control forgot-password-form-input"
                type="number"
                required
                placeholder="Enter OTP"
                aria-required="true"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
        </div>
        {(Login?.error || Login?.success) && (
          <p className={Login?.error ? "text-danger" : "text-success"}>
            {Login?.error || Login?.success}
          </p>
        )}
        {custError && <p className="text-danger mt-0 mb-4 ">{custError}</p>}
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="form-group mb-20">
              <button className="btn btn-theme-colored" onClick={prevStep}>
                Back
              </button>
              <button
                type="button"
                className="btn btn-theme-colored"
                onClick={handleVerifyOtp}
                disabled={!showOTPForm ? true : false}
              >
                Verify OTP
                {otpVerify && <span className="font-weight-bold "> ✓ </span>}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default StepTwo;
