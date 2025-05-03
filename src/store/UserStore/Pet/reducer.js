import {
  ADD_PET_DETAILS_BEGIN,
  ADD_PET_DETAILS_FAIL,
  ADD_PET_DETAILS_SUCCESS,
  DELETE_PET_DETAILS_BEGIN,
  DELETE_PET_DETAILS_FAIL,
  DELETE_PET_DETAILS_SUCCESS,
  EDIT_PET_DETAILS_BEGIN,
  EDIT_PET_DETAILS_FAIL,
  EDIT_PET_DETAILS_SUCCESS,
  GET_PET_BY_ID_BEGIN,
  GET_PET_BY_ID_FAIL,
  GET_PET_BY_ID_SUCCESS,
  GET_PET_DETAILS_BEGIN,
  GET_PET_DETAILS_FAIL,
  GET_PET_DETAILS_SUCCESS,
} from "./actionType";

const initial_state = {
  pet: {},
  loading: false,
  error: "",
  petDetails: {},
};

const Pet = (state = initial_state, action) => {
  switch (action.type) {
    case GET_PET_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        pet: action.payload,
        error: "",
      };
    case GET_PET_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_PET_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        petDetails: {},
      };
    case GET_PET_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        petDetails: action.payload,
        error: "",
      };
    case GET_PET_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EDIT_PET_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_PET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_PET_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PET_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_PET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_PET_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PET_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_PET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_PET_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Pet;
