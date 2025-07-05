import { call, put, takeLatest } from "redux-saga/effects";
import { add } from "../../../helpers/api_helpers";
import {
  getAppointmentPaymentSessionBegin,
  getAppointmentPaymentSessionSuccess,
  getAppointmentPaymentSessionFail,
} from "./action";
import { GET_APPOINTMENT_PAYMENT_SESSION } from "./actionType";

function* getAppointmentPaymentSession({ data, callback }) {
  try {
    yield put(getAppointmentPaymentSessionBegin());

    // 🔗 Call backend to create a Cashfree appointment order
    const response = yield call(add, "/cashfree/book-appointment", data);

    if (response?.response?.payment_session_id) {
      const sessionId = response.response.payment_session_id;

      yield put(getAppointmentPaymentSessionSuccess(sessionId));

      if (callback) callback(sessionId);
    } else {
      throw new Error("Missing session ID in response");
    }
  } catch (error) {
    console.error("Appointment payment session error:", error);
    yield put(getAppointmentPaymentSessionFail(error));
  }
}

function* AppointmentSaga() {
  yield takeLatest(GET_APPOINTMENT_PAYMENT_SESSION, getAppointmentPaymentSession);
}

export default AppointmentSaga;
