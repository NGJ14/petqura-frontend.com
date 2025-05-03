import {
  ADD_AD_IMAGE,
  ADD_AD_IMAGE_BEGIN,
  ADD_AD_IMAGE_FAIL,
  ADD_AD_IMAGE_SUCCESS,
  DELETE_AD_IMAGE,
  DELETE_AD_IMAGE_BEGIN,
  DELETE_AD_IMAGE_FAIL,
  DELETE_AD_IMAGE_SUCCESS,
  EDIT_AD_IMAGE,
  EDIT_AD_IMAGE_BEGIN,
  EDIT_AD_IMAGE_FAIL,
  EDIT_AD_IMAGE_SUCCESS,
  GET_AD_IMAGE,
  GET_AD_IMAGE_BEGIN,
  GET_AD_IMAGE_FAIL,
  GET_AD_IMAGE_SUCCESS,
} from "./actionType";

export const getAdImage = () => ({
  type: GET_AD_IMAGE,
});

export const getAdImageBegin = () => ({
  type: GET_AD_IMAGE_BEGIN,
});

export const getAdImageSuccess = (ADIMAGE) => ({
  type: GET_AD_IMAGE_SUCCESS,
  payload: ADIMAGE,
});

export const getAdImageFail = (error) => ({
  type: GET_AD_IMAGE_FAIL,
  payload: error,
});
