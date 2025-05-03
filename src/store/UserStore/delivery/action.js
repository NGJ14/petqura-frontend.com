import {
  GET_DELIVERY_DETAILS,
  GET_DELIVERY_DETAILS_BEGIN,
  GET_DELIVERY_DETAILS_FAIL,
  GET_DELIVERY_DETAILS_SUCCESS,
} from "./actionType";

export const getDeliveryDetails = () => ({
  type: GET_DELIVERY_DETAILS,
});

export const getDeliveryDetailsBegin = () => ({
  type: GET_DELIVERY_DETAILS_BEGIN,
});

export const getDeliveryDetailsSuccess = (Delivery) => ({
  type: GET_DELIVERY_DETAILS_SUCCESS,
  payload: Delivery,
});

export const getDeliveryDetailsFail = (error) => ({
  type: GET_DELIVERY_DETAILS_FAIL,
  payload: error,
});
