import {
  GET_INVOICE,
  GET_INVOICE_BEGIN,
  GET_INVOICE_FAIL,
  GET_INVOICE_SUCCESS,
  GET_ORDER_BY_ID,
  GET_ORDER_BY_ID_BEGIN,
  GET_ORDER_BY_ID_FAIL,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_BEGIN,
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_SUCCESS,
} from "./actionType";

export const getOrderDetails = ({ request }) => ({
  type: GET_ORDER_DETAILS,
  request: request,
});

export const getOrderDetailsBegin = () => ({
  type: GET_ORDER_DETAILS_BEGIN,
});

export const getOrderDetailsSuccess = (address) => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: address,
});

export const getOrderDetailsFail = (error) => ({
  type: GET_ORDER_DETAILS_FAIL,
  payload: error,
});

export const getOrderById = ({ data }) => ({
  type: GET_ORDER_BY_ID,
  data: data,
});

export const getOrderByIdBegin = () => ({
  type: GET_ORDER_BY_ID_BEGIN,
});

export const getOrderByIdSuccess = (address) => ({
  type: GET_ORDER_BY_ID_SUCCESS,
  payload: address,
});

export const getOrderByIdFail = (error) => ({
  type: GET_ORDER_BY_ID_FAIL,
  payload: error,
});

export const getInvoice = ({ data }) => ({
  type: GET_INVOICE,
  data: data,
});

export const getInvoiceBegin = () => ({
  type: GET_INVOICE_BEGIN,
});

export const getInvoiceSuccess = (address) => ({
  type: GET_INVOICE_SUCCESS,
  payload: address,
});

export const getInvoiceFail = (error) => ({
  type: GET_INVOICE_FAIL,
  payload: error,
});
