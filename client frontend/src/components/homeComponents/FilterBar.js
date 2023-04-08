import { useState } from "react";
// import css
import "./FilterBar.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// name, rating, price, brand, gender, shop, color, sort
const FilterBar = () => {
  // const filter = [name, rating, price, brand, gender, shop, color, sort];
  const filter = ["name", "price_max","price_min", "brand", "shop", "color", "gender", "order by"];
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();
  

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleInput = (name) => (event) => {
    setKeyword({ ...keyword, [name]: event.target.value });

  };

  const handleSubmit = (event) => {
    event.preventDefault();  
    for (let i = 0; i < filter.length; i++) {
      if (keyword[filter[i]] === "") {
        keyword[filter[i]] = undefined;
         }
    }
    if (keyword) {
      history.push(`/search/full/name/${keyword.name}/price_min/${keyword.price_min}/price_max/${keyword.price_max}/brand/${keyword.brand}/shop/${keyword.shop}/color/${keyword.color}/gender/${keyword.gender}/order_by/${keyword.order_by}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* <span className="filter-bar"
        style={{fontSize: "40px", fontWeight: "bold", color: "black"}}
        ></span> */}
        <div className="filter-by-option">
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              id="name"
              onChange={handleInput("name")}
            />
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="number"
                placeholder="Price min"
              className="form-control"
              id="price_min"
              // value={filters.price}
              onChange={handleInput("price_min")}
            />
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="number"
                placeholder="Price max"
              className="form-control"
              id="price_max"
              onChange={handleInput("price_max")}
            />
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="text"
                placeholder="Brand"

              className="form-control"
              id="brand"
              // value={filters.brand}
              onChange={handleInput("brand")}
            />
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="text"
              placeholder="Shop"
              className="form-control"
              id="shop"

              // value={filters.shop}
              onChange={handleInput("shop")}
            />
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="text"
              placeholder="Color"
              className="form-control"
              id="color"
              // value={filters.color}
              onChange={handleInput("color")}
            />
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <select
              type="text"
              className="form-control"
              placeholder="Gender"
              id="gender"

              // value={filters.color}
              onChange={handleInput("gender")}
            >
              <option>Gender</option>
              <option value="Men">Man</option>
              <option value="Women">Woman</option>
            </select>
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <select
              type="text"
              className="form-control"
              placeholder="Order by"
              id="order_by"

              // value={filters.color}
              onChange={handleInput("order_by")}
            >
              <option>Order by</option>
              <option value="Name">Name</option>
              <option value="Price_high">Price high</option>
              <option value="Price_low">Price low</option>
              <option value="Rating_high">Rating high</option> 
              <option value="Rating_low">Rating low</option>            
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterBar;
