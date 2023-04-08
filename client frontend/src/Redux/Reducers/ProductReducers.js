import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SHOP_CREATE_REVIEW_FAIL,
  SHOP_CREATE_REVIEW_SUCCESS,
  SHOP_CREATE_REVIEW_RESET,
  SHOP_CREATE_REVIEW_REQUEST,
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  PRODUCT_RECOMMEND_FAIL,
  PRODUCT_RECOMMEND_REQUEST,
  PRODUCT_RECOMMEND_SUCCESS,
  PRODUCT_RECOMMEND_RESET,
} from "../Constants/ProductConstants";

// PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productRecommendReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_RECOMMEND_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_RECOMMEND_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_RECOMMEND_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_RECOMMEND_RESET:
        return { products: [] };
    default:
      return state;
  }
};


// SINGLE PRODUCT
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE SHOP
export const shopDetailsReducer = (
  state = { shop: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SHOP_DETAILS_SUCCESS:
      return { loading: false, shop: action.payload };
    case SHOP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// PRODUCT REVIEW CREATE
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// SHOP REVIEW CREATE
export const shopCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case SHOP_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case SHOP_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case SHOP_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
}
