import axios from "axios";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_RECOMMEND_FAIL,
  PRODUCT_RECOMMEND_REQUEST,
  PRODUCT_RECOMMEND_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SHOP_CREATE_REVIEW_FAIL,
  SHOP_CREATE_REVIEW_REQUEST,
  SHOP_CREATE_REVIEW_SUCCESS,
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
} from "../Constants/ProductConstants";
import { logout } from "./userActions";
import {URL} from "../Url";
// PRODUCT LIST
export const listProduct =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `${URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const recommendProduct =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_RECOMMEND_REQUEST });
      const { data } = await axios.get(
        `${URL}/api/products/recommend/${keyword}`
      );
      dispatch({ type: PRODUCT_RECOMMEND_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_RECOMMEND_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };



  // PRODUCT LIST FULL when full search
export const listProductFull =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    try {
      console.log(keyword)
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `${URL}/api/products/full?name=${keyword.name}&price_min=${keyword.price_min}&price_max=${keyword.price_max}&brand=${keyword.brand}&shop=${keyword.shop}&color=${keyword.color}&gender=${keyword.gender}&order_by=${keyword.order_by}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${URL}/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// single shop
export const listShopDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST });
    const { data } = await axios.get(`${URL}/api/products/shops/${id}`);
    dispatch({ type: SHOP_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// PRODUCT REVIEW CREATE
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${URL}/api/products/${productId}/review`, review, config);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

// Shop create review
export const createShopReview =
  (shopId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: SHOP_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`${URL}/api/products/shops/${shopId}/review`, review, config);
      dispatch({ type: SHOP_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SHOP_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  }
  
