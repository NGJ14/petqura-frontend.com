import {
  INITIATE_REGISTER_CARER_BEGIN,
  INITIATE_REGISTER_CARER_SUCCESS,
  INITIATE_REGISTER_CARER_FAIL,
  REGISTER_CARER_BEGIN,
  REGISTER_CARER_FAIL,
  REGISTER_CARER_SUCCESS,
  SEND_CARER_OTP_BEGIN,
  SEND_CARER_OTP_FAIL,
  SEND_CARER_OTP_SUCCESS,
  VERIFY_CARER_OTP_BEGIN,
  VERIFY_CARER_OTP_FAIL,
  VERIFY_CARER_OTP_SUCCESS,
} from "./actionTypes";

export const initial_state = {
  loading: false,
  error: "",
};

const CarerRegister = (state = initial_state, action) => {
  switch (action.type) {
    case INITIATE_REGISTER_CARER_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case INITIATE_REGISTER_CARER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case INITIATE_REGISTER_CARER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REGISTER_CARER_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case REGISTER_CARER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case REGISTER_CARER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case VERIFY_CARER_OTP_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case VERIFY_CARER_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case VERIFY_CARER_OTP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEND_CARER_OTP_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SEND_CARER_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case SEND_CARER_OTP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CarerRegister;
