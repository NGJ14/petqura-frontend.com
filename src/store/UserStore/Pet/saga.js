import { call, put, takeLatest } from "redux-saga/effects";
import { add, del, get, post, update } from "../../../helpers/api_helpers";
import {
  editPetDetailsBegin,
  editPetDetailsSuccess,
  editPetDetailsFail,
  deletePetDetailsBegin,
  deletePetDetailsSuccess,
  deletePetDetailsFail,
  getPetByIdBegin,
  getPetByIdSuccess,
  getPetByIdFail,
  addPetDetailsBegin,
  addPetDetailsSuccess,
  addPetDetailsFail,
  getPetDetailsBegin,
  getPetDetailsSuccess,
  getPetDetailsFail,
} from "./action";
import {
  ADD_PET_DETAILS,
  DELETE_PET_DETAILS,
  EDIT_PET_DETAILS,
  GET_PET_BY_ID,
  GET_PET_DETAILS,
} from "./actionType";

function* editPetDetails({ user, callback, petImage }) {
  try {
    yield put(editPetDetailsBegin());

    const response = yield call(update, "/user_pets", user);

    if (response) {
      yield call(post, "/upload_pet_image", petImage, {
        pet_id: response?.result?.pet_id,
      });
    }

    yield put(editPetDetailsSuccess(response.result));
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(editPetDetailsFail(error));
  }
}

function* addPetDetails({ pet, callback, petImage }) {
  try {
    yield put(addPetDetailsBegin());
    const response = yield call(add, "/user_pets", pet);
    if (response) {
      yield call(post, "/upload_pet_image", petImage, {
        pet_id: response?.result?.pet_id,
      });
    }
    yield put(addPetDetailsSuccess(response.result));
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(addPetDetailsFail(error));
  }
}

function* deletePetDetails({ user }) {
  try {
    yield put(deletePetDetailsBegin());
    const response = yield call(del, "/user_pets", user);
    if (response) {
      yield put(deletePetDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(deletePetDetailsFail(error));
  }
}

function* getPetDetails() {
  try {
    yield put(getPetDetailsBegin());
    const response = yield call(get, "/user_pets");
    if (response) {
      yield put(getPetDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getPetDetailsFail(error));
  }
}

function* getPetById({ data }) {
  try {
    yield put(getPetByIdBegin());
    const response = yield call(get, `/get_pet`, data);
    if (response) {
      yield put(getPetByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getPetByIdFail(error));
  }
}

function* PetSaga() {
  yield takeLatest(EDIT_PET_DETAILS, editPetDetails);
  yield takeLatest(ADD_PET_DETAILS, addPetDetails);
  yield takeLatest(DELETE_PET_DETAILS, deletePetDetails);
  yield takeLatest(GET_PET_DETAILS, getPetDetails);
  yield takeLatest(GET_PET_BY_ID, getPetById);
}

export default PetSaga;
