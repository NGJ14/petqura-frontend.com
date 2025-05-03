import { call, put, takeLatest } from "redux-saga/effects";
import { get } from "../../../helpers/api_helpers";
import {
  getDeliveryDetailsBegin,
  getDeliveryDetailsSuccess,
  getDeliveryDetailsFail,
} from "./action";
import { GET_DELIVERY_DETAILS } from "./actionType";

function* getDeliveryDetails() {
  try {
    yield put(getDeliveryDetailsBegin());
    const response = yield call(get, "/delivery_modes");
    if (response) {
      yield put(getDeliveryDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getDeliveryDetailsFail(error));
  }
}

function* DeliverySaga() {
  yield takeLatest(GET_DELIVERY_DETAILS, getDeliveryDetails);
}

export default DeliverySaga;
