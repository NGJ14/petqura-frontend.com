import {
  CHECK_PINCODE,
  CHECK_PINCODE_BEGIN,
  CHECK_PINCODE_FAIL,
  CHECK_PINCODE_SUCCESS,
  GET_PRODUCT_BRANDS,
  GET_PRODUCT_BRANDS_BEGIN,
  GET_PRODUCT_BRANDS_FAIL,
  GET_PRODUCT_BRANDS_SUCCESS,
  GET_USER_PRODUCT_BY_ID,
  GET_USER_PRODUCT_BY_ID_BEGIN,
  GET_USER_PRODUCT_BY_ID_FAIL,
  GET_USER_PRODUCT_BY_ID_SUCCESS,
  GET_USER_PRODUCT_CATEGORY_DETAILS,
  GET_USER_PRODUCT_CATEGORY_DETAILS_BEGIN,
  GET_USER_PRODUCT_CATEGORY_DETAILS_FAIL,
  GET_USER_PRODUCT_CATEGORY_DETAILS_SUCCESS,
  GET_USER_PRODUCT_DETAILS,
  GET_USER_PRODUCT_DETAILS_BEGIN,
  GET_USER_PRODUCT_DETAILS_FAIL,
  GET_USER_PRODUCT_DETAILS_SUCCESS,
  GET_USER_VARIANT_BY_ID,
  GET_USER_VARIANT_BY_ID_BEGIN,
  GET_USER_VARIANT_BY_ID_FAIL,
  GET_USER_VARIANT_BY_ID_SUCCESS,
  GET_USER_VARIANT_DETAILS,
  GET_USER_VARIANT_DETAILS_BEGIN,
  GET_USER_VARIANT_DETAILS_FAIL,
  GET_USER_VARIANT_DETAILS_SUCCESS,
} from "./actionType";

// USER_PRODUCT

export const getUserProductDetails = ({ request }) => ({
  type: GET_USER_PRODUCT_DETAILS,
  request: request,
});

export const getUserProductDetailsBegin = () => ({
  type: GET_USER_PRODUCT_DETAILS_BEGIN,
});

export const getUserProductDetailsSuccess = (pet) => ({
  type: GET_USER_PRODUCT_DETAILS_SUCCESS,
  payload: pet,
});

export const getUserProductDetailsFail = (error) => ({
  type: GET_USER_PRODUCT_DETAILS_FAIL,
  payload: error,
});

// USER_PRODUCT BY ID

export const getUserProductById = ({ data }) => ({
  type: GET_USER_PRODUCT_BY_ID,
  data: data,
});

export const getUserProductByIdBegin = () => ({
  type: GET_USER_PRODUCT_BY_ID_BEGIN,
});

export const getUserProductByIdSuccess = (product) => ({
  type: GET_USER_PRODUCT_BY_ID_SUCCESS,
  payload: product,
});

export const getUserProductByIdFail = (error) => ({
  type: GET_USER_PRODUCT_BY_ID_FAIL,
  payload: error,
});

// USER_VARIANT

export const getUserVariantById = ({ data }) => ({
  type: GET_USER_VARIANT_BY_ID,
  data: data,
});

export const getUserVariantByIdBegin = () => ({
  type: GET_USER_VARIANT_BY_ID_BEGIN,
});

export const getUserVariantByIdSuccess = (UserVariant) => ({
  type: GET_USER_VARIANT_BY_ID_SUCCESS,
  payload: UserVariant,
});

export const getUserVariantByIdFail = (error) => ({
  type: GET_USER_VARIANT_BY_ID_FAIL,
  payload: error,
});

export const getUserVariantDetails = () => ({
  type: GET_USER_VARIANT_DETAILS,
});

export const getUserVariantDetailsBegin = () => ({
  type: GET_USER_VARIANT_DETAILS_BEGIN,
});

export const getUserVariantDetailsSuccess = (UserVariant) => ({
  type: GET_USER_VARIANT_DETAILS_SUCCESS,
  payload: UserVariant,
});

export const getUserVariantDetailsFail = (error) => ({
  type: GET_USER_VARIANT_DETAILS_FAIL,
  payload: error,
});

// Category

export const getUserProductCategoryDetails = ({ data }) => ({
  type: GET_USER_PRODUCT_CATEGORY_DETAILS,
  data: data,
});

export const getUserProductCategoryDetailsBegin = () => ({
  type: GET_USER_PRODUCT_CATEGORY_DETAILS_BEGIN,
});

export const getUserProductCategoryDetailsSuccess = (product_category) => ({
  type: GET_USER_PRODUCT_CATEGORY_DETAILS_SUCCESS,
  payload: product_category,
});

export const getUserProductCategoryDetailsFail = (error) => ({
  type: GET_USER_PRODUCT_CATEGORY_DETAILS_FAIL,
  payload: error,
});

export const getProductBrands = ({ request }) => ({
  type: GET_PRODUCT_BRANDS,
  request: request,
});

export const getProductBrandsBegin = () => ({
  type: GET_PRODUCT_BRANDS_BEGIN,
});

export const getProductBrandsSuccess = (brand) => ({
  type: GET_PRODUCT_BRANDS_SUCCESS,
  payload: brand,
});

export const getProductBrandsFail = (error) => ({
  type: GET_PRODUCT_BRANDS_FAIL,
  payload: error,
});

// PINCODE

export const checkPincode = ({ data, callback }) => ({
  type: CHECK_PINCODE,
  pincode: data,
  callback: callback,
});

export const checkPincodeBegin = () => ({
  type: CHECK_PINCODE_BEGIN,
});

export const checkPincodeSuccess = (pincode) => ({
  type: CHECK_PINCODE_SUCCESS,
  payload: pincode,
});

export const checkPincodeFail = (error) => ({
  type: CHECK_PINCODE_FAIL,
  payload: error,
});
