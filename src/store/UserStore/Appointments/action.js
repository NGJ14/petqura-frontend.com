import {
  ACCEPT_RESCHEDULE_STATUS,
  ACCEPT_RESCHEDULE_STATUS_BEGIN,
  ACCEPT_RESCHEDULE_STATUS_FAIL,
  ACCEPT_RESCHEDULE_STATUS_SUCCESS,
  GET_APPOINTMENT_BY_ID,
  GET_APPOINTMENT_BY_ID_BEGIN,
  GET_APPOINTMENT_BY_ID_FAIL,
  GET_APPOINTMENT_BY_ID_SUCCESS,
  GET_APPOINTMENT_DETAILS,
  GET_APPOINTMENT_DETAILS_BEGIN,
  GET_APPOINTMENT_DETAILS_FAIL,
  GET_APPOINTMENT_DETAILS_SUCCESS,
  REJECT_RESCHEDULE_STATUS,
  REJECT_RESCHEDULE_STATUS_FAIL,
  REJECT_RESCHEDULE_STATUS_BEGIN,
  REJECT_RESCHEDULE_STATUS_SUCCESS,
} from "./actionType";

export const getAppointmentDetails = ({ data }) => ({
  type: GET_APPOINTMENT_DETAILS,
  data: data,
});

export const getAppointmentDetailsBegin = () => ({
  type: GET_APPOINTMENT_DETAILS_BEGIN,
});

export const getAppointmentDetailsSuccess = (address) => ({
  type: GET_APPOINTMENT_DETAILS_SUCCESS,
  payload: address,
});

export const getAppointmentDetailsFail = (error) => ({
  type: GET_APPOINTMENT_DETAILS_FAIL,
  payload: error,
});

export const getAppointmentById = ({ data }) => ({
  type: GET_APPOINTMENT_BY_ID,
  data: data,
});

export const getAppointmentByIdBegin = () => ({
  type: GET_APPOINTMENT_BY_ID_BEGIN,
});

export const getAppointmentByIdSuccess = (address) => ({
  type: GET_APPOINTMENT_BY_ID_SUCCESS,
  payload: address,
});

export const getAppointmentByIdFail = (error) => ({
  type: GET_APPOINTMENT_BY_ID_FAIL,
  payload: error,
});

export const acceptRescheduleStatus = ({ id, callback }) => ({
  type: ACCEPT_RESCHEDULE_STATUS,
  id: id,
  callback: callback,
});

export const acceptRescheduleStatusBegin = () => ({
  type: ACCEPT_RESCHEDULE_STATUS_BEGIN,
});

export const acceptRescheduleStatusSuccess = () => ({
  type: ACCEPT_RESCHEDULE_STATUS_SUCCESS,
});

export const acceptRescheduleStatusFail = (error) => ({
  type: ACCEPT_RESCHEDULE_STATUS_FAIL,
  payload: error,
});

export const rejectRescheduleStatus = ({ id, callback }) => ({
  type: REJECT_RESCHEDULE_STATUS,
  id: id,
  callback: callback,
});

export const rejectRescheduleStatusBegin = () => ({
  type: REJECT_RESCHEDULE_STATUS_BEGIN,
});

export const rejectRescheduleStatusSuccess = () => ({
  type: REJECT_RESCHEDULE_STATUS_SUCCESS,
});

export const rejectRescheduleStatusFail = (error) => ({
  type: REJECT_RESCHEDULE_STATUS_FAIL,
  payload: error,
});
