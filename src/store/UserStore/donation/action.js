import {
  ADD_DONATION_DETAILS,
  ADD_DONATION_DETAILS_BEGIN,
  ADD_DONATION_DETAILS_FAIL,
  ADD_DONATION_DETAILS_SUCCESS,
  ADD_DONATION_PAYMENT,
  ADD_DONATION_PAYMENT_BEGIN,
  ADD_DONATION_PAYMENT_FAIL,
  ADD_DONATION_PAYMENT_SUCCESS,
  VIEW_HANDS4PAWS_GALLERY,
  VIEW_HANDS4PAWS_GALLERY_BEGIN,
  VIEW_HANDS4PAWS_GALLERY_SUCCESS,
  VIEW_HANDS4PAWS_GALLERY_FAIL,
} from "./actionType";

export const addDonationPayment = (
  response,
  callback,
  closePaytm,
  history,
  scroll
) => ({
  type: ADD_DONATION_PAYMENT,
  payload: response,
  callback: callback,
  closePaytm: closePaytm,
  scroll: scroll,
  history: history,
});

export const addDonationPaymentBegin = () => ({
  type: ADD_DONATION_PAYMENT_BEGIN,
});

export const addDonationPaymentSuccess = () => ({
  type: ADD_DONATION_PAYMENT_SUCCESS,
});

export const addDonationPaymentFail = (error) => ({
  type: ADD_DONATION_PAYMENT_FAIL,
  payload: error,
});

export const addDonationDetails = ({ data, callback }) => ({
  type: ADD_DONATION_DETAILS,
  data: data,
  callback: callback,
});

export const addDonationDetailsBegin = () => ({
  type: ADD_DONATION_DETAILS_BEGIN,
});

export const addDonationDetailsSuccess = (res) => ({
  type: ADD_DONATION_DETAILS_SUCCESS,
  payload: res,
});

export const addDonationDetailsFail = (error) => ({
  type: ADD_DONATION_DETAILS_FAIL,
  payload: error,
});

export const viewHANDS4PAWSGALERYDetails = ({ request }) => ({
  type: VIEW_HANDS4PAWS_GALLERY,
  request: request,
});

export const viewHANDS4PAWSGALERYDetailsBegin = () => ({
  type: VIEW_HANDS4PAWS_GALLERY_BEGIN,
});

export const viewHANDS4PAWSGALERYDetailsSuccess = (HANDS4PAWSGALERY) => ({
  type: VIEW_HANDS4PAWS_GALLERY_SUCCESS,
  payload: HANDS4PAWSGALERY,
});

export const viewHANDS4PAWSGALERYDetailsFail = ({ error }) => ({
  type: VIEW_HANDS4PAWS_GALLERY_FAIL,
  payload: error,
});
