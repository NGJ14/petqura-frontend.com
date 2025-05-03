import {
  GET_DELIVERY_DETAILS_BEGIN,
  GET_DELIVERY_DETAILS_FAIL,
  GET_DELIVERY_DETAILS_SUCCESS,
} from "./actionType";

const initial_state = {
  Delivery: {},
  loading: false,
  error: "",
};

const Delivery = (state = initial_state, action) => {
  switch (action.type) {
    case GET_DELIVERY_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_DELIVERY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        Delivery: action.payload,
        error: "",
      };
    case GET_DELIVERY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        Delivery: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Delivery;
