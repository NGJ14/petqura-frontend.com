import {
  ADD_CHECKOUT_COD_ORDER,
  ADD_CHECKOUT_COD_ORDER_BEGIN,
  ADD_CHECKOUT_COD_ORDER_FAIL,
  ADD_CHECKOUT_COD_ORDER_SUCCESS,
  ADD_CHECKOUT_PREPAID_ORDER,
  ADD_CHECKOUT_PREPAID_ORDER_BEGIN,
  ADD_CHECKOUT_PREPAID_ORDER_FAIL,
  ADD_CHECKOUT_PREPAID_ORDER_SUCCESS,
  GET_CHECKOUT_PREPAID_ORDER,
  GET_CHECKOUT_PREPAID_ORDER_BEGIN,
  GET_CHECKOUT_PREPAID_ORDER_FAIL,
  GET_CHECKOUT_PREPAID_ORDER_SUCCESS,
  GET_REWARD_POINTS,
  GET_REWARD_POINTS_BEGIN,
  GET_REWARD_POINTS_FAIL,
  GET_REWARD_POINTS_SUCCESS,
} from "./actionType";

export const addCheckoutPrepaidOrder = (
  response,
  callback,
  closePaytm,
  history,
  scroll
) => ({
  type: ADD_CHECKOUT_PREPAID_ORDER,
  payload: response,
  callback: callback,
  closePaytm: closePaytm,
  scroll: scroll,
  history: history,
});

export const addCheckoutPrepaidOrderBegin = () => ({
  type: ADD_CHECKOUT_PREPAID_ORDER_BEGIN,
});

export const addCheckoutPrepaidOrderSuccess = () => ({
  type: ADD_CHECKOUT_PREPAID_ORDER_SUCCESS,
});

export const addCheckoutPrepaidOrderFail = (error) => ({
  type: ADD_CHECKOUT_PREPAID_ORDER_FAIL,
  payload: error,
});

export const getCheckoutPrepaidOrder = ({ data, callback }) => ({
  type: GET_CHECKOUT_PREPAID_ORDER,
  callback: callback,
  data: data,
});

export const getCheckoutPrepaidOrderBegin = () => ({
  type: GET_CHECKOUT_PREPAID_ORDER_BEGIN,
});

export const getCheckoutPrepaidOrderSuccess = (Cart) => ({
  type: GET_CHECKOUT_PREPAID_ORDER_SUCCESS,
  payload: Cart,
});

export const getCheckoutPrepaidOrderFail = (error) => ({
  type: GET_CHECKOUT_PREPAID_ORDER_FAIL,
  payload: error,
});

export const addCheckoutCODOrder = ({ data, callback }) => ({
  type: ADD_CHECKOUT_COD_ORDER,
  data: data,
  callback: callback,
});

export const addCheckoutCODOrderBegin = () => ({
  type: ADD_CHECKOUT_COD_ORDER_BEGIN,
});

export const addCheckoutCODOrderSuccess = () => ({
  type: ADD_CHECKOUT_COD_ORDER_SUCCESS,
});

export const addCheckoutCODOrderFail = (error) => ({
  type: ADD_CHECKOUT_COD_ORDER_FAIL,
  payload: error,
});

export const getRewardPoints = () => ({
  type: GET_REWARD_POINTS,
});

export const getRewardPointsBegin = () => ({
  type: GET_REWARD_POINTS_BEGIN,
});

export const getRewardPointsSuccess = (Cart) => ({
  type: GET_REWARD_POINTS_SUCCESS,
  payload: Cart,
});

export const getRewardPointsFail = (error) => ({
  type: GET_REWARD_POINTS_FAIL,
  payload: error,
});
