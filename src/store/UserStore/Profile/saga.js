import { call, put, takeLatest } from "redux-saga/effects";
import { get, post, update } from "../../../helpers/api_helpers";
import {
  editPersonalDetailsBegin,
  editPersonalDetailsSuccess,
  editPersonalDetailsFail,
  getPersonalDetailsBegin,
  getPersonalDetailsSuccess,
  getPersonalDetailsFail,
  changePasswordBegin,
  changePasswordSuccess,
  changePasswordFail,
} from "./action";
import {
  CHANGE_PASSWORD,
  EDIT_PERSONAL_DETAILS,
  GET_PERSONAL_DETAILS,
} from "./actionType";

function* editPersonalDetails({ user, callBack }) {
  try {
    yield put(editPersonalDetailsBegin());
    const response = yield call(update, "/edit_profile", user);
    if (response) {
      yield put(editPersonalDetailsSuccess(response.result));
      callBack && callBack();
    }
  } catch (error) {
    yield put(editPersonalDetailsFail(error));
  }
}

function* getPersonalDetails() {
  try {
    yield put(getPersonalDetailsBegin());
    const response = yield call(get, "/get_profile_details");
    if (response) {
      yield put(getPersonalDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getPersonalDetailsFail(error));
  }
}

function* changePassword({ data, callback }) {
  try {
    yield put(changePasswordBegin());
    const response = yield call(post, "/change_password", data);
    if (response) {
      yield put(changePasswordSuccess(response.message));
      callback && callback();
    }
  } catch (error) {
    yield put(changePasswordFail(error));
  }
}

function* ProfileSaga() {
  yield takeLatest(EDIT_PERSONAL_DETAILS, editPersonalDetails);
  yield takeLatest(GET_PERSONAL_DETAILS, getPersonalDetails);
  yield takeLatest(CHANGE_PASSWORD, changePassword);
}

export default ProfileSaga;
