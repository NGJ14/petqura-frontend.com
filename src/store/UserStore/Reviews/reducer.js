import {
  ADD_REVIEWS_BEGIN,
  ADD_REVIEWS_FAIL,
  ADD_REVIEWS_SUCCESS,
  DELETE_REVIEWS_BEGIN,
  DELETE_REVIEWS_FAIL,
  DELETE_REVIEWS_SUCCESS,
  EDIT_REVIEWS_BEGIN,
  EDIT_REVIEWS_FAIL,
  EDIT_REVIEWS_SUCCESS,
  GET_LOGGED_USER_REVIEWS_BEGIN,
  GET_LOGGED_USER_REVIEWS_FAIL,
  GET_LOGGED_USER_REVIEWS_SUCCESS,
  GET_REVIEWS_BEGIN,
  GET_REVIEWS_BY_ID_BEGIN,
  GET_REVIEWS_BY_ID_FAIL,
  GET_REVIEWS_BY_ID_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_SUCCESS,
} from "./actionType";

const initial_state = {
  reviewData: {},
  review: {},
  loading: false,
  error: "",
  userReview: {},
};

const Reviews = (state = initial_state, action) => {
  switch (action.type) {
    case GET_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        reviewData: {},
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        reviewData: action.payload,
      };
    case GET_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        reviewData: {},
      };

    case GET_LOGGED_USER_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        userReview: {},
      };
    case GET_LOGGED_USER_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        userReview: action.payload,
      };
    case GET_LOGGED_USER_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        userReview: {},
      };

    case GET_REVIEWS_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_REVIEWS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        review: action.payload,
      };
    case GET_REVIEWS_BY_ID_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        review: {},
      };

    case EDIT_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case ADD_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case DELETE_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Reviews;
