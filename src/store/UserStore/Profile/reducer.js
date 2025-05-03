import {
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  EDIT_PERSONAL_DETAILS_BEGIN,
  EDIT_PERSONAL_DETAILS_FAIL,
  EDIT_PERSONAL_DETAILS_SUCCESS,
  GET_PERSONAL_DETAILS_BEGIN,
  GET_PERSONAL_DETAILS_FAIL,
  GET_PERSONAL_DETAILS_SUCCESS,
  RESET_PERSONAL_ERROR,
} from "./actionType";

const initial_state = {
  user: {},
  loading: false,
  error: "",
  message: "",
};

const Profile = (state = initial_state, action) => {
  switch (action.type) {
    case EDIT_PERSONAL_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_PERSONAL_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case GET_PERSONAL_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        user: action.payload,
      };
    case GET_PERSONAL_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case CHANGE_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        message: action?.success,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_PERSONAL_ERROR:
      return {
        ...state,
        error: "",
        message: "",
      };

    default:
      return { ...state };
  }
};

export default Profile;
