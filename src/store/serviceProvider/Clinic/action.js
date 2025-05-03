import {
  ADD_SLOT_DETAILS,
  ADD_SLOT_DETAILS_BEGIN,
  ADD_SLOT_DETAILS_FAIL,
  ADD_SLOT_DETAILS_SUCCESS,
  DELETE_SLOT_DETAILS,
  DELETE_SLOT_DETAILS_BEGIN,
  DELETE_SLOT_DETAILS_FAIL,
  DELETE_SLOT_DETAILS_SUCCESS,
  EDIT_SLOT_DETAILS,
  EDIT_SLOT_DETAILS_BEGIN,
  EDIT_SLOT_DETAILS_FAIL,
  EDIT_SLOT_DETAILS_SUCCESS,
  GET_CLINIC_DASHBOARD_DETAILS,
  GET_CLINIC_DASHBOARD_DETAILS_BEGIN,
  GET_CLINIC_DASHBOARD_DETAILS_FAIL,
  GET_CLINIC_DASHBOARD_DETAILS_SUCCESS,
  GET_SLOT_BY_ID,
  GET_SLOT_BY_ID_BEGIN,
  GET_SLOT_BY_ID_FAIL,
  GET_SLOT_BY_ID_SUCCESS,
  GET_SLOT_CATEGORY_DETAILS,
  GET_SLOT_CATEGORY_DETAILS_BEGIN,
  GET_SLOT_CATEGORY_DETAILS_FAIL,
  GET_SLOT_CATEGORY_DETAILS_SUCCESS,
  GET_SLOT_DETAILS,
  GET_SLOT_DETAILS_BEGIN,
  GET_SLOT_DETAILS_FAIL,
  GET_SLOT_DETAILS_SUCCESS,
  GET_CLINIC_APPOINTMENT_DETAILS,
  GET_CLINIC_APPOINTMENT_DETAILS_BEGIN,
  GET_CLINIC_APPOINTMENT_DETAILS_SUCCESS,
  GET_CLINIC_APPOINTMENT_DETAILS_FAIL,
  CHANGE_APPOINTMENT_STATUS_BEGIN,
  CHANGE_APPOINTMENT_STATUS_SUCCESS,
  CHANGE_APPOINTMENT_STATUS_FAIL,
  CHANGE_APPOINTMENT_STATUS,
  EDIT_DOCTOR_DETAILS,
  EDIT_DOCTOR_DETAILS_BEGIN,
  EDIT_DOCTOR_DETAILS_SUCCESS,
  EDIT_DOCTOR_DETAILS_FAIL,
  ADD_DOCTOR_DETAILS,
  ADD_DOCTOR_DETAILS_BEGIN,
  ADD_DOCTOR_DETAILS_SUCCESS,
  ADD_DOCTOR_DETAILS_FAIL,
  DELETE_DOCTOR_DETAILS,
  DELETE_DOCTOR_DETAILS_BEGIN,
  DELETE_DOCTOR_DETAILS_SUCCESS,
  DELETE_DOCTOR_DETAILS_FAIL,
  GET_DOCTOR_DETAILS,
  GET_DOCTOR_DETAILS_BEGIN,
  GET_DOCTOR_DETAILS_SUCCESS,
  GET_DOCTOR_DETAILS_FAIL,
  GET_DOCTOR_BY_ID,
  GET_DOCTOR_BY_ID_BEGIN,
  GET_DOCTOR_BY_ID_SUCCESS,
  GET_DOCTOR_BY_ID_FAIL,
  EDIT_SERVICE_DETAILS,
  EDIT_SERVICE_DETAILS_BEGIN,
  EDIT_SERVICE_DETAILS_SUCCESS,
  EDIT_SERVICE_DETAILS_FAIL,
  ADD_SERVICE_DETAILS,
  ADD_SERVICE_DETAILS_BEGIN,
  ADD_SERVICE_DETAILS_SUCCESS,
  ADD_SERVICE_DETAILS_FAIL,
  DELETE_SERVICE_DETAILS,
  DELETE_SERVICE_DETAILS_BEGIN,
  DELETE_SERVICE_DETAILS_SUCCESS,
  DELETE_SERVICE_DETAILS_FAIL,
  GET_SERVICE_DETAILS,
  GET_SERVICE_DETAILS_BEGIN,
  GET_SERVICE_DETAILS_SUCCESS,
  GET_SERVICE_DETAILS_FAIL,
  GET_SERVICE_BY_ID,
  GET_SERVICE_BY_ID_BEGIN,
  GET_SERVICE_BY_ID_SUCCESS,
  GET_SERVICE_BY_ID_FAIL,
  ADD_SLOT_PRICE_DETAILS,
  ADD_SLOT_PRICE_DETAILS_BEGIN,
  ADD_SLOT_PRICE_DETAILS_SUCCESS,
  ADD_SLOT_PRICE_DETAILS_FAIL,
  GET_SLOT_PRICE_DETAILS_BEGIN,
  GET_SLOT_PRICE_DETAILS_SUCCESS,
  GET_SLOT_PRICE_DETAILS_FAIL,
  GET_SLOT_PRICE_DETAILS,
  EDIT_SLOT_STATUS_DETAILS,
  EDIT_SLOT_STATUS_DETAILS_BEGIN,
  EDIT_SLOT_STATUS_DETAILS_SUCCESS,
  EDIT_SLOT_STATUS_DETAILS_FAIL,
  CLINIC_APPOINTMENT_RESCHEDULE,
  CLINIC_APPOINTMENT_RESCHEDULE_BEGIN,
  CLINIC_APPOINTMENT_RESCHEDULE_SUCCESS,
  CLINIC_APPOINTMENT_RESCHEDULE_FAIL,
  CLINIC_BLOCK_SLOTS,
  CLINIC_BLOCK_SLOTS_BEGIN,
  CLINIC_BLOCK_SLOTS_SUCCESS,
  CLINIC_BLOCK_SLOTS_FAIL,
  REMOVE_CLINIC_SLOT_BLOCK,
  REMOVE_CLINIC_SLOT_BLOCK_BEGIN,
  REMOVE_CLINIC_SLOT_BLOCK_SUCCESS,
  REMOVE_CLINIC_SLOT_BLOCK_FAIL,
  PUBLISH_DOCTOR,
  PUBLISH_DOCTOR_BEGIN,
  PUBLISH_DOCTOR_SUCCESS,
  PUBLISH_DOCTOR_FAIL,
} from "./actionType";

export const editSlotDetails = ({ Slot, callback }) => ({
  type: EDIT_SLOT_DETAILS,
  Slot: Slot,
  callback: callback,
});

export const editSlotDetailsBegin = () => ({
  type: EDIT_SLOT_DETAILS_BEGIN,
});

export const editSlotDetailsSuccess = () => ({
  type: EDIT_SLOT_DETAILS_SUCCESS,
});

export const editSlotDetailsFail = (error) => ({
  type: EDIT_SLOT_DETAILS_FAIL,
  payload: error,
});

export const addSlotDetails = ({ Slot, callback }) => ({
  type: ADD_SLOT_DETAILS,
  Slot: Slot,
  callback: callback,
});

export const addSlotDetailsBegin = () => ({
  type: ADD_SLOT_DETAILS_BEGIN,
});

export const addSlotDetailsSuccess = () => ({
  type: ADD_SLOT_DETAILS_SUCCESS,
});

export const addSlotDetailsFail = (error) => ({
  type: ADD_SLOT_DETAILS_FAIL,
  payload: error,
});

export const deleteSlotDetails = ({ data, callback }) => ({
  type: DELETE_SLOT_DETAILS,
  data: data,
  callback: callback,
});

export const deleteSlotDetailsBegin = () => ({
  type: DELETE_SLOT_DETAILS_BEGIN,
});

export const deleteSlotDetailsSuccess = () => ({
  type: DELETE_SLOT_DETAILS_SUCCESS,
});

export const deleteSlotDetailsFail = (error) => ({
  type: DELETE_SLOT_DETAILS_FAIL,
  payload: error,
});

export const getSlotDetails = ({ request }) => ({
  type: GET_SLOT_DETAILS,
  request: request,
});

export const getSlotDetailsBegin = () => ({
  type: GET_SLOT_DETAILS_BEGIN,
});

export const getSlotDetailsSuccess = (slot) => ({
  type: GET_SLOT_DETAILS_SUCCESS,
  payload: slot,
});

export const getSlotDetailsFail = (error) => ({
  type: GET_SLOT_DETAILS_FAIL,
  payload: error,
});

export const getSlotById = ({ data }) => ({
  type: GET_SLOT_BY_ID,
  data: data,
});

export const getSlotByIdBegin = () => ({
  type: GET_SLOT_BY_ID_BEGIN,
});

export const getSlotByIdSuccess = (pet) => ({
  type: GET_SLOT_BY_ID_SUCCESS,
  payload: pet,
});

export const getSlotByIdFail = (error) => ({
  type: GET_SLOT_BY_ID_FAIL,
  payload: error,
});

export const getSlotCategoryDetails = ({ data }) => ({
  type: GET_SLOT_CATEGORY_DETAILS,
  data: data,
});

export const getSlotCategoryDetailsBegin = () => ({
  type: GET_SLOT_CATEGORY_DETAILS_BEGIN,
});

export const getSlotCategoryDetailsSuccess = (Slot_category) => ({
  type: GET_SLOT_CATEGORY_DETAILS_SUCCESS,
  payload: Slot_category,
});

export const getSlotCategoryDetailsFail = (error) => ({
  type: GET_SLOT_CATEGORY_DETAILS_FAIL,
  payload: error,
});

// Slot Price

export const addSlotPriceDetails = ({ SlotPrice, callback }) => ({
  type: ADD_SLOT_PRICE_DETAILS,
  SlotPrice: SlotPrice,
  callback: callback,
});

export const addSlotPriceDetailsBegin = () => ({
  type: ADD_SLOT_PRICE_DETAILS_BEGIN,
});

export const addSlotPriceDetailsSuccess = () => ({
  type: ADD_SLOT_PRICE_DETAILS_SUCCESS,
});

export const addSlotPriceDetailsFail = (error) => ({
  type: ADD_SLOT_PRICE_DETAILS_FAIL,
  payload: error,
});

// slot  status

export const editSlotStatusDetails = ({ Slot, callback }) => ({
  type: EDIT_SLOT_STATUS_DETAILS,
  Slot: Slot,
  callback: callback,
});

export const editSlotStatusDetailsBegin = () => ({
  type: EDIT_SLOT_STATUS_DETAILS_BEGIN,
});

export const editSlotStatusDetailsSuccess = () => ({
  type: EDIT_SLOT_STATUS_DETAILS_SUCCESS,
});

export const editSlotStatusDetailsFail = (error) => ({
  type: EDIT_SLOT_STATUS_DETAILS_FAIL,
  payload: error,
});

//clinic dashboard

export const getClinicDashboardDetails = () => ({
  type: GET_CLINIC_DASHBOARD_DETAILS,
});

export const getSlotPriceDetails = () => ({
  type: GET_SLOT_PRICE_DETAILS,
});

export const getSlotPriceDetailsBegin = () => ({
  type: GET_SLOT_PRICE_DETAILS_BEGIN,
});

export const getSlotPriceDetailsSuccess = (price) => ({
  type: GET_SLOT_PRICE_DETAILS_SUCCESS,
  payload: price,
});

export const getSlotPriceDetailsFail = (error) => ({
  type: GET_SLOT_PRICE_DETAILS_FAIL,
  payload: error,
});

// Dashboard

export const getClinicDashboardDetailsBegin = () => ({
  type: GET_CLINIC_DASHBOARD_DETAILS_BEGIN,
});

export const getClinicDashboardDetailsSuccess = (user) => ({
  type: GET_CLINIC_DASHBOARD_DETAILS_SUCCESS,
  payload: user,
});

export const getClinicDashboardDetailsFail = (error) => ({
  type: GET_CLINIC_DASHBOARD_DETAILS_FAIL,
  payload: error,
});

export const getClinicAppointmentDetails = ({ data }) => ({
  type: GET_CLINIC_APPOINTMENT_DETAILS,
  data: data,
});

export const getClinicAppointmentDetailsBegin = () => ({
  type: GET_CLINIC_APPOINTMENT_DETAILS_BEGIN,
});

export const getClinicAppointmentDetailsSuccess = (user) => ({
  type: GET_CLINIC_APPOINTMENT_DETAILS_SUCCESS,
  payload: user,
});

export const getClinicAppointmentDetailsFail = (error) => ({
  type: GET_CLINIC_APPOINTMENT_DETAILS_FAIL,
  payload: error,
});

export const changeAppointmentStatus = ({ data, callback }) => ({
  type: CHANGE_APPOINTMENT_STATUS,
  data: data,
  callback: callback,
});

export const changeAppointmentStatusBegin = () => ({
  type: CHANGE_APPOINTMENT_STATUS_BEGIN,
});

export const changeAppointmentStatusSuccess = () => ({
  type: CHANGE_APPOINTMENT_STATUS_SUCCESS,
});

export const changeAppointmentStatusFail = (error) => ({
  type: CHANGE_APPOINTMENT_STATUS_FAIL,
  payload: error,
});

export const clinicAppointmentReschedule = ({ data, callback }) => ({
  type: CLINIC_APPOINTMENT_RESCHEDULE,
  data: data,
  callback: callback,
});

export const clinicAppointmentRescheduleBegin = () => ({
  type: CLINIC_APPOINTMENT_RESCHEDULE_BEGIN,
});

export const clinicAppointmentRescheduleSuccess = (response) => ({
  type: CLINIC_APPOINTMENT_RESCHEDULE_SUCCESS,
  payload: response,
});

export const clinicAppointmentRescheduleFail = (error) => ({
  type: CLINIC_APPOINTMENT_RESCHEDULE_FAIL,
  payload: error,
});

export const clinicBlockSlots = ({ data, callback }) => ({
  type: CLINIC_BLOCK_SLOTS,
  data: data,
  callback: callback,
});

export const clinicBlockSlotsBegin = () => ({
  type: CLINIC_BLOCK_SLOTS_BEGIN,
});

export const clinicBlockSlotsSuccess = (response) => ({
  type: CLINIC_BLOCK_SLOTS_SUCCESS,
  payload: response,
});

export const clinicBlockSlotsFail = (error) => ({
  type: CLINIC_BLOCK_SLOTS_FAIL,
  payload: error,
});

export const removeClinicSlotBlock = ({ data, callback }) => ({
  type: REMOVE_CLINIC_SLOT_BLOCK,
  data: data,
  callback: callback,
});

export const removeClinicSlotBlockBegin = () => ({
  type: REMOVE_CLINIC_SLOT_BLOCK_BEGIN,
});

export const removeClinicSlotBlockSuccess = () => ({
  type: REMOVE_CLINIC_SLOT_BLOCK_SUCCESS,
});

export const removeClinicSlotBlockFail = (error) => ({
  type: REMOVE_CLINIC_SLOT_BLOCK_FAIL,
  payload: error,
});

// Doctor

export const editDoctorDetails = ({ Doctor, callback }) => ({
  type: EDIT_DOCTOR_DETAILS,
  Doctor: Doctor,
  callback: callback,
});

export const editDoctorDetailsBegin = () => ({
  type: EDIT_DOCTOR_DETAILS_BEGIN,
});

export const editDoctorDetailsSuccess = () => ({
  type: EDIT_DOCTOR_DETAILS_SUCCESS,
});

export const editDoctorDetailsFail = (error) => ({
  type: EDIT_DOCTOR_DETAILS_FAIL,
  payload: error,
});

export const addDoctorDetails = ({ Doctor, callback }) => ({
  type: ADD_DOCTOR_DETAILS,
  Doctor: Doctor,
  callback: callback,
});

export const addDoctorDetailsBegin = () => ({
  type: ADD_DOCTOR_DETAILS_BEGIN,
});

export const addDoctorDetailsSuccess = () => ({
  type: ADD_DOCTOR_DETAILS_SUCCESS,
});

export const addDoctorDetailsFail = (error) => ({
  type: ADD_DOCTOR_DETAILS_FAIL,
  payload: error,
});

export const deleteDoctorDetails = ({ data, callback }) => ({
  type: DELETE_DOCTOR_DETAILS,
  data: data,
  callback: callback,
});

export const deleteDoctorDetailsBegin = () => ({
  type: DELETE_DOCTOR_DETAILS_BEGIN,
});

export const deleteDoctorDetailsSuccess = () => ({
  type: DELETE_DOCTOR_DETAILS_SUCCESS,
});

export const deleteDoctorDetailsFail = (error) => ({
  type: DELETE_DOCTOR_DETAILS_FAIL,
  payload: error,
});

export const getDoctorDetails = ({ request }) => ({
  type: GET_DOCTOR_DETAILS,
  request: request,
});

export const getDoctorDetailsBegin = () => ({
  type: GET_DOCTOR_DETAILS_BEGIN,
});

export const getDoctorDetailsSuccess = (Doctor) => ({
  type: GET_DOCTOR_DETAILS_SUCCESS,
  payload: Doctor,
});

export const getDoctorDetailsFail = (error) => ({
  type: GET_DOCTOR_DETAILS_FAIL,
  payload: error,
});

export const getDoctorById = ({ data }) => ({
  type: GET_DOCTOR_BY_ID,
  data: data,
});

export const getDoctorByIdBegin = () => ({
  type: GET_DOCTOR_BY_ID_BEGIN,
});

export const getDoctorByIdSuccess = (Docotor) => ({
  type: GET_DOCTOR_BY_ID_SUCCESS,
  payload: Docotor,
});

export const getDoctorByIdFail = (error) => ({
  type: GET_DOCTOR_BY_ID_FAIL,
  payload: error,
});

// SERVICES

export const editServiceDetails = ({ Service, callback }) => ({
  type: EDIT_SERVICE_DETAILS,
  Service: Service,
  callback: callback,
});

export const editServiceDetailsBegin = () => ({
  type: EDIT_SERVICE_DETAILS_BEGIN,
});

export const editServiceDetailsSuccess = () => ({
  type: EDIT_SERVICE_DETAILS_SUCCESS,
});

export const editServiceDetailsFail = (error) => ({
  type: EDIT_SERVICE_DETAILS_FAIL,
  payload: error,
});

export const addServiceDetails = ({ Service, callback }) => ({
  type: ADD_SERVICE_DETAILS,
  Service: Service,
  callback: callback,
});

export const addServiceDetailsBegin = () => ({
  type: ADD_SERVICE_DETAILS_BEGIN,
});

export const addServiceDetailsSuccess = () => ({
  type: ADD_SERVICE_DETAILS_SUCCESS,
});

export const addServiceDetailsFail = (error) => ({
  type: ADD_SERVICE_DETAILS_FAIL,
  payload: error,
});

export const deleteServiceDetails = ({ data, callback }) => ({
  type: DELETE_SERVICE_DETAILS,
  data: data,
  callback: callback,
});

export const deleteServiceDetailsBegin = () => ({
  type: DELETE_SERVICE_DETAILS_BEGIN,
});

export const deleteServiceDetailsSuccess = () => ({
  type: DELETE_SERVICE_DETAILS_SUCCESS,
});

export const deleteServiceDetailsFail = (error) => ({
  type: DELETE_SERVICE_DETAILS_FAIL,
  payload: error,
});

export const getServiceDetails = ({ request }) => ({
  type: GET_SERVICE_DETAILS,
  request: request,
});

export const getServiceDetailsBegin = () => ({
  type: GET_SERVICE_DETAILS_BEGIN,
});

export const getServiceDetailsSuccess = (Service) => ({
  type: GET_SERVICE_DETAILS_SUCCESS,
  payload: Service,
});

export const getServiceDetailsFail = (error) => ({
  type: GET_SERVICE_DETAILS_FAIL,
  payload: error,
});

export const getServiceById = ({ data }) => ({
  type: GET_SERVICE_BY_ID,
  data: data,
});

export const getServiceByIdBegin = () => ({
  type: GET_SERVICE_BY_ID_BEGIN,
});

export const getServiceByIdSuccess = (Service) => ({
  type: GET_SERVICE_BY_ID_SUCCESS,
  payload: Service,
});

export const getServiceByIdFail = (error) => ({
  type: GET_SERVICE_BY_ID_FAIL,
  payload: error,
});

export const publishDoctor = ({ data, callback }) => ({
  type: PUBLISH_DOCTOR,
  data: data,
  callback: callback,
});

export const publishDoctorBegin = () => ({
  type: PUBLISH_DOCTOR_BEGIN,
});

export const publishDoctorSuccess = (Service) => ({
  type: PUBLISH_DOCTOR_SUCCESS,
  payload: Service,
});

export const publishDoctorFail = (error) => ({
  type: PUBLISH_DOCTOR_FAIL,
  payload: error,
});
