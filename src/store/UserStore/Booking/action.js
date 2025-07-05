import {
  GET_APPOINTMENT_PAYMENT_SESSION,
  GET_APPOINTMENT_PAYMENT_SESSION_BEGIN,
  GET_APPOINTMENT_PAYMENT_SESSION_SUCCESS,
  GET_APPOINTMENT_PAYMENT_SESSION_FAIL,
} from "./actionType";

export const getAppointmentPaymentSession = ({ data, callback }) => ({
  type: GET_APPOINTMENT_PAYMENT_SESSION,
  data,
  callback,
});

export const getAppointmentPaymentSessionBegin = () => ({
  type: GET_APPOINTMENT_PAYMENT_SESSION_BEGIN,
});

export const getAppointmentPaymentSessionSuccess = (sessionId) => ({
  type: GET_APPOINTMENT_PAYMENT_SESSION_SUCCESS,
  payload: sessionId,
});

export const getAppointmentPaymentSessionFail = (error) => ({
  type: GET_APPOINTMENT_PAYMENT_SESSION_FAIL,
  payload: error,
});
