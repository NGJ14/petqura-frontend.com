import {
  ADD_FEATURES_DETAILS,
  ADD_FEATURES_DETAILS_BEGIN,
  ADD_FEATURES_DETAILS_FAIL,
  ADD_FEATURES_DETAILS_SUCCESS,
  ADD_PRODUCT_DETAILS,
  ADD_PRODUCT_DETAILS_BEGIN,
  ADD_PRODUCT_DETAILS_FAIL,
  ADD_PRODUCT_DETAILS_SUCCESS,
  ADD_PRODUCT_IMAGE,
  ADD_PRODUCT_IMAGE_BEGIN,
  ADD_PRODUCT_IMAGE_FAIL,
  ADD_PRODUCT_IMAGE_SUCCESS,
  ADD_VARIANT_DETAILS,
  ADD_VARIANT_DETAILS_BEGIN,
  ADD_VARIANT_DETAILS_FAIL,
  ADD_VARIANT_DETAILS_SUCCESS,
  BULK_PRODUCT_UPLOAD,
  BULK_PRODUCT_UPLOAD_BEGIN,
  BULK_PRODUCT_UPLOAD_FAIL,
  BULK_PRODUCT_UPLOAD_SUCCESS,
  DELETE_PRODUCT_DETAILS,
  DELETE_PRODUCT_DETAILS_BEGIN,
  DELETE_PRODUCT_DETAILS_FAIL,
  DELETE_PRODUCT_DETAILS_SUCCESS,
  DELETE_VARIANT_DETAILS,
  DELETE_VARIANT_DETAILS_BEGIN,
  DELETE_VARIANT_DETAILS_FAIL,
  DELETE_VARIANT_DETAILS_SUCCESS,
  EDIT_FEATURES_DETAILS,
  EDIT_FEATURES_DETAILS_BEGIN,
  EDIT_FEATURES_DETAILS_FAIL,
  EDIT_FEATURES_DETAILS_SUCCESS,
  EDIT_PRODUCT_DETAILS,
  EDIT_PRODUCT_DETAILS_BEGIN,
  EDIT_PRODUCT_DETAILS_FAIL,
  EDIT_PRODUCT_DETAILS_SUCCESS,
  EDIT_VARIANT_DETAILS,
  EDIT_VARIANT_DETAILS_BEGIN,
  EDIT_VARIANT_DETAILS_FAIL,
  EDIT_VARIANT_DETAILS_SUCCESS,
  GET_FEATURES_BY_ID,
  GET_FEATURES_BY_ID_BEGIN,
  GET_FEATURES_BY_ID_FAIL,
  GET_FEATURES_BY_ID_SUCCESS,
  GET_FEATURES_DETAILS,
  GET_FEATURES_DETAILS_BEGIN,
  GET_FEATURES_DETAILS_FAIL,
  GET_FEATURES_DETAILS_SUCCESS,
  GET_GST_DETAILS,
  GET_GST_DETAILS_BEGIN,
  GET_GST_DETAILS_FAIL,
  GET_GST_DETAILS_SUCCESS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_BEGIN,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_CATEGORY_DETAILS,
  GET_PRODUCT_CATEGORY_DETAILS_BEGIN,
  GET_PRODUCT_CATEGORY_DETAILS_FAIL,
  GET_PRODUCT_CATEGORY_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_BEGIN,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_FEATURE_SUGGESTION,
  GET_PRODUCT_FEATURE_SUGGESTION_BEGIN,
  GET_PRODUCT_FEATURE_SUGGESTION_FAIL,
  GET_PRODUCT_FEATURE_SUGGESTION_SUCCESS,
  GET_PRODUCT_SUGGESTION,
  GET_PRODUCT_SUGGESTION_BEGIN,
  GET_PRODUCT_SUGGESTION_FAIL,
  GET_PRODUCT_SUGGESTION_SUCCESS,
  GET_VARIANT_BY_ID,
  GET_VARIANT_BY_ID_BEGIN,
  GET_VARIANT_BY_ID_FAIL,
  GET_VARIANT_BY_ID_SUCCESS,
  GET_VARIANT_DETAILS,
  GET_VARIANT_DETAILS_BEGIN,
  GET_VARIANT_DETAILS_FAIL,
  GET_VARIANT_DETAILS_SUCCESS,
} from "./actionType";

export const editProductDetails = ({ product, callback }) => ({
  type: EDIT_PRODUCT_DETAILS,
  product: product,
  callback: callback,
});

export const editProductDetailsBegin = () => ({
  type: EDIT_PRODUCT_DETAILS_BEGIN,
});

export const editProductDetailsSuccess = () => ({
  type: EDIT_PRODUCT_DETAILS_SUCCESS,
});

export const editProductDetailsFail = (error) => ({
  type: EDIT_PRODUCT_DETAILS_FAIL,
  payload: error,
});

export const addProductDetails = ({ product, history }) => ({
  type: ADD_PRODUCT_DETAILS,
  product: product,
  history: history,
});

export const addProductDetailsBegin = () => ({
  type: ADD_PRODUCT_DETAILS_BEGIN,
});

export const addProductDetailsSuccess = () => ({
  type: ADD_PRODUCT_DETAILS_SUCCESS,
});

export const addProductDetailsFail = (error) => ({
  type: ADD_PRODUCT_DETAILS_FAIL,
  payload: error,
});

export const deleteProductDetails = ({ data, callback }) => ({
  type: DELETE_PRODUCT_DETAILS,
  data: data,
  callback: callback,
});

export const deleteProductDetailsBegin = () => ({
  type: DELETE_PRODUCT_DETAILS_BEGIN,
});

export const deleteProductDetailsSuccess = () => ({
  type: DELETE_PRODUCT_DETAILS_SUCCESS,
});

export const deleteProductDetailsFail = (error) => ({
  type: DELETE_PRODUCT_DETAILS_FAIL,
  payload: error,
});

export const getProductDetails = (request) => ({
  type: GET_PRODUCT_DETAILS,
  request: request,
});

export const getProductDetailsBegin = () => ({
  type: GET_PRODUCT_DETAILS_BEGIN,
});

export const getProductDetailsSuccess = (pet) => ({
  type: GET_PRODUCT_DETAILS_SUCCESS,
  payload: pet,
});

export const getProductDetailsFail = (error) => ({
  type: GET_PRODUCT_DETAILS_FAIL,
  payload: error,
});

export const getProductById = ({ data }) => ({
  type: GET_PRODUCT_BY_ID,
  data: data,
});

export const getProductByIdBegin = () => ({
  type: GET_PRODUCT_BY_ID_BEGIN,
});

export const getProductByIdSuccess = (pet) => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  payload: pet,
});

export const getProductByIdFail = (error) => ({
  type: GET_PRODUCT_BY_ID_FAIL,
  payload: error,
});

export const getProductCategoryDetails = ({ data }) => ({
  type: GET_PRODUCT_CATEGORY_DETAILS,
  data: data,
});

export const getProductCategoryDetailsBegin = () => ({
  type: GET_PRODUCT_CATEGORY_DETAILS_BEGIN,
});

export const getProductCategoryDetailsSuccess = (product_category) => ({
  type: GET_PRODUCT_CATEGORY_DETAILS_SUCCESS,
  payload: product_category,
});

export const getProductCategoryDetailsFail = (error) => ({
  type: GET_PRODUCT_CATEGORY_DETAILS_FAIL,
  payload: error,
});

// VARIANT

export const editVariantDetails = ({
  variant,
  callback,
  image,
  id,
  edit,
  admin_product,
}) => ({
  type: EDIT_VARIANT_DETAILS,
  variant: variant,
  callback: callback,
  id: id,
  edit: edit,
  image: image,
  admin_product: admin_product,
});

export const editVariantDetailsBegin = () => ({
  type: EDIT_VARIANT_DETAILS_BEGIN,
});

export const editVariantDetailsSuccess = () => ({
  type: EDIT_VARIANT_DETAILS_SUCCESS,
});

export const editVariantDetailsFail = (error) => ({
  type: EDIT_VARIANT_DETAILS_FAIL,
  payload: error,
});

export const addVariantDetails = ({
  variant,
  callback,
  id,
  image,
  edit,
  admin_product,
}) => ({
  type: ADD_VARIANT_DETAILS,
  variant: variant,
  callback: callback,
  image: image,
  id: id,
  edit: edit,
  admin_product: admin_product,
});

export const addVariantDetailsBegin = () => ({
  type: ADD_VARIANT_DETAILS_BEGIN,
});

export const addVariantDetailsSuccess = () => ({
  type: ADD_VARIANT_DETAILS_SUCCESS,
});

export const addVariantDetailsFail = (error) => ({
  type: ADD_VARIANT_DETAILS_FAIL,
  payload: error,
});

export const deleteVariantDetails = ({ data, callback }) => ({
  type: DELETE_VARIANT_DETAILS,
  data: data,
  callback: callback,
});

export const deleteVariantDetailsBegin = () => ({
  type: DELETE_VARIANT_DETAILS_BEGIN,
});

export const deleteVariantDetailsSuccess = () => ({
  type: DELETE_VARIANT_DETAILS_SUCCESS,
});

export const deleteVariantDetailsFail = (error) => ({
  type: DELETE_VARIANT_DETAILS_FAIL,
  payload: error,
});

export const getVariantDetails = ({ id }) => ({
  type: GET_VARIANT_DETAILS,
  id: id,
});

export const getVariantDetailsBegin = () => ({
  type: GET_VARIANT_DETAILS_BEGIN,
});

export const getVariantDetailsSuccess = (variant) => ({
  type: GET_VARIANT_DETAILS_SUCCESS,
  payload: variant,
});

export const getVariantDetailsFail = (error) => ({
  type: GET_VARIANT_DETAILS_FAIL,
  payload: error,
});

export const getVariantById = ({ id }) => ({
  type: GET_VARIANT_BY_ID,
  id: id,
});

export const getVariantByIdBegin = () => ({
  type: GET_VARIANT_BY_ID_BEGIN,
});

export const getVariantByIdSuccess = (variant) => ({
  type: GET_VARIANT_BY_ID_SUCCESS,
  payload: variant,
});

export const getVariantByIdFail = (error) => ({
  type: GET_VARIANT_BY_ID_FAIL,
  payload: error,
});

//  Image

export const addProductImage = ({
  id,
  image,
  image1,
  image2,
  callback,
  count,
}) => ({
  type: ADD_PRODUCT_IMAGE,
  image: image,
  image1: image1,
  image2: image2,
  callback: callback,
  id: id,
  count: count,
});

export const addProductImageBegin = () => ({
  type: ADD_PRODUCT_IMAGE_BEGIN,
});

export const addProductImageSuccess = () => ({
  type: ADD_PRODUCT_IMAGE_SUCCESS,
});

export const addProductImageFail = (error) => ({
  type: ADD_PRODUCT_IMAGE_FAIL,
  payload: error,
});

// FEATURES

export const editFeaturesDetails = ({ features, callback }) => ({
  type: EDIT_FEATURES_DETAILS,
  features: features,
  callback: callback,
});

export const editFeaturesDetailsBegin = () => ({
  type: EDIT_FEATURES_DETAILS_BEGIN,
});

export const editFeaturesDetailsSuccess = () => ({
  type: EDIT_FEATURES_DETAILS_SUCCESS,
});

export const editFeaturesDetailsFail = (error) => ({
  type: EDIT_FEATURES_DETAILS_FAIL,
  payload: error,
});

export const addFeaturesDetails = ({ feature, callback }) => ({
  type: ADD_FEATURES_DETAILS,
  feature: feature,
  callback: callback,
});

export const addFeaturesDetailsBegin = () => ({
  type: ADD_FEATURES_DETAILS_BEGIN,
});

export const addFeaturesDetailsSuccess = () => ({
  type: ADD_FEATURES_DETAILS_SUCCESS,
});

export const addFeaturesDetailsFail = (error) => ({
  type: ADD_FEATURES_DETAILS_FAIL,
  payload: error,
});

export const getFeaturesDetails = ({ id }) => ({
  type: GET_FEATURES_DETAILS,
  id: id,
});

export const getFeaturesDetailsBegin = () => ({
  type: GET_FEATURES_DETAILS_BEGIN,
});

export const getFeaturesDetailsSuccess = (features) => ({
  type: GET_FEATURES_DETAILS_SUCCESS,
  payload: features,
});

export const getFeaturesDetailsFail = (error) => ({
  type: GET_FEATURES_DETAILS_FAIL,
  payload: error,
});

export const getFeaturesById = ({ id }) => ({
  type: GET_FEATURES_BY_ID,
  id: id,
});

export const getFeaturesByIdBegin = () => ({
  type: GET_FEATURES_BY_ID_BEGIN,
});

export const getFeaturesByIdSuccess = (features) => ({
  type: GET_FEATURES_BY_ID_SUCCESS,
  payload: features,
});

export const getFeaturesByIdFail = (error) => ({
  type: GET_FEATURES_BY_ID_FAIL,
  payload: error,
});

// GST

export const getGSTDetails = () => ({
  type: GET_GST_DETAILS,
});

export const getGSTDetailsBegin = () => ({
  type: GET_GST_DETAILS_BEGIN,
});

export const getGSTDetailsSuccess = (gst) => ({
  type: GET_GST_DETAILS_SUCCESS,
  payload: gst,
});

export const getGSTDetailsFail = (error) => ({
  type: GET_GST_DETAILS_FAIL,
  payload: error,
});

// VARIANT SUGGESTION

export const getProductSuggestion = ({ request }) => ({
  type: GET_PRODUCT_SUGGESTION,
  request: request,
});

export const getProductSuggestionBegin = () => ({
  type: GET_PRODUCT_SUGGESTION_BEGIN,
});

export const getProductSuggestionSuccess = (Product) => ({
  type: GET_PRODUCT_SUGGESTION_SUCCESS,
  payload: Product,
});

export const getProductSuggestionFail = (error) => ({
  type: GET_PRODUCT_SUGGESTION_FAIL,
  payload: error,
});

// Feature suggestion
export const getProductFeatureSuggestion = ({ request }) => ({
  type: GET_PRODUCT_FEATURE_SUGGESTION,
  request: request,
});
export const getProductFeatureSuggestionBegin = () => ({
  type: GET_PRODUCT_FEATURE_SUGGESTION_BEGIN,
});

export const getProductFeatureSuggestionSuccess = (Product) => ({
  type: GET_PRODUCT_FEATURE_SUGGESTION_SUCCESS,
  payload: Product,
});

export const getProductFeatureSuggestionFail = (error) => ({
  type: GET_PRODUCT_FEATURE_SUGGESTION_FAIL,
  payload: error,
});

// BULK UPLOAD

export const bulkProductUpload = ({ products, callback }) => ({
  type: BULK_PRODUCT_UPLOAD,
  products: products,
  callback: callback,
});

export const bulkProductUploadBegin = () => ({
  type: BULK_PRODUCT_UPLOAD_BEGIN,
});

export const bulkProductUploadSuccess = (message) => ({
  type: BULK_PRODUCT_UPLOAD_SUCCESS,
  payload: message,
});

export const bulkProductUploadFail = (error) => ({
  type: BULK_PRODUCT_UPLOAD_FAIL,
  payload: error,
});
