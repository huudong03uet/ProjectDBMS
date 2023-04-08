import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/homeComponents/Rating";
import { useDispatch, useSelector } from "react-redux";
import { recommendProduct } from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
const RecommendProducts = (props) => {
    const { keyword } = props;
  const dispatch = useDispatch();
  const productRecommend = useSelector((state) => state.productRecommend);
  const { loading, error, products } = productRecommend;
    

  useEffect(() => {
    dispatch(recommendProduct(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {products.map((product) => (
                      <div
                        className="shop col-lg-2 col-md-2 col-sm-2"
                        key={product._id}
                      >
                        <div className="border-product">
                          <Link to={`/products/${product._id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                            <h3>${product.price}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                
                {/* Pagination */}
                {/* <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendProducts;
