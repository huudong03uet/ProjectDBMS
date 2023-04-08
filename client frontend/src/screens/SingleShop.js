import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createShopReview,
  listShopDetails,
} from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { SHOP_CREATE_REVIEW_SUCCESS } from "../Redux/Constants/ProductConstants";
import moment from "moment";

const SingleShop = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const shopId = match.params.id;
  const dispatch = useDispatch();

  const shopDetails = useSelector((state) => state.shopDetails);
  const { loading, error, shop } = shopDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const shopReviewCreate = useSelector((state) => state.shopReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = shopReviewCreate;

  useEffect(() => {
   
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: SHOP_CREATE_REVIEW_SUCCESS });
    }
    dispatch(listShopDetails(shopId));
  }, [dispatch, shopId, successCreateReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createShopReview(shopId, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHw%3D&w=1000&q=80'} alt={shop.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{shop.name}</div>
                  </div>
                  <p>{shop.description}</p>

                  <div className="product-count col-lg-7 ">
                  <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Shop: </h6>
                      <span>{shop.shop_name}</span>
                      
                      
                    </div>

                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Address: </h6>
                      <span>{shop.address}</span>
                    </div>
                    
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>City: </h6>
                      <span>{shop.city}</span>
                    </div>

                    
                  
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={shop.rating}
                        text={`${shop.numReviews} reviews`}
                      />
                    </div>
                    {shop.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantity</h6>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(shop.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                {shop.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>No Reviews</Message>
                )}
                {shop.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>WRITE A CUSTOMER REVIEW</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comment</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Please{" "}
                      <Link to="/login">
                        " <strong>Login</strong> "
                      </Link>{" "}
                      to write a review{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleShop;
