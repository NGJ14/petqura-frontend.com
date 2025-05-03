import {
  CHANGE_ORDER_STATUS,
  CHANGE_ORDER_STATUS_BEGIN,
  CHANGE_ORDER_STATUS_FAIL,
  CHANGE_ORDER_STATUS_SUCCESS,
  GET_COMPLETED_ORDER_BY_ID,
  GET_COMPLETED_ORDER_BY_ID_BEGIN,
  GET_COMPLETED_ORDER_BY_ID_FAIL,
  GET_COMPLETED_ORDER_BY_ID_SUCCESS,
  GET_COMPLETED_ORDER_DETAILS,
  GET_COMPLETED_ORDER_DETAILS_BEGIN,
  GET_COMPLETED_ORDER_DETAILS_FAIL,
  GET_COMPLETED_ORDER_DETAILS_SUCCESS,
  GET_PENDING_ORDER_BY_ID,
  GET_PENDING_ORDER_BY_ID_BEGIN,
  GET_PENDING_ORDER_BY_ID_FAIL,
  GET_PENDING_ORDER_BY_ID_SUCCESS,
  GET_PENDING_ORDER_DETAILS,
  GET_PENDING_ORDER_DETAILS_BEGIN,
  GET_PENDING_ORDER_DETAILS_FAIL,
  GET_PENDING_ORDER_DETAILS_SUCCESS,
  GET_SHIPPED_ORDER_BY_ID,
  GET_SHIPPED_ORDER_BY_ID_BEGIN,
  GET_SHIPPED_ORDER_BY_ID_FAIL,
  GET_SHIPPED_ORDER_BY_ID_SUCCESS,
  GET_SHIPPED_ORDER_DETAILS,
  GET_SHIPPED_ORDER_DETAILS_BEGIN,
  GET_SHIPPED_ORDER_DETAILS_FAIL,
  GET_SHIPPED_ORDER_DETAILS_SUCCESS,
  SALES_REPORT,
  SALES_REPORT_BEGIN,
  SALES_REPORT_FAIL,
  SALES_REPORT_SUCCESS,
  GET_SELLER_INVOICE,
  GET_SELLER_INVOICE_BEGIN,
  GET_SELLER_INVOICE_SUCCESS,
  GET_SELLER_INVOICE_FAIL,
  EXPORT_SELLER_INVOICE,
  EXPORT_SELLER_INVOICE_BEGIN,
  EXPORT_SELLER_INVOICE_SUCCESS,
  EXPORT_SELLER_INVOICE_FAIL,
} from "./actionType";

export const getPendingOrderDetails = ({ req }) => ({
  type: GET_PENDING_ORDER_DETAILS,
  request: req,
});

export const getPendingOrderDetailsBegin = () => ({
  type: GET_PENDING_ORDER_DETAILS_BEGIN,
});

export const getPendingOrderDetailsSuccess = (order) => ({
  type: GET_PENDING_ORDER_DETAILS_SUCCESS,
  payload: order,
});

export const getPendingOrderDetailsFail = (error) => ({
  type: GET_PENDING_ORDER_DETAILS_FAIL,
  payload: error,
});

export const getCompletedOrderDetails = ({ req }) => ({
  type: GET_COMPLETED_ORDER_DETAILS,
  request: req,
});

export const getCompletedOrderDetailsBegin = () => ({
  type: GET_COMPLETED_ORDER_DETAILS_BEGIN,
});

export const getCompletedOrderDetailsSuccess = (order) => ({
  type: GET_COMPLETED_ORDER_DETAILS_SUCCESS,
  payload: order,
});

export const getCompletedOrderDetailsFail = (error) => ({
  type: GET_COMPLETED_ORDER_DETAILS_FAIL,
  payload: error,
});

export const getPendingOrderById = ({ data }) => ({
  type: GET_PENDING_ORDER_BY_ID,
  data: data,
});

export const getPendingOrderByIdBegin = () => ({
  type: GET_PENDING_ORDER_BY_ID_BEGIN,
});

export const getPendingOrderByIdSuccess = (order) => ({
  type: GET_PENDING_ORDER_BY_ID_SUCCESS,
  payload: order,
});

export const getPendingOrderByIdFail = (error) => ({
  type: GET_PENDING_ORDER_BY_ID_FAIL,
  payload: error,
});

export const getCompletedOrderById = ({ data }) => ({
  type: GET_COMPLETED_ORDER_BY_ID,
  data: data,
});

export const getCompletedOrderByIdBegin = () => ({
  type: GET_COMPLETED_ORDER_BY_ID_BEGIN,
});

export const getCompletedOrderByIdSuccess = (order) => ({
  type: GET_COMPLETED_ORDER_BY_ID_SUCCESS,
  payload: order,
});

export const getCompletedOrderByIdFail = (error) => ({
  type: GET_COMPLETED_ORDER_BY_ID_FAIL,
  payload: error,
});

export const getShippedOrderById = ({ data }) => ({
  type: GET_SHIPPED_ORDER_BY_ID,
  data: data,
});

export const getShippedOrderByIdBegin = () => ({
  type: GET_SHIPPED_ORDER_BY_ID_BEGIN,
});

export const getShippedOrderByIdSuccess = (order) => ({
  type: GET_SHIPPED_ORDER_BY_ID_SUCCESS,
  payload: order,
});

export const getShippedOrderByIdFail = (error) => ({
  type: GET_SHIPPED_ORDER_BY_ID_FAIL,
  payload: error,
});

export const getShippedOrderDetails = ({ req }) => ({
  type: GET_SHIPPED_ORDER_DETAILS,
  request: req,
});

export const getShippedOrderDetailsBegin = () => ({
  type: GET_SHIPPED_ORDER_DETAILS_BEGIN,
});

export const getShippedOrderDetailsSuccess = (order) => ({
  type: GET_SHIPPED_ORDER_DETAILS_SUCCESS,
  payload: order,
});

export const getShippedOrderDetailsFail = (error) => ({
  type: GET_SHIPPED_ORDER_DETAILS_FAIL,
  payload: error,
});

export const changeOrderStatus = ({ data, callback }) => ({
  type: CHANGE_ORDER_STATUS,
  data: data,
  callback: callback,
});

export const changeOrderStatusBegin = () => ({
  type: CHANGE_ORDER_STATUS_BEGIN,
});

export const changeOrderStatusSuccess = () => ({
  type: CHANGE_ORDER_STATUS_SUCCESS,
});

export const changeOrderStatusFail = (error) => ({
  type: CHANGE_ORDER_STATUS_FAIL,
  payload: error,
});

export const SaleReport = ({ data, callback }) => ({
  type: SALES_REPORT,
  data: data,
  callback: callback,
});

export const SaleReportBegin = () => ({
  type: SALES_REPORT_BEGIN,
});

export const SaleReportSuccess = (report) => ({
  type: SALES_REPORT_SUCCESS,
  payload: report,
});

export const SaleReportFail = (error) => ({
  type: SALES_REPORT_FAIL,
  payload: error,
});

export const getSellerInvoice = ({ data }) => ({
  type: GET_SELLER_INVOICE,
  data: data,
});

export const gettSellerInvoiceBegin = () => ({
  type: GET_SELLER_INVOICE_BEGIN,
});

export const gettSellerInvoiceSuccess = (data) => ({
  type: GET_SELLER_INVOICE_SUCCESS,
  payload: data,
});

export const gettSellerInvoiceFail = (error) => ({
  type: GET_SELLER_INVOICE_FAIL,
  payload: error,
});

// Export user details

// export const exportSellerInvoice = ({ saveAs, data }) => ({
//   type: EXPORT_SELLER_INVOICE,
//   saveAs: saveAs,
//   data: data,
// });

export const exportSellerInvoice = ({ data }) => ({
  type: EXPORT_SELLER_INVOICE,
  data: data,
});

export const exportSellerInvoiceBegin = () => ({
  type: EXPORT_SELLER_INVOICE_BEGIN,
});

export const exportSellerInvoiceSuccess = (invoice) => ({
  type: EXPORT_SELLER_INVOICE_SUCCESS,
  payload: invoice,
});

export const exportSellerInvoiceFail = (error) => ({
  type: EXPORT_SELLER_INVOICE_FAIL,
  payload: error,
});
