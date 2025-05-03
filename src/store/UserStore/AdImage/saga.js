import { call, put, takeLatest } from "redux-saga/effects";
import { add, get } from "../../../helpers/api_helpers";
import { getAdImageBegin, getAdImageSuccess, getAdImageFail } from "./action";
import { GET_AD_IMAGE } from "./actionType";

function* getAdImage() {
  try {
    yield put(getAdImageBegin());
    const response = yield call(get, "/slider_images");
    if (response) {
      yield put(getAdImageSuccess(response.result));
    }
  } catch (error) {
    yield put(getAdImageFail(error));
  }
}

function* ADIMAGESaga() {
  yield takeLatest(GET_AD_IMAGE, getAdImage);
}

export default ADIMAGESaga;
