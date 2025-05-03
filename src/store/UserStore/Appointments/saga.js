import { call, put, takeLatest } from "redux-saga/effects";
import { get, add } from "../../../helpers/api_helpers";
import {
  getAppointmentByIdBegin,
  getAppointmentByIdSuccess,
  getAppointmentByIdFail,
  getAppointmentDetailsBegin,
  getAppointmentDetailsSuccess,
  getAppointmentDetailsFail,
  acceptRescheduleStatusBegin,
  rejectRescheduleStatusBegin,
  rejectRescheduleStatusSuccess,
  rejectRescheduleStatusFail,
  acceptRescheduleStatusFail,
  acceptRescheduleStatusSuccess,
} from "./action";
import {
  ACCEPT_RESCHEDULE_STATUS,
  GET_APPOINTMENT_BY_ID,
  GET_APPOINTMENT_DETAILS,
  REJECT_RESCHEDULE_STATUS,
} from "./actionType";

function* getAppointmentDetails({ data }) {
  try {
    yield put(getAppointmentDetailsBegin());
    const response = yield call(get, "/user_appointments", data);
    if (response) {
      yield put(getAppointmentDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getAppointmentDetailsFail(error));
  }
}

function* getAppointmentById({ data }) {
  try {
    yield put(getAppointmentByIdBegin());
    const response = yield call(get, `/appointments_details`, data);
    if (response) {
      yield put(getAppointmentByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getAppointmentByIdFail(error));
  }
}

function* acceptRescheduleStatus({ id, callback }) {
  try {
    yield put(acceptRescheduleStatusBegin());
    const response = yield call(add, "/accept_reschedule", id);
    if (response) {
      yield put(acceptRescheduleStatusSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(acceptRescheduleStatusFail(error));
  }
}

function* rejectRescheduleStatus({ id, callback }) {
  try {
    yield put(rejectRescheduleStatusBegin());
    const response = yield call(add, "/reject_reschedule", id);
    if (response) {
      yield put(rejectRescheduleStatusSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(rejectRescheduleStatusFail(error));
  }
}

function* AppointmentSaga() {
  yield takeLatest(GET_APPOINTMENT_DETAILS, getAppointmentDetails);
  yield takeLatest(GET_APPOINTMENT_BY_ID, getAppointmentById);
  yield takeLatest(ACCEPT_RESCHEDULE_STATUS, acceptRescheduleStatus);
  yield takeLatest(REJECT_RESCHEDULE_STATUS, rejectRescheduleStatus);
}

export default AppointmentSaga;
