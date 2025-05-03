import { call, put, takeLatest } from "redux-saga/effects";
import { post, get } from "../../../helpers/api_helpers";
import {
  addContactUSDetailsBegin,
  addContactUSDetailsSuccess,
  addContactUSDetailsFail,
  getHistoryDetailsBegin,
  getHistoryDetailsSuccess,
  getHistoryDetailsFail,
} from "./action";
import { ADD_CONTACT_US_DETAILS, GET_HISTORY_DETAILS } from "./actionType";

function* addContactUSDetails({ data, callback }) {
  try {
    yield put(addContactUSDetailsBegin());
    const response = yield call(post, "/contact_us", data);
    if (response) {
      yield put(addContactUSDetailsSuccess());
      callback && callback();
    }
  } catch (error) {
    yield put(addContactUSDetailsFail(error));
  }
}

function* getHistoryDetails() {
  try {
    yield put(getHistoryDetailsBegin());
    const response = yield call(get, "/get_data_for_service_page");
    if (response) {
      yield put(getHistoryDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getHistoryDetailsFail(error));
  }
}

function* ContactUsSaga() {
  yield takeLatest(ADD_CONTACT_US_DETAILS, addContactUSDetails);
  yield takeLatest(GET_HISTORY_DETAILS, getHistoryDetails);
}

export default ContactUsSaga;
