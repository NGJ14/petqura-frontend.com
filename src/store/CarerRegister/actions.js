import {
  INITIATE_REGISTER_CARER,
  INITIATE_REGISTER_CARER_BEGIN,
  INITIATE_REGISTER_CARER_SUCCESS,
  INITIATE_REGISTER_CARER_FAIL,
  REGISTER_CARER,
  REGISTER_CARER_BEGIN,
  REGISTER_CARER_SUCCESS,
  REGISTER_CARER_FAIL,
  SEND_CARER_OTP,
  SEND_CARER_OTP_BEGIN,
  SEND_CARER_OTP_FAIL,
  SEND_CARER_OTP_SUCCESS,
  VERIFY_CARER_OTP,
  VERIFY_CARER_OTP_BEGIN,
  VERIFY_CARER_OTP_FAIL,
  VERIFY_CARER_OTP_SUCCESS,
} from "./actionTypes";

export const initiateregisterCarer = ({ user, toggle, callback }) => ({
  type: INITIATE_REGISTER_CARER,
  user: user,
  toggle: toggle,
  callback: callback,
});

export const initiateregisterCarerBegin = () => ({
  type: INITIATE_REGISTER_CARER_BEGIN,
});

export const initiateregisterCarerSuccess = () => ({
  type: INITIATE_REGISTER_CARER_SUCCESS,
});

export const initiateregisterCarerFail = (error) => ({
  type: INITIATE_REGISTER_CARER_FAIL,
  payload: error,
});

export const registerCarer = ({ user, toggle, callback }) => ({
  type: REGISTER_CARER,
  user: user,
  toggle: toggle,
  callback: callback,
});

export const registerCarerBegin = () => ({
  type: REGISTER_CARER_BEGIN,
});

export const registerCarerSuccess = () => ({
  type: REGISTER_CARER_SUCCESS,
});

export const registerCarerFail = (error) => ({
  type: REGISTER_CARER_FAIL,
  payload: error,
});

export const verifyCarerOtp = ({ data, callback }) => ({
  type: VERIFY_CARER_OTP,
  data: data,
  callback: callback,
});

export const verifyCarerOtpBegin = () => ({
  type: VERIFY_CARER_OTP_BEGIN,
});

export const verifyCarerOtpSuccess = (language) => ({
  type: VERIFY_CARER_OTP_SUCCESS,
  payload: language,
});

export const verifyCarerOtpFail = (error) => ({
  type: VERIFY_CARER_OTP_FAIL,
  payload: error,
});

export const sendCarerOtp = ({ data, callback }) => ({
  type: SEND_CARER_OTP,
  data: data,
  callback: callback,
});

export const sendCarerOtpBegin = () => ({
  type: SEND_CARER_OTP_BEGIN,
});

export const sendCarerOtpSuccess = (language) => ({
  type: SEND_CARER_OTP_SUCCESS,
  payload: language,
});

export const sendCarerOtpFail = (error) => ({
  type: SEND_CARER_OTP_FAIL,
  payload: error,
});
