import { call, put, takeLatest } from "redux-saga/effects";

import { get } from "../../../helpers/api_helpers";
import {
  getPAGEByIdBegin,
  getPAGEByIdSuccess,
  getPAGEByIdFail,
} from "./action";
import { GET_PAGE_BY_ID } from "./actionType";

function* getPAGEById({ data }) {
  try {
    yield put(getPAGEByIdBegin());
    const response = yield call(get, `/page_contents/${data?.id}`);
    if (response) {
      yield put(getPAGEByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getPAGEByIdFail(error));
  }
}

function* PAGESaga() {
  yield takeLatest(GET_PAGE_BY_ID, getPAGEById);
}

export default PAGESaga;
