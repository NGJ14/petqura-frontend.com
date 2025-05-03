import {
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  FORGOT_VERIFY_OTP_BEGIN,
  FORGOT_VERIFY_OTP_FAIL,
  FORGOT_VERIFY_OTP_SUCCESS,
  FORGOT_VERIFY_PASSWORD_BEGIN,
  FORGOT_VERIFY_PASSWORD_SUCCESS,
  FORGOT_VERIFY_PASSWORD_FAIL,
  RESET_ERRORS,
} from "./actionTypes";

export const initial_state = {
  user: {},
  loading: false,
  error: "",
};

const Login = (state = initial_state, action) => {
  switch (action.type) {
    case LOGIN_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FORGOT_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FORGOT_VERIFY_OTP_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case FORGOT_VERIFY_OTP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FORGOT_VERIFY_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_VERIFY_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case FORGOT_VERIFY_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_ERRORS: {
      return {
        ...state,
        error: "",
      };
    }

    default:
      return state;
  }
};

export default Login;
