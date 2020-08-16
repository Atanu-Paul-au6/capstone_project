import React, { useState, useEffect } from "react";
import { getCategories } from "../../api_request/apiAdminRequest";
// import { getProducts } from "../../api_request/api_product";
// import Loader from "../Loader";
// import Card from "../product/ProductCard";

const SearchBar = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    searchText: "",
    results: [],
    seached: false,
  });

  const { categories, category, searchText, results, seached } = data;
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchSubmit = () => {};

  const handleChange = () => {};

  //
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group">
          <input
          id="searchTextbox"
            type="search"
            className="form-control"
            placeholder="Product Name"
            onChange={handleChange("search")}
          />
          <div className="input-group-append">
            <button type="button" class="btn btn-raised btn-dark">
              <i className="fas fa-search" style={{ fontSize: "large" }}></i>
            </button>
            <select
              class="btn btn-raised btn-dark"
              onChange={handleChange("category")}
            >
              <option value="All">Choose Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className="row">
      <div className="container mb-5">{searchForm()}</div>
    </div>
  );
};

export default SearchBar;
