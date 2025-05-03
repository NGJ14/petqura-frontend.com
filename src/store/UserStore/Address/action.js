import {
  ADD_ADDRESS_DETAILS,
  ADD_ADDRESS_DETAILS_BEGIN,
  ADD_ADDRESS_DETAILS_FAIL,
  ADD_ADDRESS_DETAILS_SUCCESS,
  DELETE_ADDRESS_DETAILS,
  DELETE_ADDRESS_DETAILS_BEGIN,
  DELETE_ADDRESS_DETAILS_FAIL,
  DELETE_ADDRESS_DETAILS_SUCCESS,
  EDIT_ADDRESS_DETAILS,
  EDIT_ADDRESS_DETAILS_BEGIN,
  EDIT_ADDRESS_DETAILS_FAIL,
  EDIT_ADDRESS_DETAILS_SUCCESS,
  GET_ADDRESS_BY_ID,
  GET_ADDRESS_BY_ID_BEGIN,
  GET_ADDRESS_BY_ID_FAIL,
  GET_ADDRESS_BY_ID_SUCCESS,
  GET_BILLING_ADDRESS_BY_ID,
  GET_BILLING_ADDRESS_BY_ID_BEGIN,
  GET_BILLING_ADDRESS_BY_ID_SUCCESS,
  GET_BILLING_ADDRESS_BY_ID_FAIL,
  GET_ADDRESS_DETAILS,
  GET_ADDRESS_DETAILS_BEGIN,
  GET_ADDRESS_DETAILS_FAIL,
  GET_ADDRESS_DETAILS_SUCCESS,
  GET_BILLING_ADDRESS_DETAILS,
  GET_BILLING_ADDRESS_DETAILS_BEGIN,
  GET_BILLING_ADDRESS_DETAILS_FAIL,
  GET_BILLING_ADDRESS_DETAILS_SUCCESS,
} from "./actionType";

export const editAddressDetails = ({ address, callback }) => ({
  type: EDIT_ADDRESS_DETAILS,
  address: address,
  callback: callback,
});

export const editAddressDetailsBegin = () => ({
  type: EDIT_ADDRESS_DETAILS_BEGIN,
});

export const editAddressDetailsSuccess = () => ({
  type: EDIT_ADDRESS_DETAILS_SUCCESS,
});

export const editAddressDetailsFail = (error) => ({
  type: EDIT_ADDRESS_DETAILS_FAIL,
  payload: error,
});

export const addAddressDetails = ({ address, callback }) => ({
  type: ADD_ADDRESS_DETAILS,
  address: address,
  callback: callback,
});

export const addAddressDetailsBegin = () => ({
  type: ADD_ADDRESS_DETAILS_BEGIN,
});

export const addAddressDetailsSuccess = () => ({
  type: ADD_ADDRESS_DETAILS_SUCCESS,
});

export const addAddressDetailsFail = (error) => ({
  type: ADD_ADDRESS_DETAILS_FAIL,
  payload: error,
});

export const deleteAddressDetails = ({ address, callback }) => ({
  type: DELETE_ADDRESS_DETAILS,
  address: address,
  callback: callback,
});

export const deleteAddressDetailsBegin = () => ({
  type: DELETE_ADDRESS_DETAILS_BEGIN,
});

export const deleteAddressDetailsSuccess = () => ({
  type: DELETE_ADDRESS_DETAILS_SUCCESS,
});

export const deleteAddressDetailsFail = (error) => ({
  type: DELETE_ADDRESS_DETAILS_FAIL,
  payload: error,
});

export const getAddressDetails = ({ data }) => ({
  type: GET_ADDRESS_DETAILS,
  data: data,
});

export const getAddressDetailsBegin = () => ({
  type: GET_ADDRESS_DETAILS_BEGIN,
});

export const getAddressDetailsSuccess = (address, pin, id) => ({
  type: GET_ADDRESS_DETAILS_SUCCESS,
  payload: address,
  pin: pin,
  id: id,
});

export const getAddressDetailsFail = (error) => ({
  type: GET_ADDRESS_DETAILS_FAIL,
  payload: error,
});

export const getBillingAddressDetails = ({ data }) => ({
  type: GET_BILLING_ADDRESS_DETAILS,
  data: data,
});

export const getBillingAddressDetailsBegin = () => ({
  type: GET_BILLING_ADDRESS_DETAILS_BEGIN,
});

export const getBillingAddressDetailsSuccess = (address, pin, id) => ({
  type: GET_BILLING_ADDRESS_DETAILS_SUCCESS,
  payload: address,
  pin: pin,
  id: id,
});

export const getBillingAddressDetailsFail = (error) => ({
  type: GET_BILLING_ADDRESS_DETAILS_FAIL,
  payload: error,
});

export const getAddressById = ({ data }) => ({
  type: GET_ADDRESS_BY_ID,
  data: data,
});

export const getAddressByIdBegin = () => ({
  type: GET_ADDRESS_BY_ID_BEGIN,
});

export const getAddressByIdSuccess = (address) => ({
  type: GET_ADDRESS_BY_ID_SUCCESS,
  payload: address,
});

export const getAddressByIdFail = (error) => ({
  type: GET_ADDRESS_BY_ID_FAIL,
  payload: error,
});

export const getBillingAddressById = ({ data }) => ({
  type: GET_BILLING_ADDRESS_BY_ID,
  data: data,
});

export const getBillingAddressByIdBegin = () => ({
  type: GET_BILLING_ADDRESS_BY_ID_BEGIN,
});

export const getBillingAddressByIdSuccess = (address) => ({
  type: GET_BILLING_ADDRESS_BY_ID_SUCCESS,
  payload: address,
});

export const getBillingAddressByIdFail = (error) => ({
  type: GET_BILLING_ADDRESS_BY_ID_FAIL,
  payload: error,
});
