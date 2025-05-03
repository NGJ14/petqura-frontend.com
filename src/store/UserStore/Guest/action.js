import {
  REGISTER_GUEST,
  REGISTER_GUEST_BEGIN,
  REGISTER_GUEST_FAIL,
  REGISTER_GUEST_SUCCESS,
  RESET_GUEST_REGISTER_ERRORS,
  VERIFY_OTP_GUEST,
  VERIFY_OTP_GUEST_BEGIN,
  VERIFY_OTP_GUEST_SUCCESS,
  VERIFY_OTP_GUEST_FAIL,
  ADD_GUEST,
  ADD_GUEST_BEGIN,
  ADD_GUEST_SUCCESS,
  ADD_GUEST_FAIL,
  ADD_GUEST_ADDRESS_DETAILS_BEGIN,
  ADD_GUEST_ADDRESS_DETAILS_SUCCESS,
  ADD_GUEST_ADDRESS_DETAILS_FAIL,
  ADD_GUEST_ADDRESS_DETAILS,
  ADD_GUEST_BILLING_ADDRESS_DETAILS_BEGIN,
  ADD_GUEST_BILLING_ADDRESS_DETAILS_SUCCESS,
  ADD_GUEST_BILLING_ADDRESS_DETAILS_FAIL,
  ADD_GUEST_BILLING_ADDRESS_DETAILS,
  ADD_GUEST_DETAILS,
  ADD_GUEST_DETAILS_BEGIN,
  ADD_GUEST_DETAILS_SUCCESS,
  ADD_GUEST_DETAILS_FAIL,
  GET_GUEST_DETAILS,
  GET_GUEST_DETAILS_BEGIN,
  GET_GUEST_DETAILS_SUCCESS,
  GET_GUEST_DETAILS_FAIL,
  INITIATE_GUEST_CLINIC_PAYMENT,
  INITIATE_GUEST_CLINIC_PAYMENT_BEGIN,
  INITIATE_GUEST_CLINIC_PAYMENT_SUCCESS,
  INITIATE_GUEST_CLINIC_PAYMENT_FAIL,
  ADD_GUEST_CLINIC_PAYMENT,
  ADD_GUEST_CLINIC_PAYMENT_BEGIN,
  ADD_GUEST_CLINIC_PAYMENT_SUCCESS,
  ADD_GUEST_CLINIC_PAYMENT_FAIL,
  GET_GUEST_CLINIC_PAYMENT,
  GET_GUEST_CLINIC_PAYMENT_BEGIN,
  GET_GUEST_CLINIC_PAYMENT_SUCCESS,
  GET_GUEST_CLINIC_PAYMENT_FAIL,
  GET_GUEST_ADDRESS_DETAILS,
  GET_GUEST_ADDRESS_DETAILS_BEGIN,
  GET_GUEST_ADDRESS_DETAILS_SUCCESS,
  GET_GUEST_ADDRESS_DETAILS_FAIL,
  GET_GUEST_BILLING_ADDRESS_DETAILS,
  GET_GUEST_BILLING_ADDRESS_DETAILS_BEGIN,
  GET_GUEST_BILLING_ADDRESS_DETAILS_SUCCESS,
  GET_GUEST_BILLING_ADDRESS_DETAILS_FAIL,
  INITIATE_GUEST_SHOP_PAYMENT,
  INITIATE_GUEST_SHOP_PAYMENT_BEGIN,
  INITIATE_GUEST_SHOP_PAYMENT_SUCCESS,
  INITIATE_GUEST_SHOP_PAYMENT_FAIL,
  ADD_GUEST_SHOP_PAYMENT,
  ADD_GUEST_SHOP_PAYMENT_BEGIN,
  ADD_GUEST_SHOP_PAYMENT_SUCCESS,
  ADD_GUEST_SHOP_PAYMENT_FAIL,
  GUEST_RESET_ERRORS,
  GET_GUEST_INVOICE,
  GET_GUEST_INVOICE_BEGIN,
  GET_GUEST_INVOICE_SUCCESS,
  GET_GUEST_INVOICE_FAIL,
} from "./actionTypes";

export const addGuest = ({ guest, callback, productLogin, cart }) => ({
  type: ADD_GUEST,
  guest: guest,
  callback: callback,
  productLogin: productLogin,
  cart: cart,
});

export const addGuestBegin = () => ({
  type: ADD_GUEST_BEGIN,
});

export const addGuestSuccess = (guest) => ({
  type: ADD_GUEST_SUCCESS,
  payload: guest,
});

export const addGuestFail = (error) => ({
  type: ADD_GUEST_FAIL,
  payload: error,
});

export const addGuestDetails = ({ guest, callback }) => ({
  type: ADD_GUEST_DETAILS,
  guest: guest,
  callback: callback,
});

export const addGuestDetailsBegin = () => ({
  type: ADD_GUEST_DETAILS_BEGIN,
});

export const addGuestDetailsSuccess = (guest) => ({
  type: ADD_GUEST_DETAILS_SUCCESS,
  payload: guest,
});

export const addGuestDetailsFail = (error) => ({
  type: ADD_GUEST_DETAILS_FAIL,
  payload: error,
});

export const getGuestDetails = ({ guest, callback }) => ({
  type: GET_GUEST_DETAILS,
  guest: guest,
  callback: callback,
});

export const getGuestDetailsBegin = () => ({
  type: GET_GUEST_DETAILS_BEGIN,
});

export const getGuestDetailsSuccess = (guest) => ({
  type: GET_GUEST_DETAILS_SUCCESS,
  payload: guest,
});

export const getGuestDetailsFail = (error) => ({
  type: GET_GUEST_DETAILS_FAIL,
  payload: error,
});

export const registerGuest = ({ Guest, callback }) => ({
  type: REGISTER_GUEST,
  Guest: Guest,
  callback: callback,
});

export const registerGuestBegin = () => ({
  type: REGISTER_GUEST_BEGIN,
});

export const registerGuestSuccess = (language) => ({
  type: REGISTER_GUEST_SUCCESS,
  payload: language,
});

export const registerGuestFail = (error) => ({
  type: REGISTER_GUEST_FAIL,
  payload: error,
});

export const verifyOtpGuest = ({ data, callback }) => ({
  type: VERIFY_OTP_GUEST,
  data: data,
  callback: callback,
});

export const verifyOtpGuestBegin = () => ({
  type: VERIFY_OTP_GUEST_BEGIN,
});

export const verifyOtpGuestSuccess = (language) => ({
  type: VERIFY_OTP_GUEST_SUCCESS,
  payload: language,
});

export const verifyOtpGuestFail = (error) => ({
  type: VERIFY_OTP_GUEST_FAIL,
  payload: error,
});

export const resetGuestRegisterErrors = () => ({
  type: RESET_GUEST_REGISTER_ERRORS,
});

export const getGuestAddressDetails = ({ data }) => ({
  type: GET_GUEST_ADDRESS_DETAILS,
  data: data,
});

export const getGuestAddressDetailsBegin = () => ({
  type: GET_GUEST_ADDRESS_DETAILS_BEGIN,
});

export const getGuestAddressDetailsSuccess = (address) => ({
  type: GET_GUEST_ADDRESS_DETAILS_SUCCESS,
  payload: address,
});

export const getGuestAddressDetailsFail = (error) => ({
  type: GET_GUEST_ADDRESS_DETAILS_FAIL,
  payload: error,
});

export const getGuestBillingAddressDetails = ({ data }) => ({
  type: GET_GUEST_BILLING_ADDRESS_DETAILS,
  data: data,
});

export const getGuestBillingAddressDetailsBegin = () => ({
  type: GET_GUEST_BILLING_ADDRESS_DETAILS_BEGIN,
});

export const getGuestBillingAddressDetailsSuccess = (address) => ({
  type: GET_GUEST_BILLING_ADDRESS_DETAILS_SUCCESS,
  payload: address,
});

export const getGuestBillingAddressDetailsFail = (error) => ({
  type: GET_GUEST_BILLING_ADDRESS_DETAILS_FAIL,
  payload: error,
});

export const addGuestAddressDetails = ({ address, callback, clearFields }) => ({
  type: ADD_GUEST_ADDRESS_DETAILS,
  address: address,
  callback: callback,
  clearFields: clearFields,
});

export const addGuestAddressDetailsBegin = () => ({
  type: ADD_GUEST_ADDRESS_DETAILS_BEGIN,
});

export const addGuestAddressDetailsSuccess = () => ({
  type: ADD_GUEST_ADDRESS_DETAILS_SUCCESS,
});

export const addGuestAddressDetailsFail = (error) => ({
  type: ADD_GUEST_ADDRESS_DETAILS_FAIL,
  payload: error,
});

export const addGuestBillingAddressDetails = ({
  address,
  callback,
  clearFields,
}) => ({
  type: ADD_GUEST_BILLING_ADDRESS_DETAILS,
  address: address,
  callback: callback,
  clearFields: clearFields,
});

export const addGuestBillingAddressDetailsBegin = () => ({
  type: ADD_GUEST_BILLING_ADDRESS_DETAILS_BEGIN,
});

export const addGuestBillingAddressDetailsSuccess = () => ({
  type: ADD_GUEST_ADDRESS_DETAILS_SUCCESS,
});

export const addGuestBillingAddressDetailsFail = (error) => ({
  type: ADD_GUEST_BILLING_ADDRESS_DETAILS_FAIL,
  payload: error,
});

// shop payment

// Payment

export const initiateGuestShopPayment = (
  response,
  closePaytm,
  scroll,
  history
) => ({
  type: INITIATE_GUEST_SHOP_PAYMENT,
  payload: response,
  closePaytm: closePaytm,
  scroll: scroll,
  history: history,
});

export const initiateGuestShopPaymentBegin = () => ({
  type: INITIATE_GUEST_SHOP_PAYMENT_BEGIN,
});

export const initiateGuestShopPaymentSuccess = () => ({
  type: INITIATE_GUEST_SHOP_PAYMENT_SUCCESS,
});

export const initiateGuestShopPaymentFail = (error) => ({
  type: INITIATE_GUEST_SHOP_PAYMENT_FAIL,
  payload: error,
});

export const addGuestShopPayment = ({ data, callback, history }) => ({
  type: ADD_GUEST_SHOP_PAYMENT,
  data: data,
  callback: callback,
  history: history,
});

export const addGuestShopPaymentBegin = () => ({
  type: ADD_GUEST_SHOP_PAYMENT_BEGIN,
});

export const addGuestShopPaymentSuccess = (data) => ({
  type: ADD_GUEST_SHOP_PAYMENT_SUCCESS,
  payload: data,
});

export const addGuestShopPaymentFail = (error) => ({
  type: ADD_GUEST_SHOP_PAYMENT_FAIL,
  payload: error,
});

//clinic Payment

export const initiateGuestClinicPayment = (response, callback) => ({
  type: INITIATE_GUEST_CLINIC_PAYMENT,
  payload: response,
  callback: callback,
});

export const initiateGuestClinicPaymentBegin = () => ({
  type: INITIATE_GUEST_CLINIC_PAYMENT_BEGIN,
});

export const initiateGuestClinicPaymentSuccess = () => ({
  type: INITIATE_GUEST_CLINIC_PAYMENT_SUCCESS,
});

export const initiateGuestClinicPaymentFail = (error) => ({
  type: INITIATE_GUEST_CLINIC_PAYMENT_FAIL,
  payload: error,
});

export const addGuestClinicPayment = ({ data, callback, history }) => ({
  type: ADD_GUEST_CLINIC_PAYMENT,
  data: data,
  callback: callback,
  history: history,
});

export const addGuestClinicPaymentBegin = () => ({
  type: ADD_GUEST_CLINIC_PAYMENT_BEGIN,
});

export const addGuestClinicPaymentSuccess = (data) => ({
  type: ADD_GUEST_CLINIC_PAYMENT_SUCCESS,
  payload: data,
});

export const addGuestClinicPaymentFail = (error) => ({
  type: ADD_GUEST_CLINIC_PAYMENT_FAIL,
  payload: error,
});

export const getGuestClinicPayment = ({ data, callback }) => ({
  type: GET_GUEST_CLINIC_PAYMENT,
  data: data,
  callback: callback,
});

export const getGuestClinicPaymentBegin = () => ({
  type: GET_GUEST_CLINIC_PAYMENT_BEGIN,
});

export const getGuestClinicPaymentSuccess = (data) => ({
  type: GET_GUEST_CLINIC_PAYMENT_SUCCESS,
  payload: data,
});

export const getGuestClinicPaymentFail = (error) => ({
  type: GET_GUEST_CLINIC_PAYMENT_FAIL,
  payload: error,
});

export const guestResetErrors = () => ({
  type: GUEST_RESET_ERRORS,
});

// Invoice

export const getGuestInvoice = ({ guest, callback }) => ({
  type: GET_GUEST_INVOICE,
  guest: guest,
  callback: callback,
});

export const getGuestInvoiceBegin = () => ({
  type: GET_GUEST_INVOICE_BEGIN,
});

export const getGuestInvoiceSuccess = (guest) => ({
  type: GET_GUEST_INVOICE_SUCCESS,
  payload: guest,
});

export const getGuestInvoiceFail = (error) => ({
  type: GET_GUEST_INVOICE_FAIL,
  payload: error,
});
