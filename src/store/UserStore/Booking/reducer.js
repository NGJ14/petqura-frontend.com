import {
  GET_APPOINTMENT_PAYMENT_SESSION_BEGIN,
  GET_APPOINTMENT_PAYMENT_SESSION_SUCCESS,
  GET_APPOINTMENT_PAYMENT_SESSION_FAIL,
} from "./actionType";

const initialState = {
  appointmentPaymentSessionId: null,
  loading: false,
  error: "",
};

const appointment = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENT_PAYMENT_SESSION_BEGIN:
      return { ...state, loading: true, error: "" };

    case GET_APPOINTMENT_PAYMENT_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        appointmentPaymentSessionId: action.payload,
        error: "",
      };

    case GET_APPOINTMENT_PAYMENT_SESSION_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default appointment;
