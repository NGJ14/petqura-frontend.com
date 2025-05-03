import {
  ADD_DOCTOR_DETAILS_BEGIN,
  ADD_DOCTOR_DETAILS_FAIL,
  ADD_DOCTOR_DETAILS_SUCCESS,
  ADD_SERVICE_DETAILS_BEGIN,
  ADD_SERVICE_DETAILS_FAIL,
  ADD_SERVICE_DETAILS_SUCCESS,
  ADD_SLOT_DETAILS_BEGIN,
  ADD_SLOT_DETAILS_FAIL,
  ADD_SLOT_DETAILS_SUCCESS,
  ADD_SLOT_PRICE_DETAILS_BEGIN,
  ADD_SLOT_PRICE_DETAILS_FAIL,
  ADD_SLOT_PRICE_DETAILS_SUCCESS,
  CHANGE_APPOINTMENT_STATUS_BEGIN,
  CHANGE_APPOINTMENT_STATUS_FAIL,
  CHANGE_APPOINTMENT_STATUS_SUCCESS,
  CLINIC_APPOINTMENT_RESCHEDULE_BEGIN,
  CLINIC_APPOINTMENT_RESCHEDULE_FAIL,
  CLINIC_APPOINTMENT_RESCHEDULE_SUCCESS,
  CLINIC_BLOCK_SLOTS_BEGIN,
  CLINIC_BLOCK_SLOTS_FAIL,
  CLINIC_BLOCK_SLOTS_SUCCESS,
  REMOVE_CLINIC_SLOT_BLOCK_BEGIN,
  REMOVE_CLINIC_SLOT_BLOCK_SUCCESS,
  REMOVE_CLINIC_SLOT_BLOCK_FAIL,
  DELETE_DOCTOR_DETAILS_BEGIN,
  DELETE_DOCTOR_DETAILS_FAIL,
  DELETE_DOCTOR_DETAILS_SUCCESS,
  DELETE_SERVICE_DETAILS_BEGIN,
  DELETE_SERVICE_DETAILS_FAIL,
  DELETE_SERVICE_DETAILS_SUCCESS,
  DELETE_SLOT_DETAILS_BEGIN,
  DELETE_SLOT_DETAILS_FAIL,
  DELETE_SLOT_DETAILS_SUCCESS,
  EDIT_DOCTOR_DETAILS_BEGIN,
  EDIT_DOCTOR_DETAILS_FAIL,
  EDIT_DOCTOR_DETAILS_SUCCESS,
  EDIT_SERVICE_DETAILS_BEGIN,
  EDIT_SERVICE_DETAILS_FAIL,
  EDIT_SERVICE_DETAILS_SUCCESS,
  EDIT_SLOT_DETAILS_BEGIN,
  EDIT_SLOT_DETAILS_FAIL,
  EDIT_SLOT_DETAILS_SUCCESS,
  EDIT_SLOT_STATUS_DETAILS_BEGIN,
  EDIT_SLOT_STATUS_DETAILS_FAIL,
  EDIT_SLOT_STATUS_DETAILS_SUCCESS,
  GET_CLINIC_APPOINTMENT_DETAILS_BEGIN,
  GET_CLINIC_APPOINTMENT_DETAILS_FAIL,
  GET_CLINIC_APPOINTMENT_DETAILS_SUCCESS,
  GET_CLINIC_DASHBOARD_DETAILS_BEGIN,
  GET_CLINIC_DASHBOARD_DETAILS_FAIL,
  GET_CLINIC_DASHBOARD_DETAILS_SUCCESS,
  GET_DOCTOR_BY_ID_BEGIN,
  GET_DOCTOR_BY_ID_FAIL,
  GET_DOCTOR_BY_ID_SUCCESS,
  GET_DOCTOR_DETAILS_BEGIN,
  GET_DOCTOR_DETAILS_FAIL,
  GET_DOCTOR_DETAILS_SUCCESS,
  GET_SERVICE_BY_ID_BEGIN,
  GET_SERVICE_BY_ID_FAIL,
  GET_SERVICE_BY_ID_SUCCESS,
  GET_SERVICE_DETAILS_BEGIN,
  GET_SERVICE_DETAILS_FAIL,
  GET_SERVICE_DETAILS_SUCCESS,
  GET_SLOT_BY_ID_BEGIN,
  GET_SLOT_BY_ID_FAIL,
  GET_SLOT_BY_ID_SUCCESS,
  GET_SLOT_CATEGORY_DETAILS_BEGIN,
  GET_SLOT_CATEGORY_DETAILS_FAIL,
  GET_SLOT_CATEGORY_DETAILS_SUCCESS,
  GET_SLOT_DETAILS_BEGIN,
  GET_SLOT_DETAILS_FAIL,
  GET_SLOT_DETAILS_SUCCESS,
  GET_SLOT_PRICE_DETAILS_BEGIN,
  GET_SLOT_PRICE_DETAILS_FAIL,
  GET_SLOT_PRICE_DETAILS_SUCCESS,
  PUBLISH_DOCTOR_BEGIN,
  PUBLISH_DOCTOR_FAIL,
  PUBLISH_DOCTOR_SUCCESS,
} from "./actionType";

const initial_state = {
  Slot: {},
  loading: false,
  error: "",
  SlotDetails: {},
  SlotCategories: {},
  first_category: "",
  variant: {},
  variantDetails: {},
  first_variant: "",
  clinicDashboard: "",
  clinicAppointments: {},
  slotPrice: {},
  reScheduleMessage: "",
};

const Slot = (state = initial_state, action) => {
  switch (action.type) {
    case GET_SLOT_CATEGORY_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SLOT_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        SlotCategories: action.payload,
        error: "",
        first_category: action.payload?.categories[0]?.id,
      };
    case GET_SLOT_CATEGORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        SlotCategories: "",
        error: action.payload,
      };

    case GET_SLOT_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SLOT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        SlotDetails: action.payload,
        error: "",
      };
    case GET_SLOT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        SlotDetails: "",
        error: action.payload,
      };

    case GET_SLOT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SLOT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        Slot: action.payload,
        error: "",
      };
    case GET_SLOT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        Slot: "",
        error: action.payload,
      };

    case EDIT_SLOT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_SLOT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_SLOT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_SLOT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_SLOT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        SlotDetails: action.payload,
      };
    case ADD_SLOT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_SLOT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_SLOT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_SLOT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Slot Price

    case ADD_SLOT_PRICE_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_SLOT_PRICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_SLOT_PRICE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_SLOT_PRICE_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        slotPrice: {},
      };
    case GET_SLOT_PRICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        slotPrice: action.payload,
      };
    case GET_SLOT_PRICE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        slotPrice: {},
      };

    // slot status

    case EDIT_SLOT_STATUS_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_SLOT_STATUS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_SLOT_STATUS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Dashboard

    case GET_CLINIC_DASHBOARD_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        clinicDashboard: {},
      };
    case GET_CLINIC_DASHBOARD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        clinicDashboard: action.payload,
      };
    case GET_CLINIC_DASHBOARD_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        clinicDashboard: {},
      };

    case GET_CLINIC_APPOINTMENT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
        clinicAppointments: {},
      };
    case GET_CLINIC_APPOINTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        clinicAppointments: action.payload,
      };
    case GET_CLINIC_APPOINTMENT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        clinicDashboard: {},
      };

    case CHANGE_APPOINTMENT_STATUS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CHANGE_APPOINTMENT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case CHANGE_APPOINTMENT_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLINIC_APPOINTMENT_RESCHEDULE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case CLINIC_APPOINTMENT_RESCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        reScheduleMessage: action.payload,
        error: "",
      };

    case CLINIC_APPOINTMENT_RESCHEDULE_FAIL:
      return {
        ...state,
        loading: false,
        blockSlotMessage: "",
        error: action.payload,
      };

    case CLINIC_BLOCK_SLOTS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case CLINIC_BLOCK_SLOTS_SUCCESS:
      return {
        ...state,
        loading: false,
        blockSlotMessage: action.payload,
        error: "",
      };

    case CLINIC_BLOCK_SLOTS_FAIL:
      return {
        ...state,
        loading: false,
        reScheduleMessage: "",
        error: action.payload,
      };

    case REMOVE_CLINIC_SLOT_BLOCK_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case REMOVE_CLINIC_SLOT_BLOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case REMOVE_CLINIC_SLOT_BLOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Doctor

    case GET_DOCTOR_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_DOCTOR_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        DoctorDetails: action.payload,
        error: "",
      };
    case GET_DOCTOR_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        DoctorDetails: "",
        error: action.payload,
      };

    case GET_DOCTOR_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_DOCTOR_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        Doctor: action.payload,
        error: "",
      };
    case GET_DOCTOR_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        Doctor: "",
        error: action.payload,
      };

    case EDIT_DOCTOR_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_DOCTOR_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_DOCTOR_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_DOCTOR_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_DOCTOR_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        DoctorDetails: action.payload,
      };
    case ADD_DOCTOR_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_DOCTOR_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_DOCTOR_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_DOCTOR_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // SERVICE

    case GET_SERVICE_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SERVICE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        ServiceDetails: action.payload,
        error: "",
      };
    case GET_SERVICE_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        ServiceDetails: "",
        error: action.payload,
      };

    case GET_SERVICE_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        Service: action.payload,
        error: "",
      };
    case GET_SERVICE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        Service: "",
        error: action.payload,
      };

    case EDIT_SERVICE_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_SERVICE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_SERVICE_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        ServiceDetails: action.payload,
      };
    case ADD_SERVICE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_SERVICE_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_SERVICE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PUBLISH_DOCTOR_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case PUBLISH_DOCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case PUBLISH_DOCTOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default Slot;
