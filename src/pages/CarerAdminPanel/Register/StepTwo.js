import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerCarer,
  verifyCarerOtp,
} from "../../../store/CarerRegister/actions";

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

  const { firstName, lastName, phone, userName, businessType, password } =
    values;

  useEffect(() => {
    if (otp?.length == 6) {
      setShowOTPForm(true);
    } else {
      setShowOTPForm(false);
    }
  }, [otp]);

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(
      verifyCarerOtp({
        data: { phone: phone, otp: otp },
        callback: () => {
          setVerifyOtp(true);
          setShowOTPForm(false);
          setOtpVerify(true);
          setshowTimer(false);
          setMinutes(2);
          setSeconds(0);
          dispatch(
            registerCarer({
              user: {
                first_name: firstName,
                last_name: lastName,
                email: userName,
                phone: phone,
                carer_type_id: businessType,
                password: password,
              },
              toggle: () => toggle(),
            })
          );
        },
      })
    );
  };

  const submitFormData = () => {
    console.log("Hi");
  };

  return (
    <form onSubmit={submitFormData}>
      <div className="row">
        <div className="col-md-12">
          <h5 className="mt-1 ml-1 text-muted">Step 2. Verify Mobile Number</h5>
        </div>
        <div className="col-sm-6 col-md-6">
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
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-6">
          <div className="form-group mb-20">
            <button className="btn btn-theme-colored" onClick={prevStep}>
              Back
            </button>
            <button
              type="button"
              className="btn btn-theme-colored"
              onClick={handleVerifyOtp}
              disabled={!showOTPForm || verifyOtp ? true : false}
            >
              Verify OTP
              {otpVerify && <span className="font-weight-bold "> ✓ </span>}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StepTwo;
