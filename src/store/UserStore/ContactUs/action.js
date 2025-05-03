import {
  ADD_CONTACT_US_DETAILS,
  ADD_CONTACT_US_DETAILS_BEGIN,
  ADD_CONTACT_US_DETAILS_FAIL,
  ADD_CONTACT_US_DETAILS_SUCCESS,
  GET_HISTORY_DETAILS,
  GET_HISTORY_DETAILS_BEGIN,
  GET_HISTORY_DETAILS_FAIL,
  GET_HISTORY_DETAILS_SUCCESS,
} from "./actionType";

export const addContactUSDetails = ({ data, callback }) => ({
  type: ADD_CONTACT_US_DETAILS,
  data: data,
  callback: callback,
});

export const addContactUSDetailsBegin = () => ({
  type: ADD_CONTACT_US_DETAILS_BEGIN,
});

export const addContactUSDetailsSuccess = () => ({
  type: ADD_CONTACT_US_DETAILS_SUCCESS,
});

export const addContactUSDetailsFail = (error) => ({
  type: ADD_CONTACT_US_DETAILS_FAIL,
  payload: error,
});

export const getHistoryDetails = () => ({
  type: GET_HISTORY_DETAILS,
});

export const getHistoryDetailsBegin = () => ({
  type: GET_HISTORY_DETAILS_BEGIN,
});

export const getHistoryDetailsSuccess = (HISTORY) => ({
  payload: HISTORY,
  type: GET_HISTORY_DETAILS_SUCCESS,
});

export const getHistoryDetailsFail = (error) => ({
  type: GET_HISTORY_DETAILS_FAIL,
  payload: error,
});
