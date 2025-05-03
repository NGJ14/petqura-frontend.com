import {
  GET_CLINIC_BY_ID_BEGIN,
  GET_CLINIC_BY_ID_FAIL,
  GET_CLINIC_BY_ID_SUCCESS,
  GET_CLINIC_CATEGORY_DETAILS_BEGIN,
  GET_CLINIC_CATEGORY_DETAILS_FAIL,
  GET_CLINIC_CATEGORY_DETAILS_SUCCESS,
  GET_CLINIC_DETAILS_BEGIN,
  GET_CLINIC_DETAILS_FAIL,
  GET_CLINIC_DETAILS_SUCCESS,
  GET_USER_VARIANT_BY_ID_BEGIN,
  GET_USER_VARIANT_BY_ID_FAIL,
  GET_USER_VARIANT_BY_ID_SUCCESS,
  GET_USER_VARIANT_DETAILS_FAIL,
  GET_USER_VARIANT_DETAILS_SUCCESS,
  GET_USER_VARIANT_DETAILS_BEGIN,
  INITIATE_CLINIC_PAYMENT_BEGIN,
  INITIATE_CLINIC_PAYMENT_SUCCESS,
  INITIATE_CLINIC_PAYMENT_FAIL,
  PROCESS_CLINIC_PAYMENT_BEGIN,
  PROCESS_CLINIC_PAYMENT_SUCCESS,
  PROCESS_CLINIC_PAYMENT_FAIL,
  ADD_CLINIC_PAYMENT_BEGIN,
  ADD_CLINIC_PAYMENT_SUCCESS,
  ADD_CLINIC_PAYMENT_FAIL,
  GET_CLINIC_PAYMENT_BEGIN,
  GET_CLINIC_PAYMENT_SUCCESS,
  GET_CLINIC_PAYMENT_FAIL,
  GET_CLINIC_REVIEWS_BEGIN,
  GET_CLINIC_REVIEWS_SUCCESS,
  GET_CLINIC_REVIEWS_FAIL,
  GET_CLINIC_REVIEW_BY_ID_BEGIN,
  GET_CLINIC_REVIEW_BY_ID_SUCCESS,
  GET_CLINIC_REVIEW_BY_ID_FAIL,
  EDIT_CLINIC_REVIEWS_BEGIN,
  EDIT_CLINIC_REVIEWS_SUCCESS,
  EDIT_CLINIC_REVIEWS_FAIL,
  ADD_CLINIC_REVIEWS_BEGIN,
  ADD_CLINIC_REVIEWS_SUCCESS,
  ADD_CLINIC_REVIEWS_FAIL,
  DELETE_CLINIC_REVIEWS_BEGIN,
  DELETE_CLINIC_REVIEWS_SUCCESS,
  DELETE_CLINIC_REVIEWS_FAIL,
  GET_CLINIC_SERVICES_BEGIN,
  GET_CLINIC_SERVICES_SUCCESS,
  GET_CLINIC_SERVICES_FAIL,
  GET_LOGGED_CLINIC_REVIEWS_BEGIN,
  GET_LOGGED_CLINIC_REVIEWS_SUCCESS,
  GET_LOGGED_CLINIC_REVIEWS_FAIL,
  REQUEST_CLINIC_BOOKING_BEGIN,
  REQUEST_CLINIC_BOOKING_SUCCESS,
  REQUEST_CLINIC_BOOKING_FAIL,
  GET_CLINIC_BOOKING_FEE_BEGIN,
  GET_CLINIC_BOOKING_FEE_SUCCESS,
  GET_CLINIC_BOOKING_FEE_FAIL,
  GET_CLINIC_SLOT_BY_ID_BEGIN,
  GET_CLINIC_SLOT_BY_ID_SUCCESS,
  GET_CLINIC_SLOT_BY_ID_FAIL,
  BOOK_CLINIC_APPOINTMENT_BEGIN,
  BOOK_CLINIC_APPOINTMENT_SUCCESS,
  BOOK_CLINIC_APPOINTMENT_FAIL,
} from "./actionType";

const initial_state = {
  Clinic: {},
  loading: false,
  tab_loading: false,
  error: "",
  ClinicDetails: {},
  variant: {},
  productCategories: {},
  variantDetails: {},
  ServiceData: {},
  userClinicReview: {},
  bookingFee: {},
  ClinicSlotDetails: {},
  Payment: {},
};

const Clinic = (state = initial_state, action) => {
  switch (action.type) {
    // USER PRODUCT BY ID
    case GET_CLINIC_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        ClinicDetails: "",
      };
    case GET_CLINIC_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        ClinicDetails: action.payload,
        error: "",
      };
    case GET_CLINIC_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        ClinicDetails: "",
        error: action.payload,
      };

    // USER PRODUCTS

    case GET_CLINIC_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_CLINIC_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        Clinic: action.payload,
        error: "",
      };
    case GET_CLINIC_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        Clinic: "",
        error: action.payload,
      };

    //VARIANT

    case GET_USER_VARIANT_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_USER_VARIANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        variant: action.payload,
        error: "",
      };
    case GET_USER_VARIANT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        variant: "",
        error: action.payload,
      };

    case GET_USER_VARIANT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_USER_VARIANT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        variantDetails: action.payload,

        error: "",
      };
    case GET_USER_VARIANT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        variantDetails: "",
        error: action.payload,
      };

    // Category

    case GET_CLINIC_CATEGORY_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_CLINIC_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        productCategories: action.payload,
        error: "",
      };
    case GET_CLINIC_CATEGORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        productCategories: "",
        error: action.payload,
      };

    // Initiate PAYMENT
    case INITIATE_CLINIC_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        Payment: {},
      };
    case INITIATE_CLINIC_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        Payment: action.payload,
      };
    case INITIATE_CLINIC_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        Payment: {},
      };

    // Process PAYMENT
    case PROCESS_CLINIC_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case PROCESS_CLINIC_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case PROCESS_CLINIC_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_CLINIC_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_CLINIC_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_CLINIC_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_CLINIC_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        paymentData: {},
        error: "",
      };
    case GET_CLINIC_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentData: action.payload,
        error: "",
      };
    case GET_CLINIC_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        paymentData: {},
        error: action.payload,
      };

    // CLINIC_REVIEWS

    case GET_CLINIC_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        reviewData: {},
      };
    case GET_CLINIC_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        reviewData: action.payload,
      };
    case GET_CLINIC_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        reviewData: {},
      };

    case GET_CLINIC_REVIEW_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_CLINIC_REVIEW_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        review: action.payload,
      };
    case GET_CLINIC_REVIEW_BY_ID_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        review: {},
      };

    case GET_LOGGED_CLINIC_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        userClinicReview: {},
      };
    case GET_LOGGED_CLINIC_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        userClinicReview: action.payload,
      };
    case GET_LOGGED_CLINIC_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        userClinicReview: {},
      };

    case EDIT_CLINIC_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_CLINIC_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_CLINIC_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case ADD_CLINIC_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_CLINIC_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_CLINIC_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case DELETE_CLINIC_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_CLINIC_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_CLINIC_REVIEWS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    // Services

    case GET_CLINIC_SERVICES_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        ServiceData: {},
      };
    case GET_CLINIC_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        ServiceData: action.payload,
      };
    case GET_CLINIC_SERVICES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ServiceData: {},
      };

    case REQUEST_CLINIC_BOOKING_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case REQUEST_CLINIC_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case REQUEST_CLINIC_BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case BOOK_CLINIC_APPOINTMENT_BEGIN:
      return {
        ...state,
        loading: true,
        ClinicDetails: "",
      };

    case BOOK_CLINIC_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ClinicDetails: action.payload,
      };

    case BOOK_CLINIC_APPOINTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ClinicDetails: "",
      };

    case GET_CLINIC_BOOKING_FEE_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        bookingFee: {},
      };
    case GET_CLINIC_BOOKING_FEE_SUCCESS:
      return {
        ...state,
        loading: true,
        error: "",
        bookingFee: action.payload,
      };
    case GET_CLINIC_BOOKING_FEE_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
        bookingFee: {},
      };

    // SLOTS

    case GET_CLINIC_SLOT_BY_ID_BEGIN:
      return {
        ...state,
        tab_loading: true,
        error: "",
        ClinicSlotDetails: "",
      };
    case GET_CLINIC_SLOT_BY_ID_SUCCESS:
      return {
        ...state,
        tab_loading: false,
        ClinicSlotDetails: action.payload,
        error: "",
      };
    case GET_CLINIC_SLOT_BY_ID_FAIL:
      return {
        ...state,
        tab_loading: false,
        ClinicSlotDetails: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Clinic;
