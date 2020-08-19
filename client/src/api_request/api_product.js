import { API } from "../config";
import queryString from "query-string";
export const getProducts = async (sortBy) => {
  try {
    const response = await fetch(
      `${API}/product?sortBy=${sortBy}&order=desc&limit=8`,
      {
        method: "GET",
      }
    );
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  try {
    const response = await fetch(`${API}/products/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getSearchedProducts = async (params) => {
  const query = queryString.stringify(params);
  // console.log(query);
  try {
    const response = await fetch(`${API}/products/search?${query}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getRelatedProduct = async (productId) => {
  try {
    const response = await fetch(`${API}/product/related/${productId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};