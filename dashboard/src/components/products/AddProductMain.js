import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [Brand, setBrand] = useState("");
  const [Category_by_gender, setCategoryByGender] = useState("");
  const [shop_name, setShopName] = useState("");
  const [original_price, setOriginalPrice] = useState(0);
  const [Color, setColor] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
      setBrand("");
      setCategoryByGender("");
      setShopName("");
      setOriginalPrice(0);
      setColor("");
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, price, description, image, countInStock, Brand, Category_by_gender, shop_name, original_price, Color));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_shop_name" className="form-label">
                        Shop name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_shop_name"
                        required
                        value={shop_name}
                        onChange={(e) => setShopName(e.target.value)}
                      />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_original_price" className="form-label">
                      Original price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_original_price"
                      required
                      value={original_price}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    {/* for category_by_gender (man/woman) */}
                    <label htmlFor="product_category_by_gender" className="form-label">
                      Category by gender 
                    </label>
                    {/* <input // select man/woman
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_category_by_gender"
                      required
                      value={Category_by_gender}
                      onChange={(e) => setPrice(e.target.value)}
                    /> */}
                    <select 
                      name="gender"
                      className="form-control"
                      id="product_category_by_gender"
                      required
                      value={Category_by_gender}
                      onChange={(e) => setCategoryByGender(e.target.value)}
                    >
                      <option value="man">Man</option>
                      <option value="woman">Woman</option>
                      <option value="man/woman">Man/Woman</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_color" className="form-label">
                      Color
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_color"
                      required
                      value={Color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="product_brand" className="form-label">
                      Brand
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_brand"
                      required
                      value={Brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
