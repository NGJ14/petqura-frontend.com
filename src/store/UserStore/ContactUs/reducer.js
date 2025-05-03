import {
  ADD_CONTACT_US_DETAILS_BEGIN,
  ADD_CONTACT_US_DETAILS_FAIL,
  ADD_CONTACT_US_DETAILS_SUCCESS,
  GET_HISTORY_DETAILS_BEGIN,
  GET_HISTORY_DETAILS_FAIL,
  GET_HISTORY_DETAILS_SUCCESS,
} from "./actionType";

const initial_state = {
  ContactUs: {},
  ServiceData: {},
  loading: false,
  error: "",
};

const ContactUs = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_CONTACT_US_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_CONTACT_US_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        ContactUs: action.payload,
        error: "",
      };
    case ADD_CONTACT_US_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        ContactUs: "",
        error: action.payload,
      };
    case GET_HISTORY_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_HISTORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        ServiceData: action.payload,
        error: "",
      };
    case GET_HISTORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        ServiceData: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default ContactUs;
