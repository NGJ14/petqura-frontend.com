import {
  APPLY_COUPON_DETAILS_BEGIN,
  APPLY_COUPON_DETAILS_FAIL,
  APPLY_COUPON_DETAILS_SUCCESS,
  REMOVE_COUPON_DETAILS_BEGIN,
  REMOVE_COUPON_DETAILS_FAIL,
  REMOVE_COUPON_DETAILS_SUCCESS,
  APPLY_CLINIC_COUPON_DETAILS_BEGIN,
  APPLY_CLINIC_COUPON_DETAILS_SUCCESS,
  APPLY_CLINIC_COUPON_DETAILS_FAIL,
  REMOVE_CLINIC_COUPON_DETAILS_BEGIN,
  REMOVE_CLINIC_COUPON_DETAILS_FAIL,
  REMOVE_CLINIC_COUPON_DETAILS_SUCCESS,
} from "./actionType";

const initial_state = {
  Coupon: {},
  error: "",
  loading: false,
  couponamount: "",
  couponname: "",
  payableamount: "",
};

const Coupon = (state = initial_state, action) => {
  switch (action.type) {
    case APPLY_COUPON_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case APPLY_COUPON_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        couponamount: action.coupon_amount,
        couponname: action.coupon_name,
        payableamount: action.payable_amount,
      };
    case APPLY_COUPON_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_COUPON_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case REMOVE_COUPON_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        couponamount: action.coupon_amount,
        couponname: action.coupon_name,
        payableamount: action.payable_amount,
      };
    case REMOVE_COUPON_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case APPLY_CLINIC_COUPON_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case APPLY_CLINIC_COUPON_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        couponamount: action.coupon_amount,
        couponname: action.coupon_name,
        payableamount: action.payable_amount,
      };
    case APPLY_CLINIC_COUPON_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_CLINIC_COUPON_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case REMOVE_CLINIC_COUPON_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        couponamount: action.coupon_amount,
        couponname: action.coupon_name,
        payableamount: action.payable_amount,
      };
    case REMOVE_CLINIC_COUPON_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default Coupon;
