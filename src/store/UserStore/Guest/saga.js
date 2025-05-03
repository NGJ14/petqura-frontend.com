import { call, put, takeLatest } from "redux-saga/effects";
import {
  addGuestAddressDetailsBegin,
  addGuestAddressDetailsFail,
  addGuestAddressDetailsSuccess,
  addGuestBillingAddressDetailsBegin,
  addGuestBillingAddressDetailsSuccess,
  addGuestBillingAddressDetailsFail,
  addGuestBegin,
  addGuestClinicPaymentBegin,
  addGuestClinicPaymentFail,
  addGuestClinicPaymentSuccess,
  addGuestDetailsBegin,
  addGuestDetailsFail,
  addGuestDetailsSuccess,
  addGuestFail,
  addGuestShopPaymentBegin,
  addGuestShopPaymentFail,
  addGuestShopPaymentSuccess,
  addGuestSuccess,
  getGuestAddressDetailsBegin,
  getGuestAddressDetailsFail,
  getGuestAddressDetailsSuccess,
  getGuestBillingAddressDetailsBegin,
  getGuestBillingAddressDetailsFail,
  getGuestBillingAddressDetailsSuccess,
  getGuestClinicPaymentBegin,
  getGuestClinicPaymentFail,
  getGuestClinicPaymentSuccess,
  getGuestDetailsBegin,
  getGuestDetailsFail,
  getGuestDetailsSuccess,
  getGuestInvoiceBegin,
  getGuestInvoiceFail,
  getGuestInvoiceSuccess,
  initiateGuestClinicPaymentBegin,
  initiateGuestClinicPaymentFail,
  initiateGuestClinicPaymentSuccess,
  initiateGuestShopPaymentBegin,
  initiateGuestShopPaymentFail,
  initiateGuestShopPaymentSuccess,
  registerGuestBegin,
  registerGuestFail,
  registerGuestSuccess,
  verifyOtpGuestBegin,
  verifyOtpGuestFail,
  verifyOtpGuestSuccess,
} from "./action";
import { add, get } from "../../../helpers/api_helpers";
import {
  ADD_GUEST,
  ADD_GUEST_ADDRESS_DETAILS,
  ADD_GUEST_BILLING_ADDRESS_DETAILS,
  ADD_GUEST_CLINIC_PAYMENT,
  ADD_GUEST_DETAILS,
  ADD_GUEST_SHOP_PAYMENT,
  GET_GUEST_ADDRESS_DETAILS,
  GET_GUEST_BILLING_ADDRESS_DETAILS,
  GET_GUEST_CLINIC_PAYMENT,
  GET_GUEST_INVOICE,
  INITIATE_GUEST_CLINIC_PAYMENT,
  INITIATE_GUEST_SHOP_PAYMENT,
  REGISTER_GUEST,
  VERIFY_OTP_GUEST,
} from "./actionTypes";
import { setLocalStorage } from "../../../helpers/utils";

function* addGuest({ productLogin, cart, callback }) {
  try {
    console.log(cart);
    yield put(addGuestBegin());

    const response = yield call(add, `/add_guest`);

    if (response) {
      setLocalStorage("AUTH_DETAILS", response?.result);
      if (productLogin) {
        yield call(add, `/add_to_guest_cart`, {
          ...cart,
          guest_id: response?.result?.guest_id,
        });
      }
      yield put(addGuestSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(addGuestFail(error));
  }
}

function* addGuestDetails({ guest, callback }) {
  try {
    yield put(addGuestDetailsBegin());

    const response = yield call(add, `/guest_user_details`, guest);

    setLocalStorage("AUTH_DETAILS", response?.result);
    yield put(addGuestDetailsSuccess(response.result));

    yield call(add, `/guest_sent_otp`, guest);
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(addGuestDetailsFail(error));
  }
}

function* getGuestDetails({ guest, callback }) {
  try {
    yield put(getGuestDetailsBegin());
    const response = yield call(get, `/guest_user_details`, guest);
    yield put(getGuestDetailsSuccess(response.result));
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(getGuestDetailsFail(error));
  }
}

function* registerGuest({ Guest, callback }) {
  try {
    yield put(registerGuestBegin());

    const response = yield call(add, `/Guest_register`, Guest);

    if (response) {
      yield call(add, `/Guest_sent_otp`, Guest);
      yield put(registerGuestSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(registerGuestFail(error));
  }
}

function* verifyOtpGuest({ data, callback }) {
  try {
    yield put(verifyOtpGuestBegin());
    const response = yield call(add, `/guest_verify_otp`, data);
    if (response) {
      yield put(verifyOtpGuestSuccess());
      callback && callback();
    }
  } catch (error) {
    yield put(verifyOtpGuestFail(error));
  }
}

function* addGuestAddressDetails({ address, callback, clearFields }) {
  try {
    yield put(addGuestAddressDetailsBegin());
    const response = yield call(add, "/guest_add_address", address);
    if (response) {
      yield put(addGuestAddressDetailsSuccess());
      callback && callback();
      clearFields && clearFields();
    }
  } catch (error) {
    console.log(error);
    yield put(addGuestAddressDetailsFail(address));
  }
}

function* addGuestBillingAddressDetails({ address, callback, clearFields }) {
  try {
    yield put(addGuestBillingAddressDetailsBegin());
    const response = yield call(add, "/guest_add_address", address);
    if (response) {
      yield put(addGuestBillingAddressDetailsSuccess());
      callback && callback();
      clearFields && clearFields();
    }
  } catch (error) {
    console.log(error);
    yield put(addGuestBillingAddressDetailsFail(address));
  }
}

function* getGuestAddressDetails({ data }) {
  try {
    yield put(getGuestAddressDetailsBegin());
    const response = yield call(get, "/guest_get_address", data);
    if (response) {
      yield put(getGuestAddressDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getGuestAddressDetailsFail(error));
  }
}

function* getGuestBillingAddressDetails({ data }) {
  try {
    yield put(getGuestBillingAddressDetailsBegin());
    const response = yield call(get, "/guest_get_address", data);
    if (response) {
      yield put(getGuestBillingAddressDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getGuestBillingAddressDetailsFail(error));
  }
}

// shop Payment

function* addGuestShopPayment({ data, callback, history }) {
  try {
    yield put(addGuestShopPaymentBegin());
    const response = yield call(add, "/guest_checkout_prepaid_order", data);
    yield put(addGuestShopPaymentSuccess(response.result));
    callback &&
      callback(
        response?.result?.payment_id,
        response?.result?.paytm_token,
        response?.result?.amount
      );
    history?.push(`/store/payment/${response?.result?.razor_order_id}`);
  } catch (error) {
    console.log(error);
    yield put(addGuestShopPaymentFail(error));
  }
}

function* initiateGuestShopPayment(res) {
  try {
    yield put(initiateGuestShopPaymentBegin());
    const response = yield call(
      add,
      "/guest_complete_prepaid_order",
      res?.payload
    );
    yield put(initiateGuestShopPaymentSuccess(response.result));
    res?.closePaytm && res?.closePaytm();
    if (res?.history) {
      res?.history.push({
        pathname: `/store/success/${response?.result?.order_id}`,
        state: { fromCheckout: true },
      });
    }
    res?.scroll && res?.scroll();
  } catch (error) {
    if (res?.history) {
      res?.history.push({
        pathname: `/store-payment/fail`,
        state: { fromCheckout: true },
      });
    }
    yield put(initiateGuestShopPaymentFail(error));
  }
}

// clinic Payment

function* getGuestClinicPayment({ data }) {
  try {
    yield put(getGuestClinicPaymentBegin());
    const response = yield call(get, "/guest_appointment_payment", data);
    yield put(getGuestClinicPaymentSuccess(response.result));
    // callback && callback();
  } catch (error) {
    console.log(error);
    yield put(getGuestClinicPaymentFail(error));
  }
}

function* addGuestClinicPayment({ data, callback, history }) {
  try {
    yield put(addGuestClinicPaymentBegin());
    const response = yield call(add, "/guest_appointment_make_payment", data);
    yield put(addGuestClinicPaymentSuccess(response.result));
    callback && callback();
    history?.push(`/clinic/payment/${response?.result?.razor_order_id}`);
  } catch (error) {
    console.log(error);
    yield put(addGuestClinicPaymentFail(error));
  }
}

function* initiateGuestClinicPayment(res) {
  try {
    yield put(initiateGuestClinicPaymentBegin());
    const response = yield call(add, "/guest_book_appointment", res?.payload);
    yield put(initiateGuestClinicPaymentSuccess(response.result));
    res?.callback && res?.callback();
  } catch (error) {
    console.log(error);
    yield put(initiateGuestClinicPaymentFail(error));
  }
}

function* getGuestInvoice({ guest, callback }) {
  try {
    yield put(getGuestInvoiceBegin());
    const response = yield call(get, `/guest_order_invoice`, guest);
    yield put(getGuestInvoiceSuccess(response.result));
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(getGuestInvoiceFail(error));
  }
}

function* GuestSaga() {
  yield takeLatest(REGISTER_GUEST, registerGuest);
  yield takeLatest(VERIFY_OTP_GUEST, verifyOtpGuest);
  yield takeLatest(ADD_GUEST, addGuest);
  yield takeLatest(ADD_GUEST_DETAILS, addGuestDetails);
  yield takeLatest(ADD_GUEST_ADDRESS_DETAILS, addGuestAddressDetails);
  yield takeLatest(
    ADD_GUEST_BILLING_ADDRESS_DETAILS,
    addGuestBillingAddressDetails
  );
  yield takeLatest(GET_GUEST_ADDRESS_DETAILS, getGuestAddressDetails);
  yield takeLatest(
    GET_GUEST_BILLING_ADDRESS_DETAILS,
    getGuestBillingAddressDetails
  );
  yield takeLatest(ADD_GUEST_CLINIC_PAYMENT, addGuestClinicPayment);
  yield takeLatest(INITIATE_GUEST_CLINIC_PAYMENT, initiateGuestClinicPayment);
  yield takeLatest(GET_GUEST_CLINIC_PAYMENT, getGuestClinicPayment);
  yield takeLatest(ADD_GUEST_SHOP_PAYMENT, addGuestShopPayment);
  yield takeLatest(INITIATE_GUEST_SHOP_PAYMENT, initiateGuestShopPayment);
  yield takeLatest(GET_GUEST_INVOICE, getGuestInvoice);
}

export default GuestSaga;
