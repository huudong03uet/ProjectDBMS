import { useState } from "react";
// import css
import "./FilterBar.css";

// name, rating, price, brand, gender, shop, color, sort
const FilterBar = ({
  onNameFilter,
  onPriceFilter,
  onBrandFilter,
  onShopFilter,
  onColorFilter,
  onGenderFilter,
  onRatingFilter,
  onSortFilter,
}) => {
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    brand: "",
    shop: "",
    color: "",
    gender: "",
    rating: "",
    sort: "",
  });

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // gọi các hàm xử lý filter ở đây
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span className="filter-bar">Filter</span>
        <div className="filter-by-option">
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              id="name"
              value={filters.name}
              onChange={handleInput("name")}
            />
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="text"
                placeholder="Price"
              className="form-control"
              id="price"
              value={filters.price}
              onChange={handleInput("price")}
            />
          </div>
          <div className="filter-by-option__item">
            <span className="filter-by-option__item__title"></span>
            <input
              type="text"
                placeholder="Brand"

              className="form-control"
              id="brand"
              value={filters.brand}
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

              value={filters.shop}
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
              value={filters.color}
              onChange={handleInput("color")}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterBar;
