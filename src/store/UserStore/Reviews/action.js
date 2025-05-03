import {
  ADD_REVIEWS,
  ADD_REVIEWS_BEGIN,
  ADD_REVIEWS_FAIL,
  ADD_REVIEWS_SUCCESS,
  DELETE_REVIEWS,
  DELETE_REVIEWS_BEGIN,
  DELETE_REVIEWS_FAIL,
  DELETE_REVIEWS_SUCCESS,
  EDIT_REVIEWS,
  EDIT_REVIEWS_BEGIN,
  EDIT_REVIEWS_FAIL,
  EDIT_REVIEWS_SUCCESS,
  GET_LOGGED_USER_REVIEWS,
  GET_LOGGED_USER_REVIEWS_BEGIN,
  GET_LOGGED_USER_REVIEWS_FAIL,
  GET_LOGGED_USER_REVIEWS_SUCCESS,
  GET_REVIEWS,
  GET_REVIEWS_BEGIN,
  GET_REVIEWS_BY_ID,
  GET_REVIEWS_BY_ID_BEGIN,
  GET_REVIEWS_BY_ID_FAIL,
  GET_REVIEWS_BY_ID_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_SUCCESS,
} from "./actionType";

export const editReviews = ({ reviews, callback }) => ({
  type: EDIT_REVIEWS,
  reviews: reviews,
  callback: callback,
});

export const editReviewsBegin = () => ({
  type: EDIT_REVIEWS_BEGIN,
});

export const editReviewsSuccess = () => ({
  type: EDIT_REVIEWS_SUCCESS,
});

export const editReviewsFail = (error) => ({
  type: EDIT_REVIEWS_FAIL,
  payload: error,
});

export const addReviews = ({ reviews, callback }) => ({
  type: ADD_REVIEWS,
  reviews: reviews,
  callback: callback,
});

export const addReviewsBegin = () => ({
  type: ADD_REVIEWS_BEGIN,
});

export const addReviewsSuccess = () => ({
  type: ADD_REVIEWS_SUCCESS,
});

export const addReviewsFail = (error) => ({
  type: ADD_REVIEWS_FAIL,
  payload: error,
});

export const deleteReviews = ({ reviews }) => ({
  type: DELETE_REVIEWS,
  reviews: reviews,
});

export const deleteReviewsBegin = () => ({
  type: DELETE_REVIEWS_BEGIN,
});

export const deleteReviewsSuccess = () => ({
  type: DELETE_REVIEWS_SUCCESS,
});

export const deleteReviewsFail = (error) => ({
  type: DELETE_REVIEWS_FAIL,
  payload: error,
});

export const getReviews = ({ data }) => ({
  type: GET_REVIEWS,
  data: data,
});

export const getReviewsBegin = () => ({
  type: GET_REVIEWS_BEGIN,
});

export const getReviewsSuccess = (reviews) => ({
  type: GET_REVIEWS_SUCCESS,
  payload: reviews,
});

export const getReviewsFail = (error) => ({
  type: GET_REVIEWS_FAIL,
  payload: error,
});

export const getReviewById = ({ data }) => ({
  type: GET_REVIEWS_BY_ID,
  data: data,
});

export const getReviewByIdBegin = () => ({
  type: GET_REVIEWS_BY_ID_BEGIN,
});

export const getReviewByIdSuccess = (review) => ({
  type: GET_REVIEWS_BY_ID_SUCCESS,
  payload: review,
});

export const getReviewByIdFail = (error) => ({
  type: GET_REVIEWS_BY_ID_FAIL,
  payload: error,
});

export const getLoggedUserReviews = ({ data }) => ({
  type: GET_LOGGED_USER_REVIEWS,
  data: data,
});

export const getLoggedUserReviewsBegin = () => ({
  type: GET_LOGGED_USER_REVIEWS_BEGIN,
});

export const getLoggedUserReviewsSuccess = (reviews) => ({
  type: GET_LOGGED_USER_REVIEWS_SUCCESS,
  payload: reviews,
});

export const getLoggedUserReviewsFail = (error) => ({
  type: GET_LOGGED_USER_REVIEWS_FAIL,
  payload: error,
});
