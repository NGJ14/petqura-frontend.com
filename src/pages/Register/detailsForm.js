import React from "react";
import { useHistory } from "react-router";

const DetailsForm = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/otp-verification");
  };
  return (
    <div>
      <div id="login-box">
        <h1>Sign up</h1>
        <input type="text" name="username" placeholder="Username" />
        <input type="text" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Password" />
        <input type="password" name="password2" placeholder="Retype password" />
        <button
          name="signup_submit"
          className="signup_btn"
          onClick={handleClick}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default DetailsForm;
