import { call, put, takeLatest } from "redux-saga/effects";
import { add, del, get, update } from "../../../helpers/api_helpers";
import {
  getOrderByIdBegin,
  getOrderByIdSuccess,
  getOrderByIdFail,
  getOrderDetailsBegin,
  getOrderDetailsSuccess,
  getOrderDetailsFail,
  getInvoiceBegin,
  getInvoiceSuccess,
  getInvoiceFail,
} from "./action";
import { GET_INVOICE, GET_ORDER_BY_ID, GET_ORDER_DETAILS } from "./actionType";

function* getOrderDetails({ request }) {
  try {
    yield put(getOrderDetailsBegin());
    const response = yield call(get, "/view_orders", request);
    if (response) {
      yield put(getOrderDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getOrderDetailsFail(error));
  }
}

function* getOrderById({ data }) {
  try {
    yield put(getOrderByIdBegin());
    const response = yield call(get, `/view_order_details`, data);
    if (response) {
      yield put(getOrderByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getOrderByIdFail(error));
  }
}

function* getInvoice({ data }) {
  try {
    yield put(getInvoiceBegin());
    const response = yield call(get, `/user_order_invoice`, data);
    if (response) {
      yield put(getInvoiceSuccess(response.result));
    }
  } catch (error) {
    yield put(getInvoiceFail(error));
  }
}

function* UserOrderSaga() {
  yield takeLatest(GET_ORDER_DETAILS, getOrderDetails);
  yield takeLatest(GET_ORDER_BY_ID, getOrderById);
  yield takeLatest(GET_INVOICE, getInvoice);
}

export default UserOrderSaga;
