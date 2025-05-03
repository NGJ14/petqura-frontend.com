import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotVerifyOtp,
  resetErrors,
} from "../../../store/UserStore/Login/action";
const submitFormData = () => {
  console.log("Hi");
};

const handleVerifyOtp = (e) => {
  e.preventDefault();
};
const StepFour = ({
  nextStep,
  haldleFormDataVal,
  prevStep,
  values,
  toggle,
}) => {
  return (
    <>
      <form onSubmit={submitFormData} className="">
        <div className="row">
          <div className="col-md-12">
            <h4 className="mt-0 line-height-1 mb-40 ">
              <span className="ml-0">
                <span className="orange-font ml-0">Congratulations !!</span> You
                have successfully set your new Password
              </span>
            </h4>
          </div>
        </div>
      </form>
    </>
  );
};
export default StepFour;
