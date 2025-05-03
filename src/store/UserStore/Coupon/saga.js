import { call, put, takeLatest } from "redux-saga/effects";
import { add, del } from "../../../helpers/api_helpers";
import {
  addCouponDetailsBegin,
  addCouponDetailsSuccess,
  addCouponDetailsFail,
  removeCouponDetailsBegin,
  removeCouponDetailsSuccess,
  removeCouponDetailsFail,
  addClinicCouponDetailsBegin,
  addClinicCouponDetailsSuccess,
  addClinicCouponDetailsFail,
  removeClinicCouponDetailsBegin,
  removeClinicCouponDetailsSuccess,
  removeClinicCouponDetailsFail,
} from "./action";
import {
  APPLY_COUPON_DETAILS,
  REMOVE_COUPON_DETAILS,
  APPLY_CLINIC_COUPON_DETAILS,
  REMOVE_CLINIC_COUPON_DETAILS,
} from "./actionType";

function* addCouponDetails({ Coupon, callback }) {
  try {
    yield put(addCouponDetailsBegin());
    let response = {};
    response = yield call(add, "/apply_coupon", Coupon);
    if (response) {
      yield put(
        addCouponDetailsSuccess(
          response?.result?.coupon_amount,
          response?.result?.coupon_name,
          response?.result?.payable_amount
        )
      );
    }
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(addCouponDetailsFail(error));
  }
}

function* addClinicCouponDetails({ Coupon, callback }) {
  try {
    yield put(addClinicCouponDetailsBegin());
    let response = {};
    response = yield call(add, "/apply_clinic_coupon", Coupon);
    if (response) {
      yield put(
        addClinicCouponDetailsSuccess(
          response?.result?.coupon_amount,
          response?.result?.coupon_name,
          response?.result?.payable_amount
        )
      );
    }
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(addClinicCouponDetailsFail(error));
  }
}

function* removeCouponDetails({ Coupon, callback }) {
  try {
    yield put(removeCouponDetailsBegin());
    const response = yield call(del, "/remove_coupon", Coupon);
    if (response) {
      yield put(
        removeCouponDetailsSuccess(
          response?.result?.coupon_amount,
          response?.result?.coupon_name,
          response?.result?.payable_amount
        )
      );
    }
    callback && callback();
  } catch (error) {
    yield put(removeCouponDetailsFail(error));
  }
}

function* removeClinicCouponDetails({ Coupon, callback }) {
  try {
    yield put(removeClinicCouponDetailsBegin());
    const response = yield call(del, "/remove_clinic_coupon", Coupon);
    if (response) {
      yield put(
        removeClinicCouponDetailsSuccess(
          response?.result?.coupon_amount,
          response?.result?.coupon_name,
          response?.result?.payable_amount
        )
      );
    }
    callback && callback();
  } catch (error) {
    yield put(removeClinicCouponDetailsFail(error));
  }
}

function* CouponSaga() {
  yield takeLatest(APPLY_COUPON_DETAILS, addCouponDetails);
  yield takeLatest(REMOVE_COUPON_DETAILS, removeCouponDetails);
  yield takeLatest(APPLY_CLINIC_COUPON_DETAILS, addClinicCouponDetails);
  yield takeLatest(REMOVE_CLINIC_COUPON_DETAILS, removeClinicCouponDetails);
}

export default CouponSaga;
