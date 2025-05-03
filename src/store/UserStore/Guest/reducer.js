import {
  ADD_GUEST_ADDRESS_DETAILS_BEGIN,
  ADD_GUEST_ADDRESS_DETAILS_FAIL,
  ADD_GUEST_ADDRESS_DETAILS_SUCCESS,
  ADD_GUEST_BILLING_ADDRESS_DETAILS_BEGIN,
  ADD_GUEST_BILLING_ADDRESS_DETAILS_SUCCESS,
  ADD_GUEST_BILLING_ADDRESS_DETAILS_FAIL,
  ADD_GUEST_BEGIN,
  ADD_GUEST_CLINIC_PAYMENT_BEGIN,
  ADD_GUEST_CLINIC_PAYMENT_FAIL,
  ADD_GUEST_CLINIC_PAYMENT_SUCCESS,
  ADD_GUEST_DETAILS_BEGIN,
  ADD_GUEST_DETAILS_FAIL,
  ADD_GUEST_DETAILS_SUCCESS,
  ADD_GUEST_FAIL,
  ADD_GUEST_SHOP_PAYMENT_BEGIN,
  ADD_GUEST_SHOP_PAYMENT_FAIL,
  ADD_GUEST_SHOP_PAYMENT_SUCCESS,
  ADD_GUEST_SUCCESS,
  GET_GUEST_ADDRESS_DETAILS_BEGIN,
  GET_GUEST_ADDRESS_DETAILS_FAIL,
  GET_GUEST_ADDRESS_DETAILS_SUCCESS,
  GET_GUEST_BILLING_ADDRESS_DETAILS_BEGIN,
  GET_GUEST_BILLING_ADDRESS_DETAILS_FAIL,
  GET_GUEST_BILLING_ADDRESS_DETAILS_SUCCESS,
  GET_GUEST_CLINIC_PAYMENT_BEGIN,
  GET_GUEST_CLINIC_PAYMENT_FAIL,
  GET_GUEST_CLINIC_PAYMENT_SUCCESS,
  GET_GUEST_DETAILS_BEGIN,
  GET_GUEST_DETAILS_FAIL,
  GET_GUEST_DETAILS_SUCCESS,
  GET_GUEST_INVOICE_BEGIN,
  GET_GUEST_INVOICE_FAIL,
  GET_GUEST_INVOICE_SUCCESS,
  GUEST_RESET_ERRORS,
  INITIATE_GUEST_CLINIC_PAYMENT_BEGIN,
  INITIATE_GUEST_CLINIC_PAYMENT_FAIL,
  INITIATE_GUEST_CLINIC_PAYMENT_SUCCESS,
  INITIATE_GUEST_SHOP_PAYMENT_BEGIN,
  INITIATE_GUEST_SHOP_PAYMENT_FAIL,
  INITIATE_GUEST_SHOP_PAYMENT_SUCCESS,
  REGISTER_GUEST_BEGIN,
  REGISTER_GUEST_FAIL,
  REGISTER_GUEST_SUCCESS,
  RESET_GUEST_REGISTER_ERRORS,
  VERIFY_OTP_GUEST_BEGIN,
  VERIFY_OTP_GUEST_FAIL,
  VERIFY_OTP_GUEST_SUCCESS,
} from "./actionTypes";

export const initial_state = {
  Guest: {},
  loading: false,
  error: "",
  GuestId: "",
  addresses: {},
  billing_addresses: {},
  guestDetails: {},
  paymentData: {},
  invoice: {},
};

const Guest = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_GUEST_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case ADD_GUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        GuestId: action.payload,
      };
    case ADD_GUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        Guest: {},
      };

    case ADD_GUEST_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case ADD_GUEST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        GuestId: action.payload,
      };
    case ADD_GUEST_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        Guest: {},
      };

    case GET_GUEST_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case GET_GUEST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        guestDetails: action.payload,
      };
    case GET_GUEST_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        guestDetails: {},
      };

    case REGISTER_GUEST_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_GUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        Guest: action.payload,
      };
    case REGISTER_GUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        Guest: {},
      };

    case VERIFY_OTP_GUEST_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case VERIFY_OTP_GUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case VERIFY_OTP_GUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_GUEST_REGISTER_ERRORS: {
      return {
        ...state,
        error: "",
      };
    }
    case GET_GUEST_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_GUEST_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        addresses: action.payload,
      };
    case GET_GUEST_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_GUEST_BILLING_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_GUEST_BILLING_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        billing_addresses: action.payload,
      };
    case GET_GUEST_BILLING_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_GUEST_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_GUEST_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        paymentData: action.payload,
      };
    case ADD_GUEST_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentData: {},
      };

    case ADD_GUEST_BILLING_ADDRESS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_GUEST_BILLING_ADDRESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        paymentBillingData: action.payload,
      };
    case ADD_GUEST_BILLING_ADDRESS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentBillingData: {},
      };

    // SHOP PAYMENT

    case INITIATE_GUEST_SHOP_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case INITIATE_GUEST_SHOP_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case INITIATE_GUEST_SHOP_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_GUEST_SHOP_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_GUEST_SHOP_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        paymentData: action.payload,
      };
    case ADD_GUEST_SHOP_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentData: {},
      };

    //CLINIC PAYMENT
    case INITIATE_GUEST_CLINIC_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case INITIATE_GUEST_CLINIC_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case INITIATE_GUEST_CLINIC_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_GUEST_CLINIC_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_GUEST_CLINIC_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        paymentData: action.payload,
      };
    case ADD_GUEST_CLINIC_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentData: {},
      };

    case GET_GUEST_CLINIC_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        paymentData: {},
        error: "",
      };
    case GET_GUEST_CLINIC_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentData: action.payload,
        error: "",
      };
    case GET_GUEST_CLINIC_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        paymentData: {},
        error: action.payload,
      };

    case GUEST_RESET_ERRORS: {
      return {
        ...state,
        error: "",
      };
    }

    case GET_GUEST_INVOICE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case GET_GUEST_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        invoice: action.payload,
      };
    case GET_GUEST_INVOICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        invoice: {},
      };

    default:
      return state;
  }
};

export default Guest;
