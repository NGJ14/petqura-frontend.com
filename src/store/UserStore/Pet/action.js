import {
  ADD_PET_DETAILS,
  ADD_PET_DETAILS_BEGIN,
  ADD_PET_DETAILS_FAIL,
  ADD_PET_DETAILS_SUCCESS,
  DELETE_PET_DETAILS,
  DELETE_PET_DETAILS_BEGIN,
  DELETE_PET_DETAILS_FAIL,
  DELETE_PET_DETAILS_SUCCESS,
  EDIT_PET_DETAILS,
  EDIT_PET_DETAILS_BEGIN,
  EDIT_PET_DETAILS_FAIL,
  EDIT_PET_DETAILS_SUCCESS,
  GET_PET_BY_ID,
  GET_PET_BY_ID_BEGIN,
  GET_PET_BY_ID_FAIL,
  GET_PET_BY_ID_SUCCESS,
  GET_PET_DETAILS,
  GET_PET_DETAILS_BEGIN,
  GET_PET_DETAILS_FAIL,
  GET_PET_DETAILS_SUCCESS,
} from "./actionType";

export const editPetDetails = ({ user, petImage, callback }) => ({
  type: EDIT_PET_DETAILS,
  user: user,
  callback: callback,
  petImage: petImage,
});

export const editPetDetailsBegin = () => ({
  type: EDIT_PET_DETAILS_BEGIN,
});

export const editPetDetailsSuccess = () => ({
  type: EDIT_PET_DETAILS_SUCCESS,
});

export const editPetDetailsFail = (error) => ({
  type: EDIT_PET_DETAILS_FAIL,
  payload: error,
});

export const addPetDetails = ({ pet, petImage, callback }) => ({
  type: ADD_PET_DETAILS,
  pet: pet,
  callback: callback,
  petImage: petImage,
});

export const addPetDetailsBegin = () => ({
  type: ADD_PET_DETAILS_BEGIN,
});

export const addPetDetailsSuccess = () => ({
  type: ADD_PET_DETAILS_SUCCESS,
});

export const addPetDetailsFail = (error) => ({
  type: ADD_PET_DETAILS_FAIL,
  payload: error,
});

export const deletePetDetails = ({ user }) => ({
  type: DELETE_PET_DETAILS,
  user: user,
});

export const deletePetDetailsBegin = () => ({
  type: DELETE_PET_DETAILS_BEGIN,
});

export const deletePetDetailsSuccess = () => ({
  type: DELETE_PET_DETAILS_SUCCESS,
});

export const deletePetDetailsFail = (error) => ({
  type: DELETE_PET_DETAILS_FAIL,
  payload: error,
});

export const getPetDetails = () => ({
  type: GET_PET_DETAILS,
});

export const getPetDetailsBegin = () => ({
  type: GET_PET_DETAILS_BEGIN,
});

export const getPetDetailsSuccess = (pet) => ({
  type: GET_PET_DETAILS_SUCCESS,
  payload: pet,
});

export const getPetDetailsFail = (error) => ({
  type: GET_PET_DETAILS_FAIL,
  payload: error,
});

export const getPetById = ({ data }) => ({
  type: GET_PET_BY_ID,
  data: data,
});

export const getPetByIdBegin = () => ({
  type: GET_PET_BY_ID_BEGIN,
});

export const getPetByIdSuccess = (pet) => ({
  type: GET_PET_BY_ID_SUCCESS,
  payload: pet,
});

export const getPetByIdFail = (error) => ({
  type: GET_PET_BY_ID_FAIL,
  payload: error,
});
