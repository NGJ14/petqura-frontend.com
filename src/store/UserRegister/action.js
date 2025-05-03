import {
  REGISTER_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  VERIFY_OTP,
  VERIFY_OTP_BEGIN,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_SUCCESS,
  RESET_USER_REGISTER_ERRORS,
} from "./actionTypes";

export const registerUser = ({ user, callback }) => ({
  type: REGISTER_USER,
  user: user,
  callback: callback,
});

export const registerUserBegin = () => ({
  type: REGISTER_USER_BEGIN,
});

export const registerUserSuccess = (language) => ({
  type: REGISTER_USER_SUCCESS,
  payload: language,
});

export const registerUserFail = (error) => ({
  type: REGISTER_USER_FAIL,
  payload: error,
});

export const verifyOtp = ({ data, callback }) => ({
  type: VERIFY_OTP,
  data: data,
  callback: callback,
});

export const verifyOtpBegin = () => ({
  type: VERIFY_OTP_BEGIN,
});

export const verifyOtpSuccess = (language) => ({
  type: VERIFY_OTP_SUCCESS,
  payload: language,
});

export const verifyOtpFail = (error) => ({
  type: VERIFY_OTP_FAIL,
  payload: error,
});

export const resetUserRegisterErrors = () => ({
  type: RESET_USER_REGISTER_ERRORS,
});
