import {
  ADD_ADDRESS_DETAILS_BEGIN,
  ADD_ADDRESS_DETAILS_FAIL,
  ADD_ADDRESS_DETAILS_SUCCESS,
  DELETE_ADDRESS_DETAILS_BEGIN,
  DELETE_ADDRESS_DETAILS_FAIL,
  DELETE_ADDRESS_DETAILS_SUCCESS,
  EDIT_ADDRESS_DETAILS_BEGIN,
  EDIT_ADDRESS_DETAILS_FAIL,
  EDIT_ADDRESS_DETAILS_SUCCESS,
  GET_ADDRESS_BY_ID_BEGIN,
  GET_ADDRESS_BY_ID_FAIL,
  GET_ADDRESS_BY_ID_SUCCESS,
  GET_BILLING_ADDRESS_BY_ID_BEGIN,
  GET_BILLING_ADDRESS_BY_ID_FAIL,
  GET_BILLING_ADDRESS_BY_ID_SUCCESS,
  GET_ADDRESS_DETAILS_BEGIN,
  GET_ADDRESS_DETAILS_FAIL,
  GET_ADDRESS_DETAILS_SUCCESS,
  GET_BILLING_ADDRESS_DETAILS_BEGIN,
  GET_BILLING_ADDRESS_DETAILS_SUCCESS,
  GET_BILLING_ADDRESS_DETAILS_FAIL,
} from "./actionType";

const initial_state = {
  addresses: {},
  address: {},
  loading: false,
  error: "",
  address_pin: "",
  billing_address: {},
  billing_addresses: {},
  billing_address_pin: "",
  id: "",
  billing_address_id: "",
};

const Address = (state = initial_state, action) => {
  switch (action.type) {
    case GET_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        addresses: action.payload,
        address_pin: action?.pin,
        id: action?.id,
      };
    case GET_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case GET_BILLING_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_BILLING_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        billing_addresses: action.payload,
        billing_address_pin: action?.pin,
        billing_address_id: action?.id,
      };
    case GET_BILLING_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case GET_ADDRESS_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_ADDRESS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        address: action.payload,
      };
    case GET_ADDRESS_BY_ID_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case GET_BILLING_ADDRESS_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_BILLING_ADDRESS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        billing_address: action.payload,
      };
    case GET_BILLING_ADDRESS_BY_ID_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case EDIT_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case ADD_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case DELETE_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Address;
