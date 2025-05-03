import { call, put, takeLatest } from "redux-saga/effects";
import {
  forgotVerifyOtpBegin,
  forgotVerifyOtpFail,
  forgotVerifyOtpSuccess,
  forgotPasswordBegin,
  forgotPasswordFail,
  forgotPasswordSuccess,
  loginUserBegin,
  loginUserFail,
  loginUserSuccess,
  forgotVerifyPasswordBegin,
  forgotVerifyPasswordSuccess,
  forgotVerifyPasswordFail,
} from "./action";
import { add } from "../../../helpers/api_helpers";
import {
  FORGOT_PASSWORD,
  FORGOT_VERIFY_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
} from "./actionTypes";
import { setLocalStorage } from "../../../helpers/utils";
import { FORGOT_VERIFY_OTP } from "../Login/actionTypes";

function* loginUser({ user, callback, productLogin, cart }) {
  try {
    yield put(loginUserBegin());

    const response = yield call(add, `/user_login`, user);

    if (response) {
      setLocalStorage("AUTH_DETAILS", response?.result);
      if (productLogin) {
        yield call(add, "/add_to_cart", cart);
      }
      yield put(loginUserSuccess(response.result.user));
      callback && callback();
    }
  } catch (error) {
    yield put(loginUserFail(error));
  }
}

function* forgotPassword({ data, callback }) {
  try {
    yield put(forgotPasswordBegin());

    const response = yield call(add, `/forgot_password`, data);

    if (response) {
      yield put(forgotPasswordSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(forgotPasswordFail(error));
  }
}

function* logoutUser({ data, callback }) {
  try {
    yield call(add, "/logout", data);
    callback && callback();
  } catch (error) {
    callback && callback();
  }
}

function* forgotVerifyOtp({ data, callback }) {
  try {
    yield put(forgotVerifyOtpBegin());
    const response = yield call(add, `/verifiy_forgot_password`, data);
    if (response) {
      yield put(forgotVerifyOtpSuccess());
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(forgotVerifyOtpFail(error));
  }
}

function* forgotVerifyPassword({ data, callback }) {
  try {
    yield put(forgotVerifyPasswordBegin());
    const response = yield call(add, `/change_forgot_password`, data);
    if (response) {
      yield put(forgotVerifyPasswordSuccess());
      callback && callback();
    }
  } catch (error) {
    console.log(error);

    yield put(forgotVerifyPasswordFail(error));
  }
}

function* forgetPasswordSaga() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(FORGOT_VERIFY_OTP, forgotVerifyOtp);
  yield takeLatest(FORGOT_VERIFY_PASSWORD, forgotVerifyPassword);
  yield takeLatest(LOGOUT_USER, logoutUser);
}

export default forgetPasswordSaga;
