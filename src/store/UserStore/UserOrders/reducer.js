import {
  GET_INVOICE_BEGIN,
  GET_INVOICE_FAIL,
  GET_INVOICE_SUCCESS,
  GET_ORDER_BY_ID_BEGIN,
  GET_ORDER_BY_ID_FAIL,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_DETAILS_BEGIN,
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_SUCCESS,
} from "./actionType";

const initial_state = {
  orders: {},
  orderDetails: {},
  loading: false,
  error: "",
  invoice: {},
};

const UserOrder = (state = initial_state, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        orders: action.payload,
      };
    case GET_ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        orders: "",
      };

    case GET_ORDER_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        orderDetails: action.payload,
      };
    case GET_ORDER_BY_ID_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        orderDetails: "",
      };

    case GET_INVOICE_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        invoice: action.payload,
      };
    case GET_INVOICE_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        invoice: "",
      };

    default:
      return { ...state };
  }
};

export default UserOrder;
