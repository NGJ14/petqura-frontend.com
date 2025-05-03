import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  EDIT_PERSONAL_DETAILS,
  EDIT_PERSONAL_DETAILS_BEGIN,
  EDIT_PERSONAL_DETAILS_FAIL,
  EDIT_PERSONAL_DETAILS_SUCCESS,
  GET_PERSONAL_DETAILS,
  GET_PERSONAL_DETAILS_BEGIN,
  GET_PERSONAL_DETAILS_FAIL,
  GET_PERSONAL_DETAILS_SUCCESS,
  RESET_PERSONAL_ERROR,
} from "./actionType";

export const editPersonalDetails = ({ user, callBack }) => ({
  type: EDIT_PERSONAL_DETAILS,
  user: user,
  callBack: callBack,
});

export const editPersonalDetailsBegin = () => ({
  type: EDIT_PERSONAL_DETAILS_BEGIN,
});

export const editPersonalDetailsSuccess = () => ({
  type: EDIT_PERSONAL_DETAILS_SUCCESS,
});

export const editPersonalDetailsFail = (error) => ({
  type: EDIT_PERSONAL_DETAILS_FAIL,
  payload: error,
});

export const getPersonalDetails = () => ({
  type: GET_PERSONAL_DETAILS,
});

export const getPersonalDetailsBegin = () => ({
  type: GET_PERSONAL_DETAILS_BEGIN,
});

export const getPersonalDetailsSuccess = (user) => ({
  type: GET_PERSONAL_DETAILS_SUCCESS,
  payload: user,
});

export const getPersonalDetailsFail = (error) => ({
  type: GET_PERSONAL_DETAILS_FAIL,
  payload: error,
});

export const changePassword = ({ data, callback }) => ({
  type: CHANGE_PASSWORD,
  data: data,
  callback: callback,
});

export const changePasswordBegin = () => ({
  type: CHANGE_PASSWORD_BEGIN,
});

export const changePasswordSuccess = (success) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  success: success,
});

export const changePasswordFail = (error) => ({
  type: CHANGE_PASSWORD_FAIL,
  payload: error,
});

export const resetPersonalError = () => ({
  type: RESET_PERSONAL_ERROR,
});
