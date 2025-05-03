import {
  GET_PAGE_BY_ID_BEGIN,
  GET_PAGE_BY_ID_FAIL,
  GET_PAGE_BY_ID_SUCCESS,
} from "./actionType";

const initial_state = {
  PageContent: {},
  loading: false,
  error: "",
  PageContentDetails: {},
};

const PageContent = (state = initial_state, action) => {
  switch (action.type) {
    case GET_PAGE_BY_ID_BEGIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PAGE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        PageContentDetails: action.payload,
        error: "",
      };
    case GET_PAGE_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        PageContentDetails: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default PageContent;
