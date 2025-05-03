import {
  ADD_CHECKOUT_COD_ORDER_BEGIN,
  ADD_CHECKOUT_COD_ORDER_FAIL,
  ADD_CHECKOUT_COD_ORDER_SUCCESS,
  ADD_CHECKOUT_PREPAID_ORDER_BEGIN,
  ADD_CHECKOUT_PREPAID_ORDER_FAIL,
  ADD_CHECKOUT_PREPAID_ORDER_SUCCESS,
  GET_CHECKOUT_PREPAID_ORDER_BEGIN,
  GET_CHECKOUT_PREPAID_ORDER_FAIL,
  GET_CHECKOUT_PREPAID_ORDER_SUCCESS,
  GET_REWARD_POINTS_BEGIN,
  GET_REWARD_POINTS_FAIL,
  GET_REWARD_POINTS_SUCCESS,
} from "./actionType";

const initial_state = {
  ShopCart: {},
  loading: false,
  error: "",
  CartDetails: {},
  rewardPoints: {},
};

const Checkout = (state = initial_state, action) => {
  switch (action.type) {
    case GET_CHECKOUT_PREPAID_ORDER_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        ShopCart: {},
      };
    case GET_CHECKOUT_PREPAID_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        ShopCart: action.payload,
        error: "",
      };
    case GET_CHECKOUT_PREPAID_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ShopCart: {},
      };

    case ADD_CHECKOUT_PREPAID_ORDER_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_CHECKOUT_PREPAID_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_CHECKOUT_PREPAID_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_CHECKOUT_COD_ORDER_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_CHECKOUT_COD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_CHECKOUT_COD_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_REWARD_POINTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        rewardPoints: {},
      };
    case GET_REWARD_POINTS_SUCCESS:
      return {
        ...state,
        loading: false,
        rewardPoints: action.payload,
        error: "",
      };
    case GET_REWARD_POINTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        rewardPoints: {},
      };

    default:
      return { ...state };
  }
};

export default Checkout;
