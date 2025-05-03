import {
  APPLY_COUPON_DETAILS,
  APPLY_COUPON_DETAILS_BEGIN,
  APPLY_COUPON_DETAILS_FAIL,
  APPLY_COUPON_DETAILS_SUCCESS,
  REMOVE_COUPON_DETAILS,
  REMOVE_COUPON_DETAILS_BEGIN,
  REMOVE_COUPON_DETAILS_FAIL,
  REMOVE_COUPON_DETAILS_SUCCESS,
  APPLY_CLINIC_COUPON_DETAILS,
  APPLY_CLINIC_COUPON_DETAILS_BEGIN,
  APPLY_CLINIC_COUPON_DETAILS_FAIL,
  APPLY_CLINIC_COUPON_DETAILS_SUCCESS,
  REMOVE_CLINIC_COUPON_DETAILS,
  REMOVE_CLINIC_COUPON_DETAILS_BEGIN,
  REMOVE_CLINIC_COUPON_DETAILS_FAIL,
  REMOVE_CLINIC_COUPON_DETAILS_SUCCESS,
} from "./actionType";

export const addCouponDetails = ({ Coupon, callback }) => ({
  type: APPLY_COUPON_DETAILS,
  Coupon: Coupon,
  callback: callback,
});

export const addCouponDetailsBegin = () => ({
  type: APPLY_COUPON_DETAILS_BEGIN,
});

export const addCouponDetailsSuccess = (
  couponamount,
  couponname,
  payableamount
) => ({
  type: APPLY_COUPON_DETAILS_SUCCESS,
  coupon_amount: couponamount,
  coupon_name: couponname,
  payable_amount: payableamount,
});

export const addCouponDetailsFail = (error) => ({
  type: APPLY_COUPON_DETAILS_FAIL,
  payload: error,
});

export const removeCouponDetails = ({ Coupon, callback }) => ({
  type: REMOVE_COUPON_DETAILS,
  Coupon: Coupon,
  callback: callback,
});

export const removeCouponDetailsBegin = () => ({
  type: REMOVE_COUPON_DETAILS_BEGIN,
});

export const removeCouponDetailsSuccess = (
  couponamount,
  couponname,
  payableamount
) => ({
  type: REMOVE_COUPON_DETAILS_SUCCESS,
  coupon_amount: couponamount,
  coupon_name: couponname,
  payable_amount: payableamount,
});

export const removeCouponDetailsFail = (error) => ({
  type: REMOVE_COUPON_DETAILS_FAIL,
  payload: error,
});

//Clinic Coupons Section
export const addClinicCouponDetails = ({ Coupon, callback }) => ({
  type: APPLY_CLINIC_COUPON_DETAILS,
  Coupon: Coupon,
  callback: callback,
});

export const addClinicCouponDetailsBegin = () => ({
  type: APPLY_CLINIC_COUPON_DETAILS_BEGIN,
});

export const addClinicCouponDetailsSuccess = (
  couponamount,
  couponname,
  payableamount
) => ({
  type: APPLY_CLINIC_COUPON_DETAILS_SUCCESS,
  coupon_amount: couponamount,
  coupon_name: couponname,
  payable_amount: payableamount,
});

export const addClinicCouponDetailsFail = (error) => ({
  type: APPLY_CLINIC_COUPON_DETAILS_FAIL,
  payload: error,
});

export const removeClinicCouponDetails = ({ Coupon, callback }) => ({
  type: REMOVE_CLINIC_COUPON_DETAILS,
  Coupon: Coupon,
  callback: callback,
});

export const removeClinicCouponDetailsBegin = () => ({
  type: REMOVE_CLINIC_COUPON_DETAILS_BEGIN,
});

export const removeClinicCouponDetailsSuccess = (
  couponamount,
  couponname,
  payableamount
) => ({
  type: REMOVE_CLINIC_COUPON_DETAILS_SUCCESS,
  coupon_amount: couponamount,
  coupon_name: couponname,
  payable_amount: payableamount,
});

export const removeClinicCouponDetailsFail = (error) => ({
  type: REMOVE_CLINIC_COUPON_DETAILS_FAIL,
  payload: error,
});
