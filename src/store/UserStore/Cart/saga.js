import { call, put, takeLatest } from "redux-saga/effects";
import { add, del, get, update } from "../../../helpers/api_helpers";
import {
  editCartDetailsBegin,
  editCartDetailsSuccess,
  editCartDetailsFail,
  deleteCartDetailsBegin,
  deleteCartDetailsSuccess,
  deleteCartDetailsFail,
  getCartByIdBegin,
  getCartByIdSuccess,
  getCartByIdFail,
  addCartDetailsBegin,
  addCartDetailsSuccess,
  addCartDetailsFail,
  getCartDetailsBegin,
  getCartDetailsSuccess,
  getCartDetailsFail,
  changeQuantityBegin,
  changeQuantitySuccess,
  changeQuantityFail,
  getGuestCartBegin,
  getGuestCartSuccess,
  getGuestCartFail,
  changeGuestQuantityBegin,
  changeGuestQuantitySuccess,
  changeGuestQuantityFail,
} from "./action";
import {
  ADD_CART_DETAILS,
  CHANGE_GUEST_QUANTITY,
  CHANGE_QUANTITY,
  DELETE_CART_DETAILS,
  EDIT_CART_DETAILS,
  GET_CART_BY_ID,
  GET_CART_DETAILS,
  GET_GUEST_CART,
} from "./actionType";

function* editCartDetails({ user, callback }) {
  try {
    yield put(editCartDetailsBegin());
    const response = yield call(update, "/user_Carts", user);
    if (response) {
      yield put(editCartDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(editCartDetailsFail(error));
  }
}

function* addCartDetails({ Cart, callback }) {
  try {
    yield put(addCartDetailsBegin());
    let response = {};
    if (Cart.guest_id) {
      response = yield call(add, "/add_to_guest_cart", Cart);
    } else {
      response = yield call(add, "/add_to_cart", Cart);
    }
    yield put(addCartDetailsSuccess(response.result));
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(addCartDetailsFail(error));
  }
}

function* deleteCartDetails({ user }) {
  try {
    yield put(deleteCartDetailsBegin());
    const response = yield call(del, "/user_Carts", user);
    if (response) {
      yield put(deleteCartDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(deleteCartDetailsFail(error));
  }
}

function* getCartDetails() {
  try {
    yield put(getCartDetailsBegin());
    const response = yield call(get, "/view_cart");
    if (response) {
      yield put(getCartDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getCartDetailsFail(error));
  }
}

function* getGuestCart({ data }) {
  try {
    yield put(getGuestCartBegin());
    const response = yield call(get, "/view_guest_cart", data);
    if (response) {
      yield put(getGuestCartSuccess(response.result));
    }
  } catch (error) {
    yield put(getGuestCartFail(error));
  }
}

function* getCartById({ data }) {
  try {
    yield put(getCartByIdBegin());
    const response = yield call(get, `/get_Cart`, data);
    if (response) {
      yield put(getCartByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getCartByIdFail(error));
  }
}

// Quantity

function* changeQuantity({ data, callback }) {
  try {
    yield put(changeQuantityBegin());
    const response = yield call(update, "/change_quantity_cart", data);
    if (response) {
      yield put(changeQuantitySuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(changeQuantityFail(error));
  }
}

function* changeGuestQuantity({ data, callback }) {
  try {
    yield put(changeGuestQuantityBegin());
    const response = yield call(update, "/change_quantity_guest_cart", data);
    if (response) {
      yield put(changeGuestQuantitySuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(changeGuestQuantityFail(error));
  }
}

function* CartSaga() {
  yield takeLatest(EDIT_CART_DETAILS, editCartDetails);
  yield takeLatest(ADD_CART_DETAILS, addCartDetails);
  yield takeLatest(DELETE_CART_DETAILS, deleteCartDetails);
  yield takeLatest(GET_CART_DETAILS, getCartDetails);
  yield takeLatest(GET_GUEST_CART, getGuestCart);
  yield takeLatest(GET_CART_BY_ID, getCartById);
  yield takeLatest(CHANGE_QUANTITY, changeQuantity);
  yield takeLatest(CHANGE_GUEST_QUANTITY, changeGuestQuantity);
}

export default CartSaga;
