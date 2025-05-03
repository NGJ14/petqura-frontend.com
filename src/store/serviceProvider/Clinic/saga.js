import { call, put, takeLatest } from "redux-saga/effects";
import { add, del, get, post, update } from "../../../helpers/api_helpers";
import {
  editSlotDetailsBegin,
  editSlotDetailsSuccess,
  editSlotDetailsFail,
  deleteSlotDetailsBegin,
  deleteSlotDetailsSuccess,
  deleteSlotDetailsFail,
  getSlotByIdBegin,
  getSlotByIdSuccess,
  getSlotByIdFail,
  addSlotDetailsBegin,
  addSlotDetailsSuccess,
  addSlotDetailsFail,
  getSlotDetailsBegin,
  getSlotDetailsSuccess,
  getSlotDetailsFail,
  getSlotCategoryDetailsBegin,
  getSlotCategoryDetailsSuccess,
  getSlotCategoryDetailsFail,
  getClinicDashboardDetailsBegin,
  getClinicDashboardDetailsSuccess,
  getClinicDashboardDetailsFail,
  getClinicAppointmentDetailsBegin,
  getClinicAppointmentDetailsSuccess,
  getClinicAppointmentDetailsFail,
  changeAppointmentStatusBegin,
  changeAppointmentStatusSuccess,
  changeAppointmentStatusFail,
  editDoctorDetailsBegin,
  editDoctorDetailsSuccess,
  editDoctorDetailsFail,
  addDoctorDetailsBegin,
  addDoctorDetailsSuccess,
  addDoctorDetailsFail,
  deleteDoctorDetailsBegin,
  deleteDoctorDetailsSuccess,
  deleteDoctorDetailsFail,
  getDoctorDetailsBegin,
  getDoctorDetailsSuccess,
  getDoctorDetailsFail,
  getDoctorByIdBegin,
  getDoctorByIdSuccess,
  getDoctorByIdFail,
  editServiceDetailsBegin,
  editServiceDetailsSuccess,
  editServiceDetailsFail,
  addServiceDetailsBegin,
  addServiceDetailsSuccess,
  addServiceDetailsFail,
  deleteServiceDetailsBegin,
  deleteServiceDetailsSuccess,
  deleteServiceDetailsFail,
  getServiceDetailsBegin,
  getServiceDetailsSuccess,
  getServiceDetailsFail,
  getServiceByIdBegin,
  getServiceByIdSuccess,
  getServiceByIdFail,
  addSlotPriceDetailsBegin,
  addSlotPriceDetailsSuccess,
  addSlotPriceDetailsFail,
  getSlotPriceDetailsBegin,
  getSlotPriceDetailsSuccess,
  getSlotPriceDetailsFail,
  editSlotStatusDetailsBegin,
  editSlotStatusDetailsSuccess,
  editSlotStatusDetailsFail,
  clinicAppointmentRescheduleBegin,
  clinicAppointmentRescheduleSuccess,
  clinicAppointmentRescheduleFail,
  clinicBlockSlotsBegin,
  clinicBlockSlotsSuccess,
  clinicBlockSlotsFail,
  removeClinicSlotBlockBegin,
  removeClinicSlotBlockSuccess,
  removeClinicSlotBlockFail,
  publishDoctorBegin,
  publishDoctorSuccess,
  publishDoctorFail,
} from "./action";
import {
  ADD_DOCTOR_DETAILS,
  ADD_SERVICE_DETAILS,
  ADD_SLOT_DETAILS,
  ADD_SLOT_PRICE_DETAILS,
  CHANGE_APPOINTMENT_STATUS,
  CLINIC_APPOINTMENT_RESCHEDULE,
  CLINIC_BLOCK_SLOTS,
  REMOVE_CLINIC_SLOT_BLOCK,
  DELETE_DOCTOR_DETAILS,
  DELETE_SERVICE_DETAILS,
  DELETE_SLOT_DETAILS,
  EDIT_DOCTOR_DETAILS,
  EDIT_SERVICE_DETAILS,
  EDIT_SLOT_DETAILS,
  EDIT_SLOT_STATUS_DETAILS,
  GET_CLINIC_APPOINTMENT_DETAILS,
  GET_CLINIC_DASHBOARD_DETAILS,
  GET_DOCTOR_BY_ID,
  GET_DOCTOR_DETAILS,
  GET_SERVICE_BY_ID,
  GET_SERVICE_DETAILS,
  GET_SLOT_BY_ID,
  GET_SLOT_CATEGORY_DETAILS,
  GET_SLOT_DETAILS,
  GET_SLOT_PRICE_DETAILS,
  PUBLISH_DOCTOR,
} from "./actionType";

function* editSlotDetails({ Slot, callback }) {
  try {
    yield put(editSlotDetailsBegin());
    const response = yield call(update, "/partner/clinic_slots", Slot);
    if (response) {
      yield put(editSlotDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(editSlotDetailsFail(error));
  }
}

function* addSlotDetails({ Slot, callback }) {
  try {
    yield put(addSlotDetailsBegin());
    const response = yield call(add, "/partner/clinic_slots", Slot);
    if (response) {
      yield put(addSlotDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(addSlotDetailsFail(error));
  }
}

function* deleteSlotDetails({ data, callback }) {
  try {
    yield put(deleteSlotDetailsBegin());
    const response = yield call(del, `/partner/clinic_slots_detail`, data);
    if (response) {
      yield put(deleteSlotDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(deleteSlotDetailsFail(error));
  }
}

function* getSlotDetails({ request }) {
  try {
    yield put(getSlotDetailsBegin());
    const response = yield call(get, "/partner/clinic_slots", request);
    if (response) {
      yield put(getSlotDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getSlotDetailsFail(error));
  }
}

function* getSlotCategoryDetails({ data }) {
  try {
    yield put(getSlotCategoryDetailsBegin());
    const response = yield call(get, "/partner/list_Slot_categories", data);
    if (response) {
      yield put(getSlotCategoryDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getSlotCategoryDetailsFail(error));
  }
}

function* getSlotById({ data }) {
  try {
    yield put(getSlotByIdBegin());
    const response = yield call(get, `/partner/clinic_slots_detail`, data);
    if (response) {
      yield put(getSlotByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getSlotByIdFail(error));
  }
}

// Slot Price

function* addSlotPriceDetails({ SlotPrice, callback }) {
  try {
    yield put(addSlotPriceDetailsBegin());
    const response = yield call(update, "/partner/slot_price", SlotPrice);
    if (response) {
      yield put(addSlotPriceDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(addSlotPriceDetailsFail(error));
  }
}

function* getSlotPriceDetails() {
  try {
    yield put(getSlotPriceDetailsBegin());
    const response = yield call(get, "/partner/slot_price");
    if (response) {
      yield put(getSlotPriceDetailsSuccess(response.result));
    }
  } catch (error) {
    console.log(error);
    yield put(getSlotPriceDetailsFail(error));
  }
}

// slot status

function* editSlotStatusDetails({ Slot, callback }) {
  try {
    yield put(editSlotStatusDetailsBegin());
    const response = yield call(update, "/partner/change_slot_status", Slot);
    if (response) {
      yield put(editSlotStatusDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(editSlotStatusDetailsFail(error));
  }
}

// Doctor

function* editDoctorDetails({ Doctor, callback }) {
  try {
    yield put(editDoctorDetailsBegin());
    const response = yield call(update, "/partner/clinic_doctors", Doctor);
    if (response) {
      yield put(editDoctorDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(editDoctorDetailsFail(error));
  }
}

function* addDoctorDetails({ Doctor, callback }) {
  try {
    yield put(addDoctorDetailsBegin());
    const response = yield call(add, "/partner/clinic_doctors", Doctor);
    if (response) {
      yield put(addDoctorDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(addDoctorDetailsFail(error));
  }
}

function* deleteDoctorDetails({ data, callback }) {
  try {
    yield put(deleteDoctorDetailsBegin());
    const response = yield call(del, `/partner/clinic_doctors`, data);
    if (response) {
      yield put(deleteDoctorDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(deleteDoctorDetailsFail(error));
  }
}

function* getDoctorDetails({ request }) {
  try {
    yield put(getDoctorDetailsBegin());
    const response = yield call(get, "/partner/clinic_doctors", request);
    if (response) {
      yield put(getDoctorDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getDoctorDetailsFail(error));
  }
}

function* getDoctorById({ data }) {
  try {
    yield put(getDoctorByIdBegin());
    const response = yield call(get, `/partner/clinic_doctor_details`, data);
    if (response) {
      yield put(getDoctorByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getDoctorByIdFail(error));
  }
}

// SERVICES

function* editServiceDetails({ Service, callback }) {
  try {
    yield put(editServiceDetailsBegin());
    const response = yield call(update, "/partner/clinic_service", Service);
    if (response) {
      yield put(editServiceDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(editServiceDetailsFail(error));
  }
}

function* addServiceDetails({ Service, callback }) {
  try {
    yield put(addServiceDetailsBegin());
    const response = yield call(add, "/partner/clinic_service", Service);
    if (response) {
      yield put(addServiceDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(addServiceDetailsFail(error));
  }
}

function* deleteServiceDetails({ data, callback }) {
  try {
    yield put(deleteServiceDetailsBegin());
    const response = yield call(del, `/partner/clinic_service`, data);
    if (response) {
      yield put(deleteServiceDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(deleteServiceDetailsFail(error));
  }
}

function* getServiceDetails({ request }) {
  try {
    yield put(getServiceDetailsBegin());
    const response = yield call(get, "/partner/clinic_service", request);
    if (response) {
      yield put(getServiceDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getServiceDetailsFail(error));
  }
}

function* getServiceById({ data }) {
  try {
    yield put(getServiceByIdBegin());
    const response = yield call(get, `/partner/clinic_service_details`, data);
    if (response) {
      yield put(getServiceByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getServiceByIdFail(error));
  }
}

function* getClinicDashboardDetails() {
  try {
    yield put(getClinicDashboardDetailsBegin());
    const response = yield call(get, `/partner/clinic_dashboard`);
    if (response) {
      yield put(getClinicDashboardDetailsSuccess(response.result));
    }
  } catch (error) {
    console.log(error);
    yield put(getClinicDashboardDetailsFail(error));
  }
}

function* getClinicAppointmentDetails({ data }) {
  try {
    yield put(getClinicAppointmentDetailsBegin());
    const response = yield call(get, `/partner/view_clinic_appointments`, data);
    if (response) {
      yield put(getClinicAppointmentDetailsSuccess(response.result));
    }
  } catch (error) {
    console.log(error);
    yield put(getClinicAppointmentDetailsFail(error));
  }
}

function* changeAppointmentStatus({ data, callback }) {
  try {
    yield put(changeAppointmentStatusBegin());
    const response = yield call(
      update,
      "/partner/change_appointment_status",
      data
    );
    if (response) {
      yield put(changeAppointmentStatusSuccess());
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(changeAppointmentStatusFail(error));
  }
}

function* clinicAppointmentReschedule({ data, callback }) {
  try {
    yield put(clinicAppointmentRescheduleBegin());
    const response = yield call(post, "/partner/request_reshedule", data);
    if (response) {
      yield put(clinicAppointmentRescheduleSuccess(response.message));
      callback && callback();
    }
  } catch (error) {
    yield put(clinicAppointmentRescheduleFail(error));
  }
}

function* clinicBlockSlots({ data, callback }) {
  try {
    yield put(clinicBlockSlotsBegin());
    const response = yield call(post, "/partner/block_slot", data);
    if (response) {
      yield put(clinicBlockSlotsSuccess(response.message));
      callback && callback();
    }
  } catch (error) {
    yield put(clinicBlockSlotsFail(error));
  }
}

function* removeClinicSlotBlock({ data, callback }) {
  try {
    yield put(removeClinicSlotBlockBegin());
    const response = yield call(post, "/partner/delete_blocked_slot", data);
    if (response) {
      yield put(removeClinicSlotBlockSuccess(response.message));
      callback && callback();
    }
  } catch (error) {
    yield put(removeClinicSlotBlockFail(error));
  }
}

function* publishDoctor({ data, callback }) {
  try {
    yield put(publishDoctorBegin());
    const response = yield call(get, "/partner/change_doctor_status", data);
    if (response) {
      yield put(publishDoctorSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(publishDoctorFail(error));
  }
}

function* SlotSaga() {
  yield takeLatest(GET_SLOT_CATEGORY_DETAILS, getSlotCategoryDetails);
  yield takeLatest(GET_SLOT_BY_ID, getSlotById);
  yield takeLatest(EDIT_SLOT_DETAILS, editSlotDetails);
  yield takeLatest(ADD_SLOT_DETAILS, addSlotDetails);
  yield takeLatest(DELETE_SLOT_DETAILS, deleteSlotDetails);
  yield takeLatest(GET_SLOT_DETAILS, getSlotDetails);

  yield takeLatest(ADD_SLOT_PRICE_DETAILS, addSlotPriceDetails);
  yield takeLatest(GET_SLOT_PRICE_DETAILS, getSlotPriceDetails);

  yield takeLatest(EDIT_SLOT_STATUS_DETAILS, editSlotStatusDetails);

  yield takeLatest(GET_DOCTOR_BY_ID, getDoctorById);
  yield takeLatest(EDIT_DOCTOR_DETAILS, editDoctorDetails);
  yield takeLatest(ADD_DOCTOR_DETAILS, addDoctorDetails);
  yield takeLatest(DELETE_DOCTOR_DETAILS, deleteDoctorDetails);
  yield takeLatest(GET_DOCTOR_DETAILS, getDoctorDetails);

  yield takeLatest(GET_SERVICE_BY_ID, getServiceById);
  yield takeLatest(EDIT_SERVICE_DETAILS, editServiceDetails);
  yield takeLatest(ADD_SERVICE_DETAILS, addServiceDetails);
  yield takeLatest(DELETE_SERVICE_DETAILS, deleteServiceDetails);
  yield takeLatest(GET_SERVICE_DETAILS, getServiceDetails);

  yield takeLatest(GET_CLINIC_DASHBOARD_DETAILS, getClinicDashboardDetails);
  yield takeLatest(GET_CLINIC_APPOINTMENT_DETAILS, getClinicAppointmentDetails);
  yield takeLatest(CHANGE_APPOINTMENT_STATUS, changeAppointmentStatus);
  yield takeLatest(CLINIC_APPOINTMENT_RESCHEDULE, clinicAppointmentReschedule);
  yield takeLatest(CLINIC_BLOCK_SLOTS, clinicBlockSlots);
  yield takeLatest(REMOVE_CLINIC_SLOT_BLOCK, removeClinicSlotBlock);
  yield takeLatest(PUBLISH_DOCTOR, publishDoctor);
}

export default SlotSaga;
