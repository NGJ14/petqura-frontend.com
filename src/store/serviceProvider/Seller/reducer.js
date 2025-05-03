import {
  ADD_FEATURES_DETAILS_BEGIN,
  ADD_FEATURES_DETAILS_FAIL,
  ADD_FEATURES_DETAILS_SUCCESS,
  ADD_PRODUCT_DETAILS_BEGIN,
  ADD_PRODUCT_DETAILS_FAIL,
  ADD_PRODUCT_DETAILS_SUCCESS,
  ADD_PRODUCT_IMAGE_BEGIN,
  ADD_PRODUCT_IMAGE_FAIL,
  ADD_PRODUCT_IMAGE_SUCCESS,
  ADD_VARIANT_DETAILS_BEGIN,
  ADD_VARIANT_DETAILS_FAIL,
  ADD_VARIANT_DETAILS_SUCCESS,
  BULK_PRODUCT_UPLOAD_BEGIN,
  BULK_PRODUCT_UPLOAD_FAIL,
  BULK_PRODUCT_UPLOAD_SUCCESS,
  DELETE_PRODUCT_DETAILS_BEGIN,
  DELETE_PRODUCT_DETAILS_FAIL,
  DELETE_PRODUCT_DETAILS_SUCCESS,
  DELETE_VARIANT_DETAILS_BEGIN,
  DELETE_VARIANT_DETAILS_FAIL,
  DELETE_VARIANT_DETAILS_SUCCESS,
  EDIT_FEATURES_DETAILS_BEGIN,
  EDIT_FEATURES_DETAILS_FAIL,
  EDIT_FEATURES_DETAILS_SUCCESS,
  EDIT_PRODUCT_DETAILS_BEGIN,
  EDIT_PRODUCT_DETAILS_FAIL,
  EDIT_PRODUCT_DETAILS_SUCCESS,
  EDIT_VARIANT_DETAILS_BEGIN,
  EDIT_VARIANT_DETAILS_FAIL,
  EDIT_VARIANT_DETAILS_SUCCESS,
  GET_FEATURES_BY_ID_BEGIN,
  GET_FEATURES_BY_ID_FAIL,
  GET_FEATURES_BY_ID_SUCCESS,
  GET_FEATURES_DETAILS_BEGIN,
  GET_FEATURES_DETAILS_FAIL,
  GET_FEATURES_DETAILS_SUCCESS,
  GET_GST_DETAILS_BEGIN,
  GET_GST_DETAILS_FAIL,
  GET_GST_DETAILS_SUCCESS,
  GET_PRODUCT_BY_ID_BEGIN,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_CATEGORY_DETAILS_BEGIN,
  GET_PRODUCT_CATEGORY_DETAILS_FAIL,
  GET_PRODUCT_CATEGORY_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_BEGIN,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_FEATURE_SUGGESTION_BEGIN,
  GET_PRODUCT_FEATURE_SUGGESTION_FAIL,
  GET_PRODUCT_FEATURE_SUGGESTION_SUCCESS,
  GET_PRODUCT_SUGGESTION_BEGIN,
  GET_PRODUCT_SUGGESTION_FAIL,
  GET_PRODUCT_SUGGESTION_SUCCESS,
  GET_VARIANT_BY_ID_BEGIN,
  GET_VARIANT_BY_ID_FAIL,
  GET_VARIANT_BY_ID_SUCCESS,
  GET_VARIANT_DETAILS_BEGIN,
  GET_VARIANT_DETAILS_FAIL,
  GET_VARIANT_DETAILS_SUCCESS,
} from "./actionType";

const initial_state = {
  product: {},
  loading: false,
  error: "",
  productDetails: {},
  productCategories: {},
  first_category: "",
  variant: {},
  variantDetails: {},
  first_variant: "",
  feature: {},
  featureDetails: {},
  gst: {},
  gst_first_category: "",
  admin_product: {},
  admin_product_feature: {},
  suggestion_loading: false,
  success: "",
};

const Product = (state = initial_state, action) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORY_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PRODUCT_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        productCategories: action.payload,
        error: "",
        first_category: action.payload?.categories[0]?.id,
      };
    case GET_PRODUCT_CATEGORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        productCategories: "",
        error: action.payload,
      };

    case GET_PRODUCT_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.payload,
        error: "",
      };
    case GET_PRODUCT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        productDetails: "",
        error: action.payload,
      };

    case GET_PRODUCT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: "",
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        product: "",
        error: action.payload,
      };

    case EDIT_PRODUCT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PRODUCT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        productDetails: action.payload,
      };
    case ADD_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Image

    case ADD_PRODUCT_IMAGE_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_PRODUCT_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_PRODUCT_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //VARIANT

    case GET_VARIANT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_VARIANT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        variant: action.payload,
        first_variant: action.payload?.variants[0]?.product_variant_id,
        variantDetails: action.payload?.variants[0],

        error: "",
      };
    case GET_VARIANT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        variant: "",
        error: action.payload,
      };

    case GET_VARIANT_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_VARIANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        variantDetails: action.payload,
        error: "",
      };
    case GET_VARIANT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        variant: "",
        variantDetails: "",
        error: action.payload,
      };

    case EDIT_VARIANT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_VARIANT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_VARIANT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_VARIANT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_VARIANT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_VARIANT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_VARIANT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_VARIANT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_VARIANT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Feature

    case GET_FEATURES_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_FEATURES_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        feature: action.payload,
        error: "",
      };
    case GET_FEATURES_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        feature: "",
        error: action.payload,
      };

    case GET_FEATURES_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_FEATURES_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        featureDetails: action.payload,
        error: "",
      };
    case GET_FEATURES_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        feature: "",
        featureDetails: "",
        error: action.payload,
      };

    case EDIT_FEATURES_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EDIT_FEATURES_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case EDIT_FEATURES_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_FEATURES_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_FEATURES_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ADD_FEATURES_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_GST_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_GST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        gst: action.payload,
        error: "",
        gst_first_category: action.payload?.gst_class[0].gst_id,
      };
    case GET_GST_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        gst: "",
        error: action.payload,
        gst_first_category: "",
      };
    case GET_PRODUCT_SUGGESTION_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PRODUCT_SUGGESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        admin_product: action.payload,
        error: "",
      };
    case GET_PRODUCT_SUGGESTION_FAIL:
      return {
        ...state,
        loading: false,
        admin_product: "",
        error: action.payload,
      };
    case GET_PRODUCT_FEATURE_SUGGESTION_BEGIN:
      return {
        ...state,
        suggestion_loading: true,
        error: "",
      };
    case GET_PRODUCT_FEATURE_SUGGESTION_SUCCESS:
      return {
        ...state,
        suggestion_loading: false,
        admin_product_feature: action.payload,
        error: "",
      };
    case GET_PRODUCT_FEATURE_SUGGESTION_FAIL:
      return {
        ...state,
        suggestion_loading: false,
        admin_product_feature: "",
        error: action.payload,
      };

    // BULk UPLOAD
    case BULK_PRODUCT_UPLOAD_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case BULK_PRODUCT_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: action.payload,
      };
    case BULK_PRODUCT_UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Product;
