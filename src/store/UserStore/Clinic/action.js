import {
  ADD_CLINIC_PAYMENT,
  ADD_CLINIC_PAYMENT_BEGIN,
  ADD_CLINIC_PAYMENT_FAIL,
  ADD_CLINIC_PAYMENT_SUCCESS,
  ADD_CLINIC_REVIEWS,
  ADD_CLINIC_REVIEWS_BEGIN,
  ADD_CLINIC_REVIEWS_FAIL,
  ADD_CLINIC_REVIEWS_SUCCESS,
  DELETE_CLINIC_REVIEWS,
  DELETE_CLINIC_REVIEWS_BEGIN,
  DELETE_CLINIC_REVIEWS_FAIL,
  DELETE_CLINIC_REVIEWS_SUCCESS,
  EDIT_CLINIC_REVIEWS,
  EDIT_CLINIC_REVIEWS_BEGIN,
  EDIT_CLINIC_REVIEWS_FAIL,
  EDIT_CLINIC_REVIEWS_SUCCESS,
  GET_CLINIC_BOOKING_FEE,
  GET_CLINIC_BOOKING_FEE_BEGIN,
  GET_CLINIC_BOOKING_FEE_FAIL,
  GET_CLINIC_BOOKING_FEE_SUCCESS,
  GET_CLINIC_BY_ID,
  GET_CLINIC_BY_ID_BEGIN,
  GET_CLINIC_BY_ID_FAIL,
  GET_CLINIC_BY_ID_SUCCESS,
  GET_CLINIC_CATEGORY_DETAILS,
  GET_CLINIC_CATEGORY_DETAILS_BEGIN,
  GET_CLINIC_CATEGORY_DETAILS_FAIL,
  GET_CLINIC_CATEGORY_DETAILS_SUCCESS,
  GET_CLINIC_DETAILS,
  GET_CLINIC_DETAILS_BEGIN,
  GET_CLINIC_DETAILS_FAIL,
  GET_CLINIC_DETAILS_SUCCESS,
  GET_CLINIC_PAYMENT,
  GET_CLINIC_PAYMENT_BEGIN,
  GET_CLINIC_PAYMENT_FAIL,
  GET_CLINIC_PAYMENT_SUCCESS,
  GET_CLINIC_REVIEWS,
  GET_CLINIC_REVIEWS_BEGIN,
  GET_CLINIC_REVIEWS_FAIL,
  GET_CLINIC_REVIEWS_SUCCESS,
  GET_CLINIC_REVIEW_BY_ID,
  GET_CLINIC_REVIEW_BY_ID_BEGIN,
  GET_CLINIC_REVIEW_BY_ID_FAIL,
  GET_CLINIC_REVIEW_BY_ID_SUCCESS,
  GET_CLINIC_SERVICES,
  GET_CLINIC_SERVICES_BEGIN,
  GET_CLINIC_SERVICES_FAIL,
  GET_CLINIC_SERVICES_SUCCESS,
  GET_LOGGED_CLINIC_REVIEWS,
  GET_LOGGED_CLINIC_REVIEWS_BEGIN,
  GET_LOGGED_CLINIC_REVIEWS_FAIL,
  GET_LOGGED_CLINIC_REVIEWS_SUCCESS,
  GET_USER_VARIANT_BY_ID,
  GET_USER_VARIANT_BY_ID_BEGIN,
  GET_USER_VARIANT_BY_ID_FAIL,
  GET_USER_VARIANT_BY_ID_SUCCESS,
  GET_USER_VARIANT_DETAILS,
  GET_USER_VARIANT_DETAILS_BEGIN,
  GET_USER_VARIANT_DETAILS_FAIL,
  GET_USER_VARIANT_DETAILS_SUCCESS,
  INITIATE_CLINIC_PAYMENT,
  INITIATE_CLINIC_PAYMENT_BEGIN,
  INITIATE_CLINIC_PAYMENT_FAIL,
  INITIATE_CLINIC_PAYMENT_SUCCESS,
  PROCESS_CLINIC_PAYMENT,
  PROCESS_CLINIC_PAYMENT_BEGIN,
  PROCESS_CLINIC_PAYMENT_FAIL,
  PROCESS_CLINIC_PAYMENT_SUCCESS,
  REQUEST_CLINIC_BOOKING,
  REQUEST_CLINIC_BOOKING_BEGIN,
  REQUEST_CLINIC_BOOKING_FAIL,
  REQUEST_CLINIC_BOOKING_SUCCESS,
  GET_CLINIC_SLOT_BY_ID,
  GET_CLINIC_SLOT_BY_ID_BEGIN,
  GET_CLINIC_SLOT_BY_ID_SUCCESS,
  GET_CLINIC_SLOT_BY_ID_FAIL,
  BOOK_CLINIC_APPOINTMENT,
  BOOK_CLINIC_APPOINTMENT_BEGIN,
  BOOK_CLINIC_APPOINTMENT_SUCCESS,
  BOOK_CLINIC_APPOINTMENT_FAIL,
} from "./actionType";

// CLINIC

export const getClinicDetails = ({ request }) => ({
  type: GET_CLINIC_DETAILS,
  request: request,
});

export const getClinicDetailsBegin = () => ({
  type: GET_CLINIC_DETAILS_BEGIN,
});

export const getClinicDetailsSuccess = (pet) => ({
  type: GET_CLINIC_DETAILS_SUCCESS,
  payload: pet,
});

export const getClinicDetailsFail = (error) => ({
  type: GET_CLINIC_DETAILS_FAIL,
  payload: error,
});

// CLINIC BY ID

export const getClinicById = ({ data }) => ({
  type: GET_CLINIC_BY_ID,
  data: data,
});

export const getClinicByIdBegin = () => ({
  type: GET_CLINIC_BY_ID_BEGIN,
});

export const getClinicByIdSuccess = (product) => ({
  type: GET_CLINIC_BY_ID_SUCCESS,
  payload: product,
});

export const getClinicByIdFail = (error) => ({
  type: GET_CLINIC_BY_ID_FAIL,
  payload: error,
});

// USER_VARIANT

export const getUserVariantById = ({ data }) => ({
  type: GET_USER_VARIANT_BY_ID,
  data: data,
});

export const getUserVariantByIdBegin = () => ({
  type: GET_USER_VARIANT_BY_ID_BEGIN,
});

export const getUserVariantByIdSuccess = (UserVariant) => ({
  type: GET_USER_VARIANT_BY_ID_SUCCESS,
  payload: UserVariant,
});

export const getUserVariantByIdFail = (error) => ({
  type: GET_USER_VARIANT_BY_ID_FAIL,
  payload: error,
});

export const getUserVariantDetails = () => ({
  type: GET_USER_VARIANT_DETAILS,
});

export const getUserVariantDetailsBegin = () => ({
  type: GET_USER_VARIANT_DETAILS_BEGIN,
});

export const getUserVariantDetailsSuccess = (UserVariant) => ({
  type: GET_USER_VARIANT_DETAILS_SUCCESS,
  payload: UserVariant,
});

export const getUserVariantDetailsFail = (error) => ({
  type: GET_USER_VARIANT_DETAILS_FAIL,
  payload: error,
});

// Category

export const getClinicCategoryDetails = ({ data }) => ({
  type: GET_CLINIC_CATEGORY_DETAILS,
  data: data,
});

export const getClinicCategoryDetailsBegin = () => ({
  type: GET_CLINIC_CATEGORY_DETAILS_BEGIN,
});

export const getClinicCategoryDetailsSuccess = (product_category) => ({
  type: GET_CLINIC_CATEGORY_DETAILS_SUCCESS,
  payload: product_category,
});

export const getClinicCategoryDetailsFail = (error) => ({
  type: GET_CLINIC_CATEGORY_DETAILS_FAIL,
  payload: error,
});

// Initiate Payment
export const initiateClinicPayment = ({ data, callback }) => ({
  type: INITIATE_CLINIC_PAYMENT,
  data: data,
  callback: callback,
});
export const initiateClinicPaymentBegin = () => ({
  type: INITIATE_CLINIC_PAYMENT_BEGIN,
});

export const initiateClinicPaymentSuccess = (res) => ({
  type: INITIATE_CLINIC_PAYMENT_SUCCESS,
  payload: res,
});

export const initiateClinicPaymentFail = (error) => ({
  type: INITIATE_CLINIC_PAYMENT_FAIL,
  payload: error,
});

//Process Payment
export const processClinicPayment = (
  response,
  id,
  history,
  paytmClose,
  goToTop
) => ({
  type: PROCESS_CLINIC_PAYMENT,
  payload: response,
  id: id,
  history: history,
  paytmClose: paytmClose,
  goToTop: goToTop,
});
export const processClinicPaymentBegin = () => ({
  type: PROCESS_CLINIC_PAYMENT_BEGIN,
});

export const processClinicPaymentSuccess = () => ({
  type: PROCESS_CLINIC_PAYMENT_SUCCESS,
});

export const processClinicPaymentFail = (error) => ({
  type: PROCESS_CLINIC_PAYMENT_FAIL,
  payload: error,
});

export const addClinicPayment = ({ data, callback, history }) => ({
  type: ADD_CLINIC_PAYMENT,
  data: data,
  callback: callback,
  history: history,
});

export const addClinicPaymentBegin = () => ({
  type: ADD_CLINIC_PAYMENT_BEGIN,
});

export const addClinicPaymentSuccess = () => ({
  type: ADD_CLINIC_PAYMENT_SUCCESS,
});

export const addClinicPaymentFail = (error) => ({
  type: ADD_CLINIC_PAYMENT_FAIL,
  payload: error,
});

export const getClinicPayment = ({ data, callback }) => ({
  type: GET_CLINIC_PAYMENT,
  data: data,
  callback: callback,
});

export const getClinicPaymentBegin = () => ({
  type: GET_CLINIC_PAYMENT_BEGIN,
});

export const getClinicPaymentSuccess = (data) => ({
  type: GET_CLINIC_PAYMENT_SUCCESS,
  payload: data,
});

export const getClinicPaymentFail = (error) => ({
  type: GET_CLINIC_PAYMENT_FAIL,
  payload: error,
});

// REVIEWS

export const editClinicReviews = ({ ClinicReviews, callback }) => ({
  type: EDIT_CLINIC_REVIEWS,
  ClinicReviews: ClinicReviews,
  callback: callback,
});

export const editClinicReviewsBegin = () => ({
  type: EDIT_CLINIC_REVIEWS_BEGIN,
});

export const editClinicReviewsSuccess = () => ({
  type: EDIT_CLINIC_REVIEWS_SUCCESS,
});

export const editClinicReviewsFail = (error) => ({
  type: EDIT_CLINIC_REVIEWS_FAIL,
  payload: error,
});

export const addClinicReviews = ({ ClinicReviews, callback }) => ({
  type: ADD_CLINIC_REVIEWS,
  ClinicReviews: ClinicReviews,
  callback: callback,
});

export const addClinicReviewsBegin = () => ({
  type: ADD_CLINIC_REVIEWS_BEGIN,
});

export const addClinicReviewsSuccess = () => ({
  type: ADD_CLINIC_REVIEWS_SUCCESS,
});

export const addClinicReviewsFail = (error) => ({
  type: ADD_CLINIC_REVIEWS_FAIL,
  payload: error,
});

export const deleteClinicReviews = ({ ClinicReviews }) => ({
  type: DELETE_CLINIC_REVIEWS,
  ClinicReviews: ClinicReviews,
});

export const deleteClinicReviewsBegin = () => ({
  type: DELETE_CLINIC_REVIEWS_BEGIN,
});

export const deleteClinicReviewsSuccess = () => ({
  type: DELETE_CLINIC_REVIEWS_SUCCESS,
});

export const deleteClinicReviewsFail = (error) => ({
  type: DELETE_CLINIC_REVIEWS_FAIL,
  payload: error,
});

export const getClinicReviews = ({ data }) => ({
  type: GET_CLINIC_REVIEWS,
  data: data,
});

export const getClinicReviewsBegin = () => ({
  type: GET_CLINIC_REVIEWS_BEGIN,
});

export const getClinicReviewsSuccess = (ClinicReviews) => ({
  type: GET_CLINIC_REVIEWS_SUCCESS,
  payload: ClinicReviews,
});

export const getClinicReviewsFail = (error) => ({
  type: GET_CLINIC_REVIEWS_FAIL,
  payload: error,
});

export const getClinicReviewById = ({ data }) => ({
  type: GET_CLINIC_REVIEW_BY_ID,
  data: data,
});

export const getClinicReviewByIdBegin = () => ({
  type: GET_CLINIC_REVIEW_BY_ID_BEGIN,
});

export const getClinicReviewByIdSuccess = (ClinicReview) => ({
  type: GET_CLINIC_REVIEW_BY_ID_SUCCESS,
  payload: ClinicReview,
});

export const getClinicReviewByIdFail = (error) => ({
  type: GET_CLINIC_REVIEW_BY_ID_FAIL,
  payload: error,
});

export const getLoggedClinicReviews = ({ data }) => ({
  type: GET_LOGGED_CLINIC_REVIEWS,
  data: data,
});

export const getLoggedClinicReviewsBegin = () => ({
  type: GET_LOGGED_CLINIC_REVIEWS_BEGIN,
});

export const getLoggedClinicReviewsSuccess = (reviews) => ({
  type: GET_LOGGED_CLINIC_REVIEWS_SUCCESS,
  payload: reviews,
});

export const getLoggedClinicReviewsFail = (error) => ({
  type: GET_LOGGED_CLINIC_REVIEWS_FAIL,
  payload: error,
});

// Services

export const getClinicServices = ({ data }) => ({
  type: GET_CLINIC_SERVICES,
  data: data,
});

export const getClinicServicesBegin = () => ({
  type: GET_CLINIC_SERVICES_BEGIN,
});

export const getClinicServicesSuccess = (ClinicServices) => ({
  type: GET_CLINIC_SERVICES_SUCCESS,
  payload: ClinicServices,
});

export const getClinicServicesFail = (error) => ({
  type: GET_CLINIC_SERVICES_FAIL,
  payload: error,
});

export const requestClinicBooking = ({ data, callback }) => ({
  type: REQUEST_CLINIC_BOOKING,
  data: data,
  callback: callback,
});

export const requestClinicBookingBegin = () => ({
  type: REQUEST_CLINIC_BOOKING_BEGIN,
});

export const requestClinicBookingSuccess = () => ({
  type: REQUEST_CLINIC_BOOKING_SUCCESS,
});

export const requestClinicBookingFail = (error) => ({
  type: REQUEST_CLINIC_BOOKING_FAIL,
  payload: error,
});

export const bookClinicAppointment = ({ data, callback }) => ({
  type: BOOK_CLINIC_APPOINTMENT,
  data: data,
  callback: callback,
});

export const bookClinicAppointmentBegin = () => ({
  type: BOOK_CLINIC_APPOINTMENT_BEGIN,
});

export const bookClinicAppointmentSuccess = () => ({
  type: BOOK_CLINIC_APPOINTMENT_SUCCESS,
});

export const bookClinicAppointmentFail = (error) => ({
  type: BOOK_CLINIC_APPOINTMENT_FAIL,
  payload: error,
});

export const getClinicBookingFee = () => ({
  type: GET_CLINIC_BOOKING_FEE,
});

export const getClinicBookingFeeBegin = () => ({
  type: GET_CLINIC_BOOKING_FEE_BEGIN,
});

export const getClinicBookingFeeSuccess = (fee) => ({
  type: GET_CLINIC_BOOKING_FEE_SUCCESS,
  payload: fee,
});

export const getClinicBookingFeeFail = () => ({
  type: GET_CLINIC_BOOKING_FEE_FAIL,
});

// SLOTS

export const getClinicSlotById = ({ data }) => ({
  type: GET_CLINIC_SLOT_BY_ID,
  data: data,
});

export const getClinicSlotByIdBegin = () => ({
  type: GET_CLINIC_SLOT_BY_ID_BEGIN,
});

export const getClinicSlotByIdSuccess = (product) => ({
  type: GET_CLINIC_SLOT_BY_ID_SUCCESS,
  payload: product,
});

export const getClinicSlotByIdFail = (error) => ({
  type: GET_CLINIC_SLOT_BY_ID_FAIL,
  payload: error,
});
