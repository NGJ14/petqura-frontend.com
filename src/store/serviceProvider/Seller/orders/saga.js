import { call, put, takeLatest } from "redux-saga/effects";
import {
  add,
  del,
  get,
  post,
  update,
  getPDFFile,
} from "../../../../helpers/api_helpers";
import {
  getCompletedOrderDetailsBegin,
  getCompletedOrderDetailsSuccess,
  getCompletedOrderDetailsFail,
  getPendingOrderDetailsBegin,
  getPendingOrderDetailsSuccess,
  getPendingOrderDetailsFail,
  getPendingOrderByIdBegin,
  getPendingOrderByIdSuccess,
  getPendingOrderByIdFail,
  getCompletedOrderByIdBegin,
  getCompletedOrderByIdSuccess,
  getCompletedOrderByIdFail,
  changeOrderStatusBegin,
  changeOrderStatusSuccess,
  changeOrderStatusFail,
  getShippedOrderDetailsBegin,
  getShippedOrderDetailsSuccess,
  getShippedOrderDetailsFail,
  getShippedOrderByIdBegin,
  getShippedOrderByIdSuccess,
  getShippedOrderByIdFail,
  SaleReportBegin,
  SaleReportSuccess,
  SaleReportFail,
  gettSellerInvoiceBegin,
  gettSellerInvoiceSuccess,
  gettSellerInvoiceFail,
  exportSellerInvoiceBegin,
  exportSellerInvoiceSuccess,
  exportSellerInvoiceFail,
} from "./action";
import {
  GET_PENDING_ORDER_BY_ID,
  GET_COMPLETED_ORDER_BY_ID,
  GET_PENDING_ORDER_DETAILS,
  GET_COMPLETED_ORDER_DETAILS,
  CHANGE_ORDER_STATUS,
  GET_SHIPPED_ORDER_DETAILS,
  GET_SHIPPED_ORDER_BY_ID,
  SALES_REPORT,
  GET_SELLER_INVOICE,
  EXPORT_SELLER_INVOICE,
} from "./actionType";

function* getPendingOrderDetails({ request }) {
  try {
    yield put(getPendingOrderDetailsBegin());
    const response = yield call(get, "/partner/pending_orders", request);
    if (response) {
      yield put(getPendingOrderDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getPendingOrderDetailsFail(error));
  }
}

function* getCompletedOrderDetails({ request }) {
  try {
    yield put(getCompletedOrderDetailsBegin());
    const response = yield call(get, "/partner/completed_orders", request);
    if (response) {
      yield put(getCompletedOrderDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getCompletedOrderDetailsFail(error));
  }
}

function* getPendingOrderById({ data }) {
  try {
    yield put(getPendingOrderByIdBegin());
    const response = yield call(get, `/partner/pending_order_details`, data);
    if (response) {
      yield put(getPendingOrderByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getPendingOrderByIdFail(error));
  }
}

function* getCompletedOrderById({ data }) {
  try {
    yield put(getCompletedOrderByIdBegin());
    const response = yield call(get, `/partner/completed_order_details`, data);
    if (response) {
      yield put(getCompletedOrderByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getCompletedOrderByIdFail(error));
  }
}

function* getShippedOrderDetails({ request }) {
  try {
    yield put(getShippedOrderDetailsBegin());
    const response = yield call(get, "/partner/shipped_orders", request);
    if (response) {
      yield put(getShippedOrderDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getShippedOrderDetailsFail(error));
  }
}

function* getShippedOrderById({ data }) {
  try {
    yield put(getShippedOrderByIdBegin());
    const response = yield call(get, `/partner/shipped_order_details`, data);
    if (response) {
      yield put(getShippedOrderByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getShippedOrderByIdFail(error));
  }
}

// STATUS

function* changeOrderStatus({ data, callback }) {
  try {
    yield put(changeOrderStatusBegin());
    const response = yield call(update, "/partner/change_order_status", data);
    if (response) {
      yield put(changeOrderStatusSuccess());
      callback && callback();
    }
  } catch (error) {
    yield put(changeOrderStatusFail(error));
  }
}

// SALES REPORT

function* SalesReport({ data, callback }) {
  try {
    yield put(SaleReportBegin());
    const response = yield call(get, "/partner/sales_statistics", data);
    if (response) {
      yield put(SaleReportSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(SaleReportFail(error));
  }
}

function* getSellerInvoice({ data }) {
  try {
    yield put(gettSellerInvoiceBegin());
    const response = yield call(get, `/partner/get_invoice`, data);
    if (response) {
      yield put(gettSellerInvoiceSuccess(response.result));
    }
  } catch (error) {
    yield put(gettSellerInvoiceFail(error));
  }
}

// function* exportSellerInvoice({ saveAs, data }) {
//   try {
//     yield put(exportSellerInvoiceBegin());
//     const response = yield call(getPDFFile, `/partner/download_invoice`, data, {
//       responseType: "arraybuffer",
//       headers: {
//         "Content-Type": "application/pdf",
//       },
//     });
//     // saveAs(response, `invoice_export_${new Date().toLocaleString()}.pdf`);
//     yield put(exportSellerInvoiceSuccess());
//   } catch (error) {
//     yield put(exportSellerInvoiceFail(error));
//   }
// }

function* exportSellerInvoice({ data }) {
  try {
    yield put(exportSellerInvoiceBegin());
    console.log(data);
    const response = yield call(
      getPDFFile,
      `/partner/download_invoice?order_id=` + data.id
    );
    yield put(exportSellerInvoiceSuccess());
  } catch (error) {
    yield put(exportSellerInvoiceFail(error));
  }
}
function* OrderSaga() {
  yield takeLatest(GET_COMPLETED_ORDER_DETAILS, getCompletedOrderDetails);
  yield takeLatest(GET_COMPLETED_ORDER_BY_ID, getCompletedOrderById);
  yield takeLatest(GET_PENDING_ORDER_DETAILS, getPendingOrderDetails);
  yield takeLatest(GET_PENDING_ORDER_BY_ID, getPendingOrderById);
  yield takeLatest(GET_SHIPPED_ORDER_DETAILS, getShippedOrderDetails);
  yield takeLatest(GET_SHIPPED_ORDER_BY_ID, getShippedOrderById);

  yield takeLatest(CHANGE_ORDER_STATUS, changeOrderStatus);
  yield takeLatest(SALES_REPORT, SalesReport);
  yield takeLatest(GET_SELLER_INVOICE, getSellerInvoice);
  yield takeLatest(EXPORT_SELLER_INVOICE, exportSellerInvoice);
}

export default OrderSaga;
