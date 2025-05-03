import {
  GET_USER_PRODUCT_BY_ID_BEGIN,
  GET_USER_PRODUCT_BY_ID_FAIL,
  GET_USER_PRODUCT_BY_ID_SUCCESS,
  GET_USER_PRODUCT_CATEGORY_DETAILS_BEGIN,
  GET_USER_PRODUCT_CATEGORY_DETAILS_FAIL,
  GET_USER_PRODUCT_CATEGORY_DETAILS_SUCCESS,
  GET_USER_PRODUCT_DETAILS_BEGIN,
  GET_USER_PRODUCT_DETAILS_FAIL,
  GET_USER_PRODUCT_DETAILS_SUCCESS,
  GET_USER_VARIANT_BY_ID_BEGIN,
  GET_USER_VARIANT_BY_ID_FAIL,
  GET_USER_VARIANT_BY_ID_SUCCESS,
  GET_USER_VARIANT_DETAILS_FAIL,
  GET_USER_VARIANT_DETAILS_SUCCESS,
  GET_USER_VARIANT_DETAILS_BEGIN,
  GET_PRODUCT_BRANDS_BEGIN,
  GET_PRODUCT_BRANDS_SUCCESS,
  GET_PRODUCT_BRANDS_FAIL,
  CHECK_PINCODE_BEGIN,
  CHECK_PINCODE_SUCCESS,
  CHECK_PINCODE_FAIL,
} from "./actionType";

const initial_state = {
  userProduct: {},
  loading: false,
  error: "",
  userProductDetails: {},
  variant: {},
  productCategories: {},
  variantDetails: {},
  firstVariant: "",
  productBrands: {},
  pincodeData: {},
};

const Shop = (state = initial_state, action) => {
  switch (action.type) {
    // USER PRODUCT BY ID
    case GET_USER_PRODUCT_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_USER_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userProductDetails: action.payload,
        firstVariant: action?.payload?.variants[0]?.product_variant_id,
        error: "",
      };
    case GET_USER_PRODUCT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        userProductDetails: "",
        error: action.payload,
        firstVariant: "",
      };

    // USER PRODUCTS

    case GET_USER_PRODUCT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_USER_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userProduct: action.payload,
        error: "",
      };
    case GET_USER_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        userProduct: "",
        error: action.payload,
      };

    //VARIANT

    case GET_USER_VARIANT_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_USER_VARIANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        variant: action.payload,
        error: "",
      };
    case GET_USER_VARIANT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        variant: "",
        error: action.payload,
      };

    case GET_USER_VARIANT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_USER_VARIANT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        variantDetails: action.payload,

        error: "",
      };
    case GET_USER_VARIANT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        variantDetails: "",
        error: action.payload,
      };

    // Category

    case GET_USER_PRODUCT_CATEGORY_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_USER_PRODUCT_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        productCategories: action.payload,
        error: "",
      };
    case GET_USER_PRODUCT_CATEGORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        productCategories: "",
        error: action.payload,
      };

    case GET_PRODUCT_BRANDS_BEGIN:
      return {
        ...state,
        loading: true,
        productBrands: {},
        error: "",
      };
    case GET_PRODUCT_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        productBrands: action.payload,
        error: "",
      };
    case GET_PRODUCT_BRANDS_FAIL:
      return {
        ...state,
        loading: false,
        productBrands: {},
        error: action.payload,
      };
    case CHECK_PINCODE_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CHECK_PINCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        pincodeData: action.payload,
        error: "",
      };
    case CHECK_PINCODE_FAIL:
      return {
        ...state,
        loading: false,
        pincodeData: {},
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Shop;
