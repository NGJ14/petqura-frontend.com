import {
  ADD_CART_DETAILS,
  ADD_CART_DETAILS_BEGIN,
  ADD_CART_DETAILS_FAIL,
  ADD_CART_DETAILS_SUCCESS,
  CHANGE_GUEST_QUANTITY,
  CHANGE_GUEST_QUANTITY_BEGIN,
  CHANGE_GUEST_QUANTITY_FAIL,
  CHANGE_GUEST_QUANTITY_SUCCESS,
  CHANGE_QUANTITY,
  CHANGE_QUANTITY_BEGIN,
  CHANGE_QUANTITY_FAIL,
  CHANGE_QUANTITY_SUCCESS,
  DELETE_CART_DETAILS,
  DELETE_CART_DETAILS_BEGIN,
  DELETE_CART_DETAILS_FAIL,
  DELETE_CART_DETAILS_SUCCESS,
  EDIT_CART_DETAILS,
  EDIT_CART_DETAILS_BEGIN,
  EDIT_CART_DETAILS_FAIL,
  EDIT_CART_DETAILS_SUCCESS,
  GET_CART_BY_ID,
  GET_CART_BY_ID_BEGIN,
  GET_CART_BY_ID_FAIL,
  GET_CART_BY_ID_SUCCESS,
  GET_CART_DETAILS,
  GET_CART_DETAILS_BEGIN,
  GET_CART_DETAILS_FAIL,
  GET_CART_DETAILS_SUCCESS,
  GET_GUEST_CART,
  GET_GUEST_CART_BEGIN,
  GET_GUEST_CART_FAIL,
  GET_GUEST_CART_SUCCESS,
} from "./actionType";

export const getGuestCart = ({ callback, data }) => ({
  type: GET_GUEST_CART,
  data: data,
  callback: callback,
});

export const getGuestCartBegin = () => ({
  type: GET_GUEST_CART_BEGIN,
});

export const getGuestCartSuccess = (guest) => ({
  type: GET_GUEST_CART_SUCCESS,
  payload: guest,
});

export const getGuestCartFail = (error) => ({
  type: GET_GUEST_CART_FAIL,
  payload: error,
});

export const editCartDetails = ({ user, callback }) => ({
  type: EDIT_CART_DETAILS,
  user: user,
  callback: callback,
});

export const editCartDetailsBegin = () => ({
  type: EDIT_CART_DETAILS_BEGIN,
});

export const editCartDetailsSuccess = () => ({
  type: EDIT_CART_DETAILS_SUCCESS,
});

export const editCartDetailsFail = (error) => ({
  type: EDIT_CART_DETAILS_FAIL,
  payload: error,
});

export const addCartDetails = ({ Cart, callback }) => ({
  type: ADD_CART_DETAILS,
  Cart: Cart,
  callback: callback,
});

export const addCartDetailsBegin = () => ({
  type: ADD_CART_DETAILS_BEGIN,
});

export const addCartDetailsSuccess = () => ({
  type: ADD_CART_DETAILS_SUCCESS,
});

export const addCartDetailsFail = (error) => ({
  type: ADD_CART_DETAILS_FAIL,
  payload: error,
});

export const deleteCartDetails = ({ user }) => ({
  type: DELETE_CART_DETAILS,
  user: user,
});

export const deleteCartDetailsBegin = () => ({
  type: DELETE_CART_DETAILS_BEGIN,
});

export const deleteCartDetailsSuccess = () => ({
  type: DELETE_CART_DETAILS_SUCCESS,
});

export const deleteCartDetailsFail = (error) => ({
  type: DELETE_CART_DETAILS_FAIL,
  payload: error,
});

export const getCartDetails = () => ({
  type: GET_CART_DETAILS,
});

export const getCartDetailsBegin = () => ({
  type: GET_CART_DETAILS_BEGIN,
});

export const getCartDetailsSuccess = (Cart) => ({
  type: GET_CART_DETAILS_SUCCESS,
  payload: Cart,
});

export const getCartDetailsFail = (error) => ({
  type: GET_CART_DETAILS_FAIL,
  payload: error,
});

export const getCartById = ({ data }) => ({
  type: GET_CART_BY_ID,
  data: data,
});

export const getCartByIdBegin = () => ({
  type: GET_CART_BY_ID_BEGIN,
});

export const getCartByIdSuccess = (Cart) => ({
  type: GET_CART_BY_ID_SUCCESS,
  payload: Cart,
});

export const getCartByIdFail = (error) => ({
  type: GET_CART_BY_ID_FAIL,
  payload: error,
});

// Quantity

export const changeQuantity = ({ data, callback }) => ({
  type: CHANGE_QUANTITY,
  data: data,
  callback: callback,
});

export const changeQuantityBegin = () => ({
  type: CHANGE_QUANTITY_BEGIN,
});
export const changeQuantitySuccess = () => ({
  type: CHANGE_QUANTITY_SUCCESS,
});
export const changeQuantityFail = (error) => ({
  type: CHANGE_QUANTITY_FAIL,
  payload: error,
});

export const changeGuestQuantity = ({ data, callback }) => ({
  type: CHANGE_GUEST_QUANTITY,
  data: data,
  callback: callback,
});

export const changeGuestQuantityBegin = () => ({
  type: CHANGE_GUEST_QUANTITY_BEGIN,
});
export const changeGuestQuantitySuccess = () => ({
  type: CHANGE_GUEST_QUANTITY_SUCCESS,
});
export const changeGuestQuantityFail = (error) => ({
  type: CHANGE_GUEST_QUANTITY_FAIL,
  payload: error,
});
