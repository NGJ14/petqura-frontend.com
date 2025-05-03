import { call, put, takeLatest } from "redux-saga/effects";
import { add, del, get, post, update } from "../../../helpers/api_helpers";
import { GET_REVIEWS_BY_ID } from "../Reviews/actionType";
import {
  getClinicByIdBegin,
  getClinicByIdSuccess,
  getClinicByIdFail,
  getClinicDetailsBegin,
  getClinicDetailsSuccess,
  getClinicDetailsFail,
  getUserVariantDetailsBegin,
  getUserVariantDetailsSuccess,
  getUserVariantDetailsFail,
  getClinicCategoryDetailsBegin,
  getClinicCategoryDetailsSuccess,
  getClinicCategoryDetailsFail,
  getUserVariantByIdBegin,
  getUserVariantByIdSuccess,
  getUserVariantByIdFail,
  addClinicPaymentBegin,
  addClinicPaymentSuccess,
  addClinicPaymentFail,
  initiateClinicPaymentBegin,
  initiateClinicPaymentSuccess,
  initiateClinicPaymentFail,
  processClinicPaymentBegin,
  processClinicPaymentSuccess,
  processClinicPaymentFail,
  getClinicPaymentBegin,
  getClinicPaymentSuccess,
  getClinicPaymentFail,
  editClinicReviewsBegin,
  editClinicReviewsSuccess,
  editClinicReviewsFail,
  addClinicReviewsBegin,
  addClinicReviewsSuccess,
  addClinicReviewsFail,
  deleteClinicReviewsBegin,
  deleteClinicReviewsSuccess,
  deleteClinicReviewsFail,
  getClinicReviewsBegin,
  getClinicReviewsSuccess,
  getClinicReviewsFail,
  getClinicReviewByIdBegin,
  getClinicReviewByIdSuccess,
  getClinicReviewByIdFail,
  getClinicServicesBegin,
  getClinicServicesSuccess,
  getClinicServicesFail,
  getLoggedClinicReviewsBegin,
  getLoggedClinicReviewsSuccess,
  getLoggedClinicReviewsFail,
  requestClinicBookingBegin,
  requestClinicBookingFail,
  requestClinicBookingSuccess,
  bookClinicAppointmentBegin,
  bookClinicAppointmentFail,
  bookClinicAppointmentSuccess,
  getClinicBookingFeeBegin,
  getClinicBookingFeeSuccess,
  getClinicBookingFeeFail,
  getClinicSlotByIdBegin,
  getClinicSlotByIdSuccess,
  getClinicSlotByIdFail,
} from "./action";
import {
  GET_CLINIC_BY_ID,
  GET_CLINIC_CATEGORY_DETAILS,
  GET_CLINIC_DETAILS,
  GET_USER_VARIANT_BY_ID,
  GET_USER_VARIANT_DETAILS,
  ADD_CLINIC_PAYMENT,
  INITIATE_CLINIC_PAYMENT,
  PROCESS_CLINIC_PAYMENT,
  GET_CLINIC_PAYMENT,
  EDIT_CLINIC_REVIEWS,
  ADD_CLINIC_REVIEWS,
  DELETE_CLINIC_REVIEWS,
  GET_CLINIC_REVIEWS,
  GET_CLINIC_SERVICES,
  GET_LOGGED_CLINIC_REVIEWS,
  REQUEST_CLINIC_BOOKING,
  BOOK_CLINIC_APPOINTMENT,
  GET_CLINIC_BOOKING_FEE,
  GET_CLINIC_SLOT_BY_ID,
} from "./actionType";

// USER PRODUCT

function* getClinicDetails({ request }) {
  try {
    yield put(getClinicDetailsBegin());
    const response = yield call(get, "/clinic_listing", request);
    if (response) {
      yield put(getClinicDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getClinicDetailsFail(error));
  }
}

// USER PRODUCT BY ID

function* getClinicById({ data }) {
  try {
    yield put(getClinicByIdBegin());
    const response = yield call(get, `/clinic_details`, data);
    if (response) {
      yield put(getClinicByIdSuccess(response.result));
    }
  } catch (error) {
    console.log(error);
    yield put(getClinicByIdFail(error));
  }
}

//UserVariant

function* getUserVariantDetails() {
  try {
    yield put(getUserVariantDetailsBegin());
    const response = yield call(get, "/partner/Clinic_UserVariant");
    if (response) {
      yield put(getUserVariantDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getUserVariantDetailsFail(error));
  }
}

function* getUserVariantById({ data }) {
  try {
    yield put(getUserVariantByIdBegin());
    const response = yield call(get, "/view_product_variant", data);
    if (response) {
      yield put(getUserVariantByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getUserVariantByIdFail(error));
  }
}

// Category

function* getClinicCategoryDetails({ data }) {
  try {
    yield put(getClinicCategoryDetailsBegin());
    const response = yield call(get, "/get_product_categories", data);
    if (response) {
      yield put(getClinicCategoryDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getClinicCategoryDetailsFail(error));
  }
}

// Payment

function* getClinicPayment({ data, callback }) {
  try {
    yield put(getClinicPaymentBegin());
    const response = yield call(get, "/user_appointment_payment", data);
    yield put(getClinicPaymentSuccess(response.result));
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(getClinicPaymentFail(error));
  }
}

function* addClinicPayment({ data, callback, history }) {
  try {
    yield put(addClinicPaymentBegin());
    const response = yield call(add, "/appointment_make_payment", data);
    yield put(addClinicPaymentSuccess(response.result));
    callback && callback();
    history?.push({
      pathname: `/clinic/payment/${response?.result?.payment_id}`,
      state: { from: "clinicForm" },
    });
  } catch (error) {
    console.log(error);
    yield put(addClinicPaymentFail(error));
  }
}

function* initiateClinicPayment({ data, callback }) {
  try {
    yield put(initiateClinicPaymentBegin());
    const response = yield call(
      add,
      "/clinicappointment_initiate_payment",
      data
    );
    if (response) {
      yield put(initiateClinicPaymentSuccess(response.result));
      callback &&
        callback(
          response?.result?.payment_id,
          response?.result?.paytm_token,
          response?.result?.amount
        );
    }
  } catch (error) {
    console.log(error);
    yield put(initiateClinicPaymentFail(error));
  }
}

function* processClinicPayment(response) {
  try {
    yield put(processClinicPaymentBegin());
    const res = yield call(
      add,
      "/check_clinic_appointment_payment",
      response?.payload
    );
    yield put(processClinicPaymentSuccess(res.result));
    response?.paytmClose && response?.paytmClose();
    if (response?.history) {
      response?.history?.push({
        pathname: `/clinic/success/${response?.id}`,
        state: { from: "payment" },
      });
    }
    response?.goToTop && response?.goToTop();
  } catch (error) {
    console.log(error);
    response?.paytmClose && response?.paytmClose();
    if (response?.history) {
      response?.history?.push({
        pathname: `/clinic-payment/fail`,
        state: { from: "payment" },
      });
    }
    response?.goToTop && response?.goToTop();
    yield put(processClinicPaymentFail(error));
  }
}

// REVIEWS

function* editClinicReviews({ ClinicReviews, callback }) {
  try {
    yield put(editClinicReviewsBegin());
    const response = yield call(update, "/clinic_review", ClinicReviews);
    if (response) {
      yield put(editClinicReviewsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(editClinicReviewsFail(error));
  }
}

function* addClinicReviews({ ClinicReviews, callback }) {
  try {
    yield put(addClinicReviewsBegin());
    const response = yield call(add, "/clinic_review", ClinicReviews);
    if (response) {
      yield put(addClinicReviewsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(addClinicReviewsFail(error));
  }
}

function* deleteClinicReviews() {
  try {
    yield put(deleteClinicReviewsBegin());
    const response = yield call(del, "/clinic_review");
    if (response) {
      yield put(deleteClinicReviewsSuccess(response.result));
    }
  } catch (error) {
    yield put(deleteClinicReviewsFail(error));
  }
}

function* getClinicReviews({ data }) {
  try {
    yield put(getClinicReviewsBegin());
    const response = yield call(get, "/view_clinic_review", data);
    if (response) {
      yield put(getClinicReviewsSuccess(response.result));
    }
  } catch (error) {
    yield put(getClinicReviewsFail(error));
  }
}

function* getLoggedClinicReviews({ data }) {
  try {
    yield put(getLoggedClinicReviewsBegin());
    const response = yield call(get, "/view_existing_clinic_review", data);
    if (response) {
      yield put(getLoggedClinicReviewsSuccess(response.result));
    }
  } catch (error) {
    yield put(getLoggedClinicReviewsFail(error));
  }
}

function* getClinicReviewssById({ data }) {
  try {
    yield put(getClinicReviewByIdBegin());
    const response = yield call(get, `/view_clinic_review`, data);
    if (response) {
      yield put(getClinicReviewByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getClinicReviewByIdFail(error));
  }
}

// Services

function* getClinicService({ data }) {
  try {
    yield put(getClinicServicesBegin());
    const response = yield call(get, "/clinic_services", data);
    if (response) {
      yield put(getClinicServicesSuccess(response.result));
    }
  } catch (error) {
    yield put(getClinicServicesFail(error));
  }
}

function* requestClinicBooking({ data, callback }) {
  try {
    yield put(requestClinicBookingBegin());
    const response = yield call(post, "/request_clinic_booking", data);
    if (response) {
      yield put(requestClinicBookingSuccess());
      callback && callback();
    }
  } catch (error) {
    yield put(requestClinicBookingFail(error));
  }
}

function* bookClinicAppointment({ data, callback }) {
  try {
    yield put(bookClinicAppointmentBegin());
    const response = yield call(post, "/book_clinic_appointment", data);
    if (response) {
      yield put(bookClinicAppointmentSuccess());
      callback && callback();
    }
  } catch (error) {
    yield put(bookClinicAppointmentFail(error));
  }
}

function* getClinicBookingFee() {
  try {
    yield put(getClinicBookingFeeBegin());
    const response = yield call(get, "/get_settings");
    if (response) {
      yield put(getClinicBookingFeeSuccess(response.result));
    }
  } catch (error) {
    yield put(getClinicBookingFeeFail(error));
  }
}

// Slot

function* getClinicSlotById({ data }) {
  try {
    yield put(getClinicSlotByIdBegin());
    const response = yield call(get, `/clinic_slot_details`, data);
    if (response) {
      yield put(getClinicSlotByIdSuccess(response.result));
    }
  } catch (error) {
    console.log(error);
    yield put(getClinicSlotByIdFail(error));
  }
}

function* ClinicSaga() {
  yield takeLatest(GET_CLINIC_BY_ID, getClinicById);
  yield takeLatest(GET_CLINIC_DETAILS, getClinicDetails);

  yield takeLatest(GET_CLINIC_CATEGORY_DETAILS, getClinicCategoryDetails);

  yield takeLatest(GET_USER_VARIANT_DETAILS, getUserVariantDetails);
  yield takeLatest(GET_USER_VARIANT_BY_ID, getUserVariantById);

  yield takeLatest(ADD_CLINIC_PAYMENT, addClinicPayment);
  yield takeLatest(INITIATE_CLINIC_PAYMENT, initiateClinicPayment);
  yield takeLatest(PROCESS_CLINIC_PAYMENT, processClinicPayment);
  yield takeLatest(GET_CLINIC_PAYMENT, getClinicPayment);

  yield takeLatest(EDIT_CLINIC_REVIEWS, editClinicReviews);
  yield takeLatest(ADD_CLINIC_REVIEWS, addClinicReviews);
  yield takeLatest(DELETE_CLINIC_REVIEWS, deleteClinicReviews);
  yield takeLatest(GET_CLINIC_REVIEWS, getClinicReviews);
  yield takeLatest(GET_REVIEWS_BY_ID, getClinicReviewssById);
  yield takeLatest(GET_LOGGED_CLINIC_REVIEWS, getLoggedClinicReviews);

  yield takeLatest(GET_CLINIC_SERVICES, getClinicService);

  yield takeLatest(REQUEST_CLINIC_BOOKING, requestClinicBooking);

  yield takeLatest(BOOK_CLINIC_APPOINTMENT, bookClinicAppointment);

  yield takeLatest(GET_CLINIC_BOOKING_FEE, getClinicBookingFee);

  yield takeLatest(GET_CLINIC_SLOT_BY_ID, getClinicSlotById);
}

export default ClinicSaga;
