import {
  ACCEPT_RESCHEDULE_STATUS_BEGIN,
  ACCEPT_RESCHEDULE_STATUS_FAIL,
  ACCEPT_RESCHEDULE_STATUS_SUCCESS,
  GET_APPOINTMENT_BY_ID_BEGIN,
  GET_APPOINTMENT_BY_ID_FAIL,
  GET_APPOINTMENT_BY_ID_SUCCESS,
  GET_APPOINTMENT_DETAILS_BEGIN,
  GET_APPOINTMENT_DETAILS_FAIL,
  GET_APPOINTMENT_DETAILS_SUCCESS,
  REJECT_RESCHEDULE_STATUS_BEGIN,
  REJECT_RESCHEDULE_STATUS_FAIL,
  REJECT_RESCHEDULE_STATUS_SUCCESS,
} from "./actionType";

const initial_state = {
  appointmentDetails: {},
  appointments: {},
  loading: false,
  error: "",
};

const Appointment = (state = initial_state, action) => {
  switch (action.type) {
    case GET_APPOINTMENT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_APPOINTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        appointments: action.payload,
      };
    case GET_APPOINTMENT_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        appointments: {},
      };

    case GET_APPOINTMENT_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_APPOINTMENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        appointmentDetails: action.payload,
      };
    case GET_APPOINTMENT_BY_ID_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        appointmentDetails: {},
      };

    case ACCEPT_RESCHEDULE_STATUS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ACCEPT_RESCHEDULE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ACCEPT_RESCHEDULE_STATUS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case REJECT_RESCHEDULE_STATUS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case REJECT_RESCHEDULE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case REJECT_RESCHEDULE_STATUS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Appointment;
