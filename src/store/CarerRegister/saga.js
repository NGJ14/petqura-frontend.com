import { call, put, takeLatest } from "redux-saga/effects";
import { post } from "../../helpers/api_helpers";
import {
  INITIATE_REGISTER_CARER,
  REGISTER_CARER,
  SEND_CARER_OTP,
  VERIFY_CARER_OTP,
} from "./actionTypes";
import {
  verifyCarerOtpBegin,
  verifyCarerOtpSuccess,
  verifyCarerOtpFail,
  sendCarerOtpFail,
  sendCarerOtpSuccess,
  sendCarerOtpBegin,
  registerCarerFail,
  registerCarerSuccess,
  registerCarerBegin,
  initiateregisterCarerBegin,
  initiateregisterCarerSuccess,
  initiateregisterCarerFail,
} from "./actions";

function* initiateregisterCarer({ user, callback }) {
  try {
    yield put(initiateregisterCarerBegin());

    const response = yield call(
      post,
      `/partner/initiate_carer_registeration`,
      user
    );
    console.log("Response".response);
    if (response) {
      yield put(initiateregisterCarerSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(initiateregisterCarerFail(error));
  }
}

function* registerCarer({ user, callback, toggle }) {
  try {
    yield put(registerCarerBegin());

    const response = yield call(post, `/partner/carer_register`, user);

    if (response) {
      yield put(registerCarerSuccess(response.result));
      toggle && toggle();
    }
  } catch (error) {
    yield put(registerCarerFail(error));
  }
}

function* sendCarerOtp({ data, callback }) {
  try {
    yield put(sendCarerOtpBegin());
    const response = yield call(post, `/partner/carer_sent_otp`, data);
    if (response) {
      yield put(sendCarerOtpSuccess());
      callback && callback();
    }
  } catch (error) {
    yield put(sendCarerOtpFail(error));
  }
}

function* verifyCarerOtp({ data, callback }) {
  try {
    yield put(verifyCarerOtpBegin());
    const response = yield call(post, `/partner/carer_verify_otp`, data);
    if (response) {
      yield put(verifyCarerOtpSuccess());
      callback && callback();
    }
  } catch (error) {
    yield put(verifyCarerOtpFail(error));
  }
}

function* RegisterCarerSaga() {
  yield takeLatest(REGISTER_CARER, registerCarer);
  yield takeLatest(VERIFY_CARER_OTP, verifyCarerOtp);
  yield takeLatest(SEND_CARER_OTP, sendCarerOtp);
  yield takeLatest(INITIATE_REGISTER_CARER, initiateregisterCarer);
}

export default RegisterCarerSaga;
