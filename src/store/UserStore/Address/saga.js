import { call, put, takeLatest } from "redux-saga/effects";
import { add, del, get, update } from "../../../helpers/api_helpers";
import {
  editAddressDetailsBegin,
  editAddressDetailsSuccess,
  editAddressDetailsFail,
  deleteAddressDetailsBegin,
  deleteAddressDetailsSuccess,
  deleteAddressDetailsFail,
  getAddressByIdBegin,
  getAddressByIdSuccess,
  getAddressByIdFail,
  getBillingAddressByIdBegin,
  getBillingAddressByIdSuccess,
  getBillingAddressByIdFail,
  addAddressDetailsBegin,
  addAddressDetailsSuccess,
  addAddressDetailsFail,
  getAddressDetailsBegin,
  getAddressDetailsSuccess,
  getAddressDetailsFail,
  getBillingAddressDetailsBegin,
  getBillingAddressDetailsSuccess,
  getBillingAddressDetailsFail,
} from "./action";
import {
  ADD_ADDRESS_DETAILS,
  DELETE_ADDRESS_DETAILS,
  EDIT_ADDRESS_DETAILS,
  GET_ADDRESS_BY_ID,
  GET_BILLING_ADDRESS_BY_ID,
  GET_ADDRESS_DETAILS,
  GET_BILLING_ADDRESS_DETAILS,
} from "./actionType";

function* editAddressDetails({ address, callback }) {
  try {
    yield put(editAddressDetailsBegin());
    const response = yield call(update, "/user_address", address);
    if (response) {
      yield put(editAddressDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(editAddressDetailsFail(error));
  }
}

function* addAddressDetails({ address, callback }) {
  try {
    yield put(addAddressDetailsBegin());
    const response = yield call(add, "/user_address", address);
    if (response) {
      yield put(addAddressDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(addAddressDetailsFail(address));
  }
}

function* deleteAddressDetails({ address, callback }) {
  try {
    yield put(deleteAddressDetailsBegin());
    const response = yield call(del, "/user_address", address);
    if (response) {
      yield put(deleteAddressDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(deleteAddressDetailsFail(error));
  }
}

function* getAddressDetails({ data }) {
  try {
    yield put(getAddressDetailsBegin());
    const response = yield call(get, "/user_address", data);
    if (response) {
      yield put(
        getAddressDetailsSuccess(
          response?.result,
          response?.result[0]?.pin,
          response?.result[0]?.id
        )
      );
    }
  } catch (error) {
    yield put(getAddressDetailsFail(error));
  }
}

function* getBillingAddressDetails({ data }) {
  try {
    yield put(getBillingAddressDetailsBegin());
    const response = yield call(get, "/user_address", data);
    if (response) {
      yield put(
        getBillingAddressDetailsSuccess(
          response?.result,
          response?.result[0]?.pin,
          response?.result[0]?.id
        )
      );
    }
  } catch (error) {
    yield put(getBillingAddressDetailsFail(error));
  }
}

function* getAddressById({ data }) {
  try {
    yield put(getAddressByIdBegin());
    const response = yield call(get, `/get_address`, data);
    if (response) {
      yield put(getAddressByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getAddressByIdFail(error));
  }
}

function* getBillingAddressById({ data }) {
  try {
    yield put(getBillingAddressByIdBegin());
    const response = yield call(get, `/get_address`, data);
    if (response) {
      yield put(getBillingAddressByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getBillingAddressByIdFail(error));
  }
}

function* AddressSaga() {
  yield takeLatest(EDIT_ADDRESS_DETAILS, editAddressDetails);
  yield takeLatest(ADD_ADDRESS_DETAILS, addAddressDetails);
  yield takeLatest(DELETE_ADDRESS_DETAILS, deleteAddressDetails);
  yield takeLatest(GET_ADDRESS_DETAILS, getAddressDetails);
  yield takeLatest(GET_BILLING_ADDRESS_DETAILS, getBillingAddressDetails);
  yield takeLatest(GET_ADDRESS_BY_ID, getAddressById);
  yield takeLatest(GET_BILLING_ADDRESS_BY_ID, getBillingAddressById);
}

export default AddressSaga;
