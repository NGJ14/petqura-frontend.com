import { call, put, takeLatest } from "redux-saga/effects";
import { add, get } from "../../../helpers/api_helpers";
import {
  addDonationPaymentBegin,
  addDonationPaymentSuccess,
  addDonationPaymentFail,
  addDonationDetailsBegin,
  addDonationDetailsSuccess,
  addDonationDetailsFail,
  viewHANDS4PAWSGALERYDetailsBegin,
  viewHANDS4PAWSGALERYDetailsSuccess,
  viewHANDS4PAWSGALERYDetailsFail,
} from "./action";
import {
  ADD_DONATION_DETAILS,
  ADD_DONATION_PAYMENT,
  VIEW_HANDS4PAWS_GALLERY,
} from "./actionType";

function* addDonationPayment(response) {
  try {
    yield put(addDonationPaymentBegin());
    const response1 = yield call(add, "/hfp_check_payment", response?.payload);
    if (response1) {
      yield put(addDonationPaymentSuccess(response1.result));
      response?.closePaytm && response?.closePaytm();
      // response?.scroll && response?.scroll();
    }
  } catch (error) {
    console.log(error);
    yield put(addDonationPaymentFail(error));
  }
}

function* addDonationDetails({ data, callback }) {
  try {
    yield put(addDonationDetailsBegin());
    const response1 = yield call(add, "/hfp_donation", data);
    if (response1) {
      yield put(addDonationDetailsSuccess(response1.result));
      callback &&
        callback(
          response1?.result?.payment_id,
          response1?.result?.paytm_token,
          response1?.result?.amount
        );
    }
  } catch (error) {
    console.log(error);
    yield put(addDonationDetailsFail(error));
  }
}

function* viewHANDS4PAWSGALERYDetails({ request }) {
  try {
    yield put(viewHANDS4PAWSGALERYDetailsBegin());
    const response = yield call(get, "/handpaws_gallery", request);
    if (response) {
      yield put(viewHANDS4PAWSGALERYDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(viewHANDS4PAWSGALERYDetailsFail(error));
  }
}

function* DonationSaga() {
  yield takeLatest(ADD_DONATION_PAYMENT, addDonationPayment);
  yield takeLatest(ADD_DONATION_DETAILS, addDonationDetails);
  yield takeLatest(VIEW_HANDS4PAWS_GALLERY, viewHANDS4PAWSGALERYDetails);
}

export default DonationSaga;
