import {
  CHANGE_ORDER_STATUS_BEGIN,
  CHANGE_ORDER_STATUS_FAIL,
  CHANGE_ORDER_STATUS_SUCCESS,
  GET_COMPLETED_ORDER_BY_ID_BEGIN,
  GET_COMPLETED_ORDER_BY_ID_FAIL,
  GET_COMPLETED_ORDER_BY_ID_SUCCESS,
  GET_COMPLETED_ORDER_DETAILS_BEGIN,
  GET_COMPLETED_ORDER_DETAILS_FAIL,
  GET_COMPLETED_ORDER_DETAILS_SUCCESS,
  GET_PENDING_ORDER_BY_ID_BEGIN,
  GET_PENDING_ORDER_BY_ID_FAIL,
  GET_PENDING_ORDER_BY_ID_SUCCESS,
  GET_PENDING_ORDER_DETAILS_BEGIN,
  GET_PENDING_ORDER_DETAILS_FAIL,
  GET_PENDING_ORDER_DETAILS_SUCCESS,
  GET_SHIPPED_ORDER_BY_ID_BEGIN,
  GET_SHIPPED_ORDER_BY_ID_FAIL,
  GET_SHIPPED_ORDER_BY_ID_SUCCESS,
  GET_SHIPPED_ORDER_DETAILS_BEGIN,
  GET_SHIPPED_ORDER_DETAILS_FAIL,
  GET_SHIPPED_ORDER_DETAILS_SUCCESS,
  SALES_REPORT_BEGIN,
  SALES_REPORT_FAIL,
  SALES_REPORT_SUCCESS,
  GET_SELLER_INVOICE_BEGIN,
  GET_SELLER_INVOICE_FAIL,
  GET_SELLER_INVOICE_SUCCESS,
  EXPORT_SELLER_INVOICE_BEGIN,
  EXPORT_SELLER_INVOICE_SUCCESS,
  EXPORT_SELLER_INVOICE_FAIL,
} from "./actionType";

const initial_state = {
  data: {},
  order: {},
  loading: false,
  error: "",
  orderDetails: {},
  salesReport: {},
  invoice: {},
};

const Order = (state = initial_state, action) => {
  switch (action.type) {
    case GET_COMPLETED_ORDER_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_COMPLETED_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
        error: "",
      };
    case GET_COMPLETED_ORDER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        orderDetails: "",
        error: action.payload,
      };

    case GET_COMPLETED_ORDER_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_COMPLETED_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: "",
      };
    case GET_COMPLETED_ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        order: {},
        error: action.payload,
      };

    case GET_PENDING_ORDER_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PENDING_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
        error: "",
      };
    case GET_PENDING_ORDER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        orderDetails: "",
        error: action.payload,
      };

    case GET_PENDING_ORDER_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PENDING_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        order: action.payload,
      };
    case GET_PENDING_ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        order: {},
        error: action.payload,
      };

    case GET_SHIPPED_ORDER_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SHIPPED_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
        error: "",
      };
    case GET_SHIPPED_ORDER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        orderDetails: "",
        error: action.payload,
      };

    case GET_SHIPPED_ORDER_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SHIPPED_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: "",
      };
    case GET_SHIPPED_ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        order: {},
        error: action.payload,
      };

    // STATUS

    case CHANGE_ORDER_STATUS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CHANGE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case CHANGE_ORDER_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // SALES REPORT

    case SALES_REPORT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        salesReport: {},
      };
    case SALES_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        salesReport: action.payload,
      };
    case SALES_REPORT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        salesReport: {},
      };
    case GET_SELLER_INVOICE_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SELLER_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        invoice: action.payload,
      };
    case GET_SELLER_INVOICE_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        invoice: "",
      };
    case EXPORT_SELLER_INVOICE_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      };

    case EXPORT_SELLER_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "",
      };

    case EXPORT_SELLER_INVOICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: "",
      };
    default:
      return { ...state };
  }
};

export default Order;
