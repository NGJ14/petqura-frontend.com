import {
  ADD_CHECKOUT_COD_ORDER_BEGIN,
  ADD_CHECKOUT_COD_ORDER_FAIL,
  ADD_CHECKOUT_COD_ORDER_SUCCESS,
  ADD_CHECKOUT_PREPAID_ORDER_BEGIN,
  ADD_CHECKOUT_PREPAID_ORDER_FAIL,
  ADD_CHECKOUT_PREPAID_ORDER_SUCCESS,
  ADD_DONATION_DETAILS_BEGIN,
  ADD_DONATION_DETAILS_FAIL,
  ADD_DONATION_DETAILS_SUCCESS,
  ADD_DONATION_PAYMENT_BEGIN,
  ADD_DONATION_PAYMENT_FAIL,
  ADD_DONATION_PAYMENT_SUCCESS,
  GET_CHECKOUT_PREPAID_ORDER_BEGIN,
  GET_CHECKOUT_PREPAID_ORDER_FAIL,
  GET_CHECKOUT_PREPAID_ORDER_SUCCESS,
  GET_REWARD_POINTS_BEGIN,
  GET_REWARD_POINTS_FAIL,
  GET_REWARD_POINTS_SUCCESS,
  VIEW_HANDS4PAWS_GALLERY_BEGIN,
  VIEW_HANDS4PAWS_GALLERY_SUCCESS,
  VIEW_HANDS4PAWS_GALLERY_FAIL,
} from "./actionType";

const initial_state = {
  loading: false,
  error: "",
  payment: {},
  HANDS4PAWSGALERY: {},
};

const Donation = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_DONATION_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        payment: {},
      };
    case ADD_DONATION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        payment: action.payload,
      };
    case ADD_DONATION_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        payment: {},
      };

    case ADD_DONATION_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_DONATION_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_DONATION_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case VIEW_HANDS4PAWS_GALLERY_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case VIEW_HANDS4PAWS_GALLERY_SUCCESS:
      return {
        ...state,
        loading: false,
        HANDS4PAWSGALERY: action.payload,
        error: "",
      };
    case VIEW_HANDS4PAWS_GALLERY_FAIL:
      return {
        ...state,
        loading: false,
        HANDS4PAWSGALERY: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Donation;
