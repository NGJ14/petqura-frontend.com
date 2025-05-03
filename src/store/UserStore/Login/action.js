import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_BEGIN,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  FORGOT_VERIFY_OTP,
  FORGOT_VERIFY_OTP_BEGIN,
  FORGOT_VERIFY_OTP_FAIL,
  FORGOT_VERIFY_OTP_SUCCESS,
  FORGOT_VERIFY_PASSWORD,
  FORGOT_VERIFY_PASSWORD_BEGIN,
  FORGOT_VERIFY_PASSWORD_SUCCESS,
  FORGOT_VERIFY_PASSWORD_FAIL,
  RESET_ERRORS,
} from "./actionTypes";

export const loginUser = ({ user, callback, productLogin, cart }) => ({
  type: LOGIN_USER,
  user: user,
  callback: callback,
  productLogin: productLogin,
  cart: cart,
});

export const loginUserBegin = () => ({
  type: LOGIN_USER_BEGIN,
});

export const loginUserSuccess = (language) => ({
  type: LOGIN_USER_SUCCESS,
  payload: language,
});

export const loginUserFail = (error) => ({
  type: LOGIN_USER_FAIL,
  payload: error,
});

export const forgotPassword = ({ data, callback }) => ({
  type: FORGOT_PASSWORD,
  data: data,
  callback: callback,
});

export const forgotPasswordBegin = () => ({
  type: FORGOT_PASSWORD_BEGIN,
});

export const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: data,
});

export const forgotPasswordFail = (error) => ({
  type: FORGOT_PASSWORD_FAIL,
  payload: error,
});

export const logoutUser = ({ data, callback }) => ({
  type: LOGOUT_USER,
  data: data,
  callback: callback,
});

export const forgotVerifyOtp = ({ data, callback }) => ({
  type: FORGOT_VERIFY_OTP,
  data: data,
  callback: callback,
});

export const forgotVerifyOtpBegin = () => ({
  type: FORGOT_VERIFY_OTP_BEGIN,
});

export const forgotVerifyOtpSuccess = (language) => ({
  type: FORGOT_VERIFY_OTP_SUCCESS,
  payload: language,
});

export const forgotVerifyOtpFail = (error) => ({
  type: FORGOT_VERIFY_OTP_FAIL,
  payload: error,
});

export const forgotVerifyPassword = ({ data, callback }) => ({
  type: FORGOT_VERIFY_PASSWORD,
  data: data,
  callback: callback,
});

export const forgotVerifyPasswordBegin = () => ({
  type: FORGOT_VERIFY_PASSWORD_BEGIN,
});

export const forgotVerifyPasswordSuccess = (language) => ({
  type: FORGOT_VERIFY_PASSWORD_SUCCESS,
  payload: language,
});

export const forgotVerifyPasswordFail = (error) => ({
  type: FORGOT_VERIFY_PASSWORD_FAIL,
  payload: error,
});

export const resetErrors = () => ({
  type: RESET_ERRORS,
});
