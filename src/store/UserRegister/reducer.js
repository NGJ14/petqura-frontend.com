import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  RESET_USER_REGISTER_ERRORS,
  VERIFY_OTP_BEGIN,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_SUCCESS,
} from "./actionTypes";

export const initial_state = {
  user: {},
  loading: false,
  error: "",
};

const Register = (state = initial_state, action) => {
  switch (action.type) {
    case REGISTER_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        user: action.payload,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: {},
      };

    case VERIFY_OTP_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case VERIFY_OTP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_USER_REGISTER_ERRORS: {
      return {
        ...state,
        error: "",
      };
    }

    default:
      return state;
  }
};

export default Register;
