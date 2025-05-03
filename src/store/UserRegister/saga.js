import { call, put, takeLatest } from "redux-saga/effects";
import {
  registerUserBegin,
  registerUserFail,
  registerUserSuccess,
  verifyOtpBegin,
  verifyOtpFail,
  verifyOtpSuccess,
} from "./action";
import { add, del, get, update } from "../../helpers/api_helpers";
import { REGISTER_USER, VERIFY_OTP } from "./actionTypes";

function* registerUser({ user, callback }) {
  try {
    yield put(registerUserBegin());

    const response = yield call(add, `/user_register`, user);

    if (response) {
      // yield call(add, `/user_sent_otp`, user);
      yield put(registerUserSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(registerUserFail(error));
  }
}

function* verifyOtp({ data, callback }) {
  try {
    yield put(verifyOtpBegin());
    const response = yield call(add, `/user_verify_otp`, data);
    if (response) {
      yield put(verifyOtpSuccess());
      callback && callback();
    }
  } catch (error) {
    yield put(verifyOtpFail(error));
  }
}

function* RegisterUserSaga() {
  yield takeLatest(REGISTER_USER, registerUser);
  yield takeLatest(VERIFY_OTP, verifyOtp);
}

export default RegisterUserSaga;
