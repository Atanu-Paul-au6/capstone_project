import React, { useState, useEffect } from "react";
import { getCategories } from "../../api_request/apiAdminRequest";
import { getSearchedProducts } from "../../api_request/api_product";
// import Loader from "../Loader";
import Card from "../product/ProductCard";

const SearchBar = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;
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

  const searchProduct = () => {
    // console.log(search, category);
    if (search) {
      getSearchedProducts({
        search: search || undefined,
        category: category,
      }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchProduct();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `${results.length} products found `;
    }
    if (searched && results.length < 1) {
      return `No products found `;
    }
  };
  const searchedProducts = (results = []) => {
    return (
      <div>
        <p className="text-dark display-3 ml-5">
          {searchMessage(searched, results)}
        </p>
        <div className="row equal ml-5">
          {results.map((product, i) => (
            <div className="col-3 mt-5 card-deck">
              <Card product={product} key={i} />
            </div>
          ))}
        </div>
      </div>
    );
  };
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
            <button type="submit" className="btn btn-raised btn-dark">
              <i className="fas fa-search" style={{ fontSize: "large" }}></i>
            </button>
            <select
              className="btn btn-raised btn-dark"
              onChange={handleChange("category")}
            >
              <option value="All">All Categories</option>
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
      <div className="container-fluid mb-5">{searchedProducts(results)}</div>
    </div>
  );
};

export default SearchBar;
