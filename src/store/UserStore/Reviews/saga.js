import { call, put, takeLatest } from "redux-saga/effects";
import { add, del, get, update } from "../../../helpers/api_helpers";
import {
  editReviewsBegin,
  editReviewsSuccess,
  editReviewsFail,
  deleteReviewsBegin,
  deleteReviewsSuccess,
  deleteReviewsFail,
  addReviewsBegin,
  addReviewsSuccess,
  addReviewsFail,
  getReviewsBegin,
  getReviewsSuccess,
  getReviewsFail,
  getReviewByIdFail,
  getReviewByIdSuccess,
  getReviewByIdBegin,
  getLoggedUserReviewsBegin,
  getLoggedUserReviewsSuccess,
  getLoggedUserReviewsFail,
} from "./action";
import {
  ADD_REVIEWS,
  DELETE_REVIEWS,
  EDIT_REVIEWS,
  GET_REVIEWS_BY_ID,
  GET_REVIEWS,
  GET_LOGGED_USER_REVIEWS,
} from "./actionType";

function* editReviews({ reviews, callback }) {
  try {
    yield put(editReviewsBegin());
    const response = yield call(update, "/product_review", reviews);
    if (response) {
      yield put(editReviewsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(editReviewsFail(error));
  }
}

function* addReviews({ reviews, callback }) {
  try {
    yield put(addReviewsBegin());
    const response = yield call(add, "/product_review", reviews);
    if (response) {
      yield put(addReviewsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(addReviewsFail(reviews));
  }
}

function* deleteReviews() {
  try {
    yield put(deleteReviewsBegin());
    const response = yield call(del, "/user_reviews");
    if (response) {
      yield put(deleteReviewsSuccess(response.result));
    }
  } catch (error) {
    yield put(deleteReviewsFail(error));
  }
}

function* getReviews({ data }) {
  try {
    yield put(getReviewsBegin());
    const response = yield call(get, "/view_product_review", data);
    if (response) {
      yield put(getReviewsSuccess(response.result));
    }
  } catch (error) {
    yield put(getReviewsFail(error));
  }
}

function* getLoggedUserReviews({ data }) {
  try {
    yield put(getLoggedUserReviewsBegin());
    const response = yield call(get, "/view_existing_product_review", data);
    if (response) {
      yield put(getLoggedUserReviewsSuccess(response.result));
    }
  } catch (error) {
    yield put(getLoggedUserReviewsFail(error));
  }
}

function* getReviewsById({ data }) {
  try {
    yield put(getReviewByIdBegin());
    const response = yield call(get, `/get_Review`, data);
    if (response) {
      yield put(getReviewByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getReviewByIdFail(error));
  }
}

function* ReviewsSaga() {
  yield takeLatest(EDIT_REVIEWS, editReviews);
  yield takeLatest(ADD_REVIEWS, addReviews);
  yield takeLatest(DELETE_REVIEWS, deleteReviews);
  yield takeLatest(GET_REVIEWS, getReviews);
  yield takeLatest(GET_LOGGED_USER_REVIEWS, getLoggedUserReviews);
  yield takeLatest(GET_REVIEWS_BY_ID, getReviewsById);
}

export default ReviewsSaga;
