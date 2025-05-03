import { call, put, takeLatest } from "redux-saga/effects";
import { get, add, update } from "../../helpers/api_helpers";
import { setLocalStorage } from "../../helpers/utils";
import {
  getCarerTypeBegin,
  getCarerTypeSuccess,
  getCarerTypeFail,
  carerLoginUserBegin,
  carerLoginUserSuccess,
  carerLoginUserFail,
  addCarerBegin,
  addCarerSuccess,
  addCarerFail,
  getCarerPersonalDetailsSuccess,
  getCarerPersonalDetailsFail,
  getCarerPersonalDetailsBegin,
  getCarerDashboardDetailsBegin,
  getCarerDashboardDetailsSuccess,
  getCarerDashboardDetailsFail,
  updateCarerBegin,
  updateCarerSuccess,
  updateCarerFail,
} from "./action";
import {
  ADD_CARER,
  CARER_LOGIN_USER,
  GET_CARER_TYPE,
  GET_CARER_PERSONAL_DETAILS,
  GET_CARER_DASHBOARD_DETAILS,
  UPDATE_CARER,
} from "./actionType";

function* getCarerType() {
  try {
    yield put(getCarerTypeBegin());
    const response = yield call(get, "/partner/carer_types");
    if (response) {
      yield put(getCarerTypeSuccess(response.result));
    }
  } catch (error) {
    yield put(getCarerTypeFail(error));
  }
}

function* carerLoginUser({ data, callback }) {
  try {
    yield put(carerLoginUserBegin());
    const response = yield call(add, `/carer_login`, data);
    if (response) {
      setLocalStorage("AUTH_DETAILS", response?.result);
      yield put(carerLoginUserSuccess(response.result.user));
      callback && callback();
    }
  } catch (error) {
    yield put(carerLoginUserFail(error));
  }
}

function* getCarerPersonalDetails() {
  try {
    yield put(getCarerPersonalDetailsBegin());
    const response = yield call(get, `/partner/get_carer_profile`);
    if (response) {
      yield put(getCarerPersonalDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getCarerPersonalDetailsFail(error));
  }
}

function* addCarer({ data, callback, idImage }) {
  try {
    let response = {};
    yield put(addCarerBegin());
    for (var pair of idImage.entries()) {
      if (pair[1] !== "null") {
        response = yield call(add, `/partner/upload_id_image`, idImage);
      }
    }

    if (response) {
      const response2 = yield call(
        add,
        `/partner/complete_carer_profile`,
        data
      );
      if (response2) {
        yield put(addCarerSuccess(response.result));
        callback && callback();
      }
    }
  } catch (error) {
    console.log(error);
    yield put(addCarerFail(error));
  }
}

function* updateCarer({ data, image, isImage, callback, imageChanged }) {
  try {
    yield put(updateCarerBegin());

    const response = yield call(
      update,
      `/partner/complete_carer_profile`,
      data
    );
    if (!isImage && imageChanged) {
      yield call(add, "/partner/clinic_image", image);
    }
    callback && callback();

    yield put(updateCarerSuccess(response.result));
  } catch (error) {
    yield put(updateCarerFail(error));
  }
}

function* getCarerDashboardDetails() {
  try {
    yield put(getCarerDashboardDetailsBegin());
    const response = yield call(get, `/partner/seller_dashboard`);
    if (response) {
      yield put(getCarerDashboardDetailsSuccess(response.result));
    }
  } catch (error) {
    console.log(error);
    yield put(getCarerDashboardDetailsFail(error));
  }
}

function* CarerSaga() {
  yield takeLatest(GET_CARER_TYPE, getCarerType);
  yield takeLatest(CARER_LOGIN_USER, carerLoginUser);
  yield takeLatest(GET_CARER_PERSONAL_DETAILS, getCarerPersonalDetails);
  yield takeLatest(GET_CARER_DASHBOARD_DETAILS, getCarerDashboardDetails);
  yield takeLatest(ADD_CARER, addCarer);
  yield takeLatest(UPDATE_CARER, updateCarer);
}

export default CarerSaga;
