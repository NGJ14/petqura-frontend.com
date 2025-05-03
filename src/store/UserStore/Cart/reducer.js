import {
  ADD_CART_DETAILS_BEGIN,
  ADD_CART_DETAILS_FAIL,
  ADD_CART_DETAILS_SUCCESS,
  CHANGE_GUEST_QUANTITY_BEGIN,
  CHANGE_GUEST_QUANTITY_FAIL,
  CHANGE_GUEST_QUANTITY_SUCCESS,
  CHANGE_QUANTITY_BEGIN,
  CHANGE_QUANTITY_FAIL,
  CHANGE_QUANTITY_SUCCESS,
  DELETE_CART_DETAILS_BEGIN,
  DELETE_CART_DETAILS_FAIL,
  DELETE_CART_DETAILS_SUCCESS,
  EDIT_CART_DETAILS_BEGIN,
  EDIT_CART_DETAILS_FAIL,
  EDIT_CART_DETAILS_SUCCESS,
  GET_CART_BY_ID_BEGIN,
  GET_CART_BY_ID_FAIL,
  GET_CART_BY_ID_SUCCESS,
  GET_CART_DETAILS_BEGIN,
  GET_CART_DETAILS_FAIL,
  GET_CART_DETAILS_SUCCESS,
  GET_GUEST_CART_BEGIN,
  GET_GUEST_CART_FAIL,
  GET_GUEST_CART_SUCCESS,
} from "./actionType";

const initial_state = {
  ShopCart: {},
  qty_loading: false,
  error: "",
  CartDetails: {},
};

const Cart = (state = initial_state, action) => {
  switch (action.type) {
    case GET_CART_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        ShopCart: {},
      };
    case GET_CART_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        ShopCart: action.payload,
        error: "",
      };
    case GET_CART_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ShopCart: {},
      };

    case GET_GUEST_CART_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case GET_GUEST_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        ShopCart: action.payload,
      };
    case GET_GUEST_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ShopCart: {},
      };

    case GET_CART_BY_ID_BEGIN:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case GET_CART_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        CartDetails: action.payload,
        error: "",
      };
    case GET_CART_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EDIT_CART_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_CART_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_CART_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CART_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_CART_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_CART_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_CART_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_CART_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_CART_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CHANGE_QUANTITY_BEGIN:
      return {
        ...state,
        qty_loading: true,
        error: "",
      };

    case CHANGE_QUANTITY_SUCCESS:
      return {
        ...state,
        qty_loading: false,
        error: "",
      };
    case CHANGE_QUANTITY_FAIL:
      return {
        ...state,
        qty_loading: false,
        error: action.payload,
      };

    case CHANGE_GUEST_QUANTITY_BEGIN:
      return {
        ...state,
        qty_loading: true,
        error: "",
      };

    case CHANGE_GUEST_QUANTITY_SUCCESS:
      return {
        ...state,
        qty_loading: false,
        error: "",
      };
    case CHANGE_GUEST_QUANTITY_FAIL:
      return {
        ...state,
        qty_loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Cart;
