import {
  ADD_AD_IMAGE_BEGIN,
  ADD_AD_IMAGE_FAIL,
  ADD_AD_IMAGE_SUCCESS,
  GET_AD_IMAGE_BEGIN,
  GET_AD_IMAGE_FAIL,
  GET_AD_IMAGE_SUCCESS,
} from "./actionType";

const initial_state = {
  loading: false,
  error: "",
  adImageDetails: {},
};

const AdImage = (state = initial_state, action) => {
  switch (action.type) {
    case GET_AD_IMAGE_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_AD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        adImage: action.payload,
        error: "",
      };
    case GET_AD_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
        adImage: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default AdImage;
