import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotVerifyPassword,
  resetErrors,
} from "../../../store/UserStore/Login/action";
import { UncontrolledAlert } from "reactstrap";
const submitFormData = () => {
  console.log("Hi");
};

const handleVerifyOtp = (e) => {
  e.preventDefault();
};
const StepThree = ({
  nextStep,
  haldleFormDataVal,
  prevStep,
  values,
  toggle,
}) => {
  let [newpassword, setNewpassword] = useState();
  let [confirmNewpassword, setConfirmnewpassword] = useState("");
  let [custError, setCustError] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showTimer, setshowTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);
  let [verifyOtp, setVerifyOtp] = useState(false);
  const dispatch = useDispatch();
  const { phone } = values;
  const Login = useSelector((state) => state.Login);

  const handlesetNewPassword = (e) => {
    e.preventDefault();
    if (newpassword != confirmNewpassword) {
      return setCustError("The Password confirmation does not match");
    } else {
      dispatch(
        forgotVerifyPassword({
          data: {
            phone: phone,
            new_password: newpassword,
            user_type: "pet_carer",
          },

          callback: () => {
            nextStep();
          },
          toggle: () => toggle(),
        })
      );
    }
  };

  return (
    <>
      <form onSubmit={submitFormData} className="">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-1 ml-1 text-muted">
              Step 3. Create New Password
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="form-group mb-20">
              <input
                name="newPassword"
                className="form-control forgot-password-form-input"
                type="password"
                required
                placeholder="Enter New Password"
                aria-required="true"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="form-group mb-20">
              <input
                name="confirmNewPassword"
                className="form-control forgot-password-form-input"
                type="text"
                required
                placeholder="Confirm New Password"
                aria-required="true"
                value={confirmNewpassword}
                onChange={(e) => setConfirmnewpassword(e.target.value)}
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
                onClick={handlesetNewPassword}
              >
                Submit
                {passwordVerified && (
                  <span className="font-weight-bold "> ✓ </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default StepThree;
