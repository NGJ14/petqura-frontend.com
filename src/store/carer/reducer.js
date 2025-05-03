import {
  ADD_CARER_BEGIN,
  ADD_CARER_FAIL,
  ADD_CARER_SUCCESS,
  CARER_LOGIN_USER_BEGIN,
  CARER_LOGIN_USER_FAIL,
  CARER_LOGIN_USER_SUCCESS,
  GET_CARER_TYPE_BEGIN,
  GET_CARER_TYPE_FAIL,
  GET_CARER_TYPE_SUCCESS,
  GET_CARER_PERSONAL_DETAILS_BEGIN,
  GET_CARER_PERSONAL_DETAILS_FAIL,
  GET_CARER_PERSONAL_DETAILS_SUCCESS,
  GET_CARER_DASHBOARD_DETAILS_BEGIN,
  GET_CARER_DASHBOARD_DETAILS_SUCCESS,
  GET_CARER_DASHBOARD_DETAILS_FAIL,
  UPDATE_CARER_BEGIN,
  UPDATE_CARER_SUCCESS,
  UPDATE_CARER_FAIL,
} from "./actionType";

const initial_state = {
  carers: {},
  loading: false,
  error: "",
  carerInitial: "",
  carer: {},
  carerDashboard: {},
};

const Carer = (state = initial_state, action) => {
  switch (action.type) {
    case GET_CARER_TYPE_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_CARER_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        carers: action.payload,
        carerInitial: action.payload?.result[0]?.id,
      };
    case GET_CARER_TYPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CARER_LOGIN_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case CARER_LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        carer: action.payload,
        error: "",
      };
    case CARER_LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CARER_PERSONAL_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_CARER_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        carer: action.payload,
      };
    case GET_CARER_PERSONAL_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_CARER_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_CARER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        carer: action.payload,
      };
    case ADD_CARER_FAIL:
      return {
        ...state,
        loading: false,
        carer: {},
        error: action.payload,
      };

    case UPDATE_CARER_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case UPDATE_CARER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case UPDATE_CARER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CARER_DASHBOARD_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        carerDashboard: {},
      };
    case GET_CARER_DASHBOARD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        carerDashboard: action.payload,
      };
    case GET_CARER_DASHBOARD_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        carerDashboard: {},
      };
    default:
      return { ...state };
  }
};

export default Carer;
