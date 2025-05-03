import {
  GET_PAGE_BY_ID,
  GET_PAGE_BY_ID_BEGIN,
  GET_PAGE_BY_ID_FAIL,
  GET_PAGE_BY_ID_SUCCESS,
} from "./actionType";

export const getPAGEById = ({ data }) => ({
  type: GET_PAGE_BY_ID,
  data: data,
});

export const getPAGEByIdBegin = () => ({
  type: GET_PAGE_BY_ID_BEGIN,
});

export const getPAGEByIdSuccess = (PAGE) => ({
  type: GET_PAGE_BY_ID_SUCCESS,
  payload: PAGE,
});

export const getPAGEByIdFail = ({ error }) => ({
  type: GET_PAGE_BY_ID_FAIL,
  payload: error,
});
