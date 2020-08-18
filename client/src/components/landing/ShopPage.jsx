import React, { useState, useEffect } from "react";
import { getFilteredProducts } from "../../api_request/api_product";
import { getCategories } from "../../api_request/apiAdminRequest";
import { price } from "../../helper/priceRange";
import Loader from "../Loader";
import Checkbox from "./Checkbox";
import PriceRadio from "./PriceRadio";

import Card from "../product/ProductCard";

import "../../Sass/style.scss";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState({
    filter: { category: [], price: [] },
  });

  const populateDropdown = () => {
    setLoading(true);
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setCategories(data);
        setLoading(false);
      }
    });
  };

  const loadProducts = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMoreProducts = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, categoryFilters.filter).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div style={{ textAlign: "center" }}>
          <button
            className="btn btn-raised btn-lg btn-block btn-dark mb-5"
            onClick={loadMoreProducts}
          >
            View More
          </button>
        </div>
      )
    );
  };
  useEffect(() => {
    loadProducts(skip, limit, categoryFilters.filter);
  }, []);

  const handelToggelClick = () => {
    populateDropdown();
  };

  const handelFilter = (filter, filterBy) => {
    // console.log("SHOP", filter, filterBy);
    const newcategoryFilters = { ...categoryFilters };
    newcategoryFilters.filter[filterBy] = filter;

    if (filterBy === "price") {
      let priceValues = handelprice(filter);
      newcategoryFilters.filter[filterBy] = priceValues;
    }
    loadProducts(newcategoryFilters.filter);
    setCategoryFilters(newcategoryFilters);
  };

  const handelprice = (value) => {
    const data = price;
    let arr = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        arr = data[key].array;
      }
    }
    return arr;
  };

  const showLoading = () => loading && <Loader />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <button
            data-toggle="collapse"
            data-target="#fbc"
            className="btn btn-transparent"
            onClick={handelToggelClick}
            style={{ fontSize: "large", fontWeight: "bolder" }}
          >
            Category{"\u00A0"}
            {"\u00A0"}
            <i className="fas fa-sliders-h" style={{ fontSize: "x-large" }}></i>
          </button>
          <hr />
          <div id="fbc">
            <ul>
              <Checkbox
                categories={categories}
                handelFilter={(filter) => handelFilter(filter, "category")}
              />
            </ul>
          </div>
          <div>
            <label
              style={{
                fontSize: "large",
                fontWeight: "bolder",
                textTransform: "uppercase",
              }}
            >
              Price Range
            </label>
            <hr />
            <PriceRadio
              prices={price}
              handelFilter={(filter) => handelFilter(filter, "price")}
            />
          </div>
        </div>
        <div className="col-9 mt-4">
          {showLoading()}
          <div className="row equal">
            {filteredResults.map((product, i) => (
              <div className=" col d-flex pb-5 center-card" key={i}>
                <Card product={product} />
              </div>
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </div>
  );
};

export default Shop;
