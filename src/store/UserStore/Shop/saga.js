import { call, put, takeLatest } from "redux-saga/effects";
import { get, post } from "../../../helpers/api_helpers";
import {
  getUserProductByIdBegin,
  getUserProductByIdSuccess,
  getUserProductByIdFail,
  getUserProductDetailsBegin,
  getUserProductDetailsSuccess,
  getUserProductDetailsFail,
  getUserVariantDetailsBegin,
  getUserVariantDetailsSuccess,
  getUserVariantDetailsFail,
  getUserProductCategoryDetailsBegin,
  getUserProductCategoryDetailsSuccess,
  getUserProductCategoryDetailsFail,
  getUserVariantByIdBegin,
  getUserVariantByIdSuccess,
  getUserVariantByIdFail,
  getProductBrandsBegin,
  getProductBrandsSuccess,
  getProductBrandsFail,
  checkPincodeBegin,
  checkPincodeSuccess,
  checkPincodeFail,
} from "./action";
import {
  CHECK_PINCODE,
  GET_PRODUCT_BRANDS,
  GET_USER_PRODUCT_BY_ID,
  GET_USER_PRODUCT_CATEGORY_DETAILS,
  GET_USER_PRODUCT_DETAILS,
  GET_USER_VARIANT_BY_ID,
  GET_USER_VARIANT_DETAILS,
} from "./actionType";

// USER PRODUCT

function* getUserProductDetails({ request }) {
  try {
    yield put(getUserProductDetailsBegin());
    const response = yield call(get, "/get_products", request);
    if (response) {
      yield put(getUserProductDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getUserProductDetailsFail(error));
  }
}

// USER PRODUCT BY ID

function* getUserProductById({ data }) {
  try {
    yield put(getUserProductByIdBegin());
    const response = yield call(get, `/view_product`, data);
    if (response) {
      yield put(getUserProductByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getUserProductByIdFail(error));
  }
}

//UserVariant

function* getUserVariantDetails() {
  try {
    yield put(getUserVariantDetailsBegin());
    const response = yield call(get, "/partner/UserProduct_UserVariant");
    if (response) {
      yield put(getUserVariantDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getUserVariantDetailsFail(error));
  }
}

function* getUserVariantById({ data }) {
  try {
    yield put(getUserVariantByIdBegin());
    const response = yield call(get, "/view_product_variant", data);
    if (response) {
      yield put(getUserVariantByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getUserVariantByIdFail(error));
  }
}

// Category

function* getUserProductCategoryDetails({ data }) {
  try {
    yield put(getUserProductCategoryDetailsBegin());
    const response = yield call(get, "/get_product_categories", data);
    if (response) {
      yield put(getUserProductCategoryDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getUserProductCategoryDetailsFail(error));
  }
}

function* getProductBrands({ request }) {
  try {
    yield put(getProductBrandsBegin());
    const response = yield call(get, "/get_brand_names", request);
    if (response) {
      yield put(getProductBrandsSuccess(response.result));
    }
  } catch (error) {
    yield put(getProductBrandsFail(error));
  }
}

function* checkPincode({ pincode, callback }) {
  try {
    yield put(checkPincodeBegin());
    const response = yield call(post, "/check_pincode", pincode);
    if (response) {
      yield put(checkPincodeSuccess(response.result));
      if (
        response?.result?.message !=
        "Currently we are not available at your location"
      ) {
        callback && callback();
      }
    }
  } catch (error) {
    yield put(checkPincodeFail(error));
  }
}

function* ShopSaga() {
  yield takeLatest(GET_USER_PRODUCT_BY_ID, getUserProductById);
  yield takeLatest(GET_USER_PRODUCT_DETAILS, getUserProductDetails);
  yield takeLatest(
    GET_USER_PRODUCT_CATEGORY_DETAILS,
    getUserProductCategoryDetails
  );
  yield takeLatest(GET_USER_VARIANT_DETAILS, getUserVariantDetails);
  yield takeLatest(GET_USER_VARIANT_BY_ID, getUserVariantById);
  yield takeLatest(GET_PRODUCT_BRANDS, getProductBrands);
  yield takeLatest(CHECK_PINCODE, checkPincode);
}

export default ShopSaga;
