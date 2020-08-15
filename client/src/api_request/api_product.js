import { API } from "../config";

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
      filters
  };
  try {
    const response = await fetch(`${API}/products/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  catch (err) {
    console.log(err);
  }
};
