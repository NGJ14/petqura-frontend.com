import { call, put, takeLatest } from "redux-saga/effects";
import { add, del, get, post, update } from "../../../helpers/api_helpers";
import {
  editProductDetailsBegin,
  editProductDetailsSuccess,
  editProductDetailsFail,
  deleteProductDetailsBegin,
  deleteProductDetailsSuccess,
  deleteProductDetailsFail,
  getProductByIdBegin,
  getProductByIdSuccess,
  getProductByIdFail,
  addProductDetailsBegin,
  addProductDetailsSuccess,
  addProductDetailsFail,
  getProductDetailsBegin,
  getProductDetailsSuccess,
  getProductDetailsFail,
  getProductCategoryDetailsBegin,
  getProductCategoryDetailsSuccess,
  getProductCategoryDetailsFail,
  getVariantDetailsBegin,
  getVariantDetailsSuccess,
  getVariantDetailsFail,
  addVariantDetailsBegin,
  addVariantDetailsSuccess,
  addVariantDetailsFail,
  editVariantDetailsBegin,
  editVariantDetailsSuccess,
  editVariantDetailsFail,
  deleteVariantDetailsBegin,
  deleteVariantDetailsSuccess,
  deleteVariantDetailsFail,
  addProductImageBegin,
  addProductImageSuccess,
  addProductImageFail,
  getVariantByIdBegin,
  getVariantByIdSuccess,
  getVariantByIdFail,
  editFeaturesDetailsBegin,
  editFeaturesDetailsSuccess,
  addFeaturesDetailsBegin,
  addFeaturesDetailsSuccess,
  addFeaturesDetailsFail,
  getFeaturesDetailsBegin,
  getFeaturesDetailsSuccess,
  getFeaturesDetailsFail,
  getFeaturesByIdBegin,
  getFeaturesByIdSuccess,
  getFeaturesByIdFail,
  editFeaturesDetailsFail,
  getGSTDetailsBegin,
  getGSTDetailsSuccess,
  getGSTDetailsFail,
  getProductSuggestionBegin,
  getProductSuggestionSuccess,
  getProductSuggestionFail,
  getProductFeatureSuggestionBegin,
  getProductFeatureSuggestionSuccess,
  getProductFeatureSuggestionFail,
  bulkProductUploadSuccess,
  bulkProductUploadFail,
  bulkProductUploadBegin,
} from "./action";
import {
  ADD_PRODUCT_DETAILS,
  DELETE_PRODUCT_DETAILS,
  EDIT_PRODUCT_DETAILS,
  EDIT_VARIANT_DETAILS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_CATEGORY_DETAILS,
  GET_PRODUCT_DETAILS,
  ADD_VARIANT_DETAILS,
  DELETE_VARIANT_DETAILS,
  GET_VARIANT_DETAILS,
  ADD_PRODUCT_IMAGE,
  GET_VARIANT_BY_ID,
  EDIT_FEATURES_DETAILS,
  ADD_FEATURES_DETAILS,
  GET_FEATURES_DETAILS,
  GET_FEATURES_BY_ID,
  GET_GST_DETAILS,
  GET_PRODUCT_SUGGESTION,
  GET_PRODUCT_FEATURE_SUGGESTION,
  BULK_PRODUCT_UPLOAD,
} from "./actionType";

function* editProductDetails({ product, callback }) {
  try {
    yield put(editProductDetailsBegin());
    const response = yield call(update, "/partner/change_product", product);
    if (response) {
      yield put(editProductDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(editProductDetailsFail(error));
  }
}

function* addProductDetails({ product, history }) {
  try {
    yield put(addProductDetailsBegin());
    const response = yield call(add, "/partner/product", product);
    if (response) {
      yield put(addProductDetailsSuccess(response.result));
      const location = {
        pathname: `/carer/seller/product-addFeatures/${response.result?.product_id}`,
        state: { fromAddProduct: true },
      };
      history && history.push(location);
    }
  } catch (error) {
    console.log(error);
    yield put(addProductDetailsFail(error));
  }
}
// IMAGE

function* addProductImage({ image, id, callback, count }) {
  try {
    yield put(addProductImageBegin());

    yield call(post, "/partner/add_product_image", image, {
      pid: id,
      count: count,
    });

    yield put(addProductImageSuccess());
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(addProductImageFail(error));
  }
}

function* deleteProductDetails({ data, callback }) {
  try {
    yield put(deleteProductDetailsBegin());
    const response = yield call(del, `/partner/change_product`, data);
    if (response) {
      yield put(deleteProductDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(deleteProductDetailsFail(error));
  }
}

function* getProductDetails(res) {
  try {
    yield put(getProductDetailsBegin());
    const response = yield call(get, "/partner/product", res?.request);
    if (response) {
      yield put(getProductDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getProductDetailsFail(error));
  }
}

function* getProductCategoryDetails({ data }) {
  try {
    yield put(getProductCategoryDetailsBegin());
    const response = yield call(get, "/partner/list_product_categories", data);
    if (response) {
      yield put(getProductCategoryDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getProductCategoryDetailsFail(error));
  }
}

function* getProductById({ data }) {
  try {
    console.log(data);
    yield put(getProductByIdBegin());
    const response = yield call(get, `/partner/product_details`, data);
    if (response) {
      yield put(getProductByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getProductByIdFail(error));
  }
}

//VARIANT

function* editVariantDetails({
  variant,
  callback,
  id,
  edit,
  image,
  admin_product,
}) {
  try {
    yield put(editVariantDetailsBegin());
    const response = yield call(
      update,
      "/partner/change_product_variant",
      variant
    );
    if (edit?.length > 0) {
      yield call(post, "/partner/add_product_image", image, {
        pid: id,
        edit: edit,
        admin_image: admin_product,
      });
    }
    yield put(editVariantDetailsSuccess(response.result));
    callback && callback();
  } catch (error) {
    console.log(error);
    yield put(editVariantDetailsFail(error));
  }
}

function* addVariantDetails({ variant, callback, image, edit, admin_product }) {
  try {
    yield put(addVariantDetailsBegin());
    const response = yield call(add, "/partner/product_variant", variant);
    if (response) {
      yield call(post, "/partner/add_product_image", image, {
        pid: response?.result?.product_variant_id,
        edit: edit,
        admin_image: admin_product,
      });
      yield put(addVariantDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    console.log(error);
    yield put(addVariantDetailsFail(error));
  }
}

function* deleteVariantDetails({ data, callback }) {
  try {
    yield put(deleteVariantDetailsBegin());
    const response = yield call(del, `/partner/change_product_variant`, {
      pvid: data?.pid,
    });
    if (response) {
      yield put(deleteVariantDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(deleteVariantDetailsFail(error));
  }
}

function* getVariantDetails({ id }) {
  try {
    yield put(getVariantDetailsBegin());
    const response = yield call(get, "/partner/product_variant", { pid: id });
    if (response) {
      yield put(getVariantDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getVariantDetailsFail(error));
  }
}

function* getVariantById({ id }) {
  try {
    yield put(getVariantByIdBegin());
    const response = yield call(get, "/partner/product_variant_details", {
      pvid: id,
    });
    if (response) {
      yield put(getVariantByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getVariantByIdFail(error));
  }
}

// Features

function* editFeaturesDetails({ features, callback }) {
  try {
    yield put(editFeaturesDetailsBegin());
    const response = yield call(post, "/partner/product_info", features);
    if (response) {
      yield put(editFeaturesDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(editFeaturesDetailsFail(error));
  }
}

function* addFeaturesDetails({ feature, callback }) {
  try {
    yield put(addFeaturesDetailsBegin());
    const response = yield call(add, "/partner/product_info", feature);
    if (response) {
      yield put(addFeaturesDetailsSuccess(response.result));
      callback && callback();
    }
  } catch (error) {
    yield put(addFeaturesDetailsFail(error));
  }
}

function* getFeaturesDetails({ id }) {
  try {
    yield put(getFeaturesDetailsBegin());
    const response = yield call(get, "/partner/product_info", { pid: id });
    if (response) {
      yield put(getFeaturesDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getFeaturesDetailsFail(error));
  }
}

function* getFeaturesById({ id }) {
  try {
    yield put(getFeaturesByIdBegin());
    const response = yield call(get, "/partner/clinic_service_details", {
      pvid: id,
    });
    if (response) {
      yield put(getFeaturesByIdSuccess(response.result));
    }
  } catch (error) {
    yield put(getFeaturesByIdFail(error));
  }
}

function* getGSTDetails() {
  try {
    yield put(getGSTDetailsBegin());
    const response = yield call(get, "/partner/gst_classes");

    if (response) {
      yield put(getGSTDetailsSuccess(response.result));
    }
  } catch (error) {
    yield put(getGSTDetailsFail(error));
  }
}

function* getProductSuggestion({ request }) {
  try {
    yield put(getProductSuggestionBegin());
    const response = yield call(
      get,
      "/partner/product_image_suggestions",
      request
    );
    if (response) {
      yield put(getProductSuggestionSuccess(response.result));
    }
  } catch (error) {
    yield put(getProductSuggestionFail(error));
  }
}

function* getProductFeatureSuggestion({ request }) {
  try {
    console.log(request);
    yield put(getProductFeatureSuggestionBegin());
    const response = yield call(get, "/partner/product_suggestions", request);
    if (response) {
      yield put(getProductFeatureSuggestionSuccess(response.result));
    }
  } catch (error) {
    yield put(getProductFeatureSuggestionFail(error));
  }
}

// BULK UPLOAD

function* bulkProductUpload({ callback, products }) {
  try {
    yield put(bulkProductUploadBegin());
    const response = yield call(post, "/partner/bulk_upload", products);
    yield put(bulkProductUploadSuccess(response.message));
    callback && callback();
  } catch (error) {
    yield put(bulkProductUploadFail(error));
  }
}

function* ProductSaga() {
  yield takeLatest(GET_PRODUCT_CATEGORY_DETAILS, getProductCategoryDetails);
  yield takeLatest(GET_PRODUCT_BY_ID, getProductById);

  yield takeLatest(EDIT_PRODUCT_DETAILS, editProductDetails);
  yield takeLatest(ADD_PRODUCT_DETAILS, addProductDetails);
  yield takeLatest(DELETE_PRODUCT_DETAILS, deleteProductDetails);
  yield takeLatest(GET_PRODUCT_DETAILS, getProductDetails);
  yield takeLatest(ADD_PRODUCT_IMAGE, addProductImage);

  yield takeLatest(EDIT_VARIANT_DETAILS, editVariantDetails);
  yield takeLatest(ADD_VARIANT_DETAILS, addVariantDetails);
  yield takeLatest(DELETE_VARIANT_DETAILS, deleteVariantDetails);
  yield takeLatest(GET_VARIANT_DETAILS, getVariantDetails);
  yield takeLatest(GET_VARIANT_BY_ID, getVariantById);

  yield takeLatest(EDIT_FEATURES_DETAILS, editFeaturesDetails);
  yield takeLatest(ADD_FEATURES_DETAILS, addFeaturesDetails);
  yield takeLatest(GET_FEATURES_DETAILS, getFeaturesDetails);
  yield takeLatest(GET_FEATURES_BY_ID, getFeaturesById);

  yield takeLatest(GET_GST_DETAILS, getGSTDetails);

  yield takeLatest(GET_PRODUCT_SUGGESTION, getProductSuggestion);
  yield takeLatest(GET_PRODUCT_FEATURE_SUGGESTION, getProductFeatureSuggestion);

  yield takeLatest(BULK_PRODUCT_UPLOAD, bulkProductUpload);
}

export default ProductSaga;
