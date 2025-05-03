import {
  CARER_LOGIN_USER,
  CARER_LOGIN_USER_BEGIN,
  CARER_LOGIN_USER_FAIL,
  CARER_LOGIN_USER_SUCCESS,
  GET_CARER_TYPE,
  GET_CARER_TYPE_BEGIN,
  GET_CARER_TYPE_FAIL,
  GET_CARER_TYPE_SUCCESS,
  GET_CARER_PERSONAL_DETAILS,
  GET_CARER_PERSONAL_DETAILS_BEGIN,
  GET_CARER_PERSONAL_DETAILS_SUCCESS,
  GET_CARER_PERSONAL_DETAILS_FAIL,
  ADD_CARER_BEGIN,
  ADD_CARER,
  ADD_CARER_SUCCESS,
  ADD_CARER_FAIL,
  GET_CARER_DASHBOARD_DETAILS,
  GET_CARER_DASHBOARD_DETAILS_BEGIN,
  GET_CARER_DASHBOARD_DETAILS_FAIL,
  GET_CARER_DASHBOARD_DETAILS_SUCCESS,
  UPDATE_CARER,
  UPDATE_CARER_BEGIN,
  UPDATE_CARER_SUCCESS,
  UPDATE_CARER_FAIL,
} from "./actionType";

// Carer Type

export const getCarerType = () => ({
  type: GET_CARER_TYPE,
});

export const getCarerTypeBegin = () => ({
  type: GET_CARER_TYPE_BEGIN,
});

export const getCarerTypeSuccess = (user) => ({
  type: GET_CARER_TYPE_SUCCESS,
  payload: user,
});

export const getCarerTypeFail = (error) => ({
  type: GET_CARER_TYPE_FAIL,
  payload: error,
});

// Carer Login

export const carerLoginUser = ({ data, callback }) => ({
  type: CARER_LOGIN_USER,
  data: data,
  callback: callback,
});

export const carerLoginUserBegin = () => ({
  type: CARER_LOGIN_USER_BEGIN,
});

export const carerLoginUserSuccess = (user) => ({
  type: CARER_LOGIN_USER_SUCCESS,
  payload: user,
});

export const carerLoginUserFail = (error) => ({
  type: CARER_LOGIN_USER_FAIL,
  payload: error,
});

// Carer Personal Data

export const getCarerPersonalDetails = () => ({
  type: GET_CARER_PERSONAL_DETAILS,
});

export const getCarerPersonalDetailsBegin = () => ({
  type: GET_CARER_PERSONAL_DETAILS_BEGIN,
});

export const getCarerPersonalDetailsSuccess = (user) => ({
  type: GET_CARER_PERSONAL_DETAILS_SUCCESS,
  payload: user,
});

export const getCarerPersonalDetailsFail = (error) => ({
  type: GET_CARER_PERSONAL_DETAILS_FAIL,
  payload: error,
});

// Complete Carer Personal Data

export const addCarer = ({ data, callback, idImage }) => ({
  type: ADD_CARER,
  data: data,
  callback: callback,
  idImage: idImage,
  // benificaryImage: benificaryImage,
});

export const addCarerBegin = () => ({
  type: ADD_CARER_BEGIN,
});

export const addCarerSuccess = (user) => ({
  type: ADD_CARER_SUCCESS,
  payload: user,
});

export const addCarerFail = (error) => ({
  type: ADD_CARER_FAIL,
  payload: error,
});

// Update Carer Personal Data

export const updateCarer = ({
  data,
  image,
  isImage,
  callback,
  imageChanged,
}) => ({
  type: UPDATE_CARER,
  data: data,
  callback: callback,
  isImage: isImage,
  image: image,
  imageChanged: imageChanged,
});

export const updateCarerBegin = () => ({
  type: UPDATE_CARER_BEGIN,
});

export const updateCarerSuccess = () => ({
  type: UPDATE_CARER_SUCCESS,
});

export const updateCarerFail = (error) => ({
  type: UPDATE_CARER_FAIL,
  payload: error,
});

// Carer Dashboard

export const getCarerDashboardDetails = () => ({
  type: GET_CARER_DASHBOARD_DETAILS,
});

export const getCarerDashboardDetailsBegin = () => ({
  type: GET_CARER_DASHBOARD_DETAILS_BEGIN,
});

export const getCarerDashboardDetailsSuccess = (user) => ({
  type: GET_CARER_DASHBOARD_DETAILS_SUCCESS,
  payload: user,
});

export const getCarerDashboardDetailsFail = (error) => ({
  type: GET_CARER_DASHBOARD_DETAILS_FAIL,
  payload: error,
});
