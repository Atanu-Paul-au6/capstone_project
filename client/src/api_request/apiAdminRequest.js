import { API } from "../config";

export const createCategory = async (userId, token, category) => {
  // console.log(userId);
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const createProduct = async (userId, token, product) => {
  // console.log(userId);
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/category`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API}/product?limit=undefined`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getOneProducts = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const deleteOneProduct = async (productId, userId, token) => {
  try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.json();
  }
  catch (err) {
    return console.log(err);
  }
};

export const updateOneProduct = async (productId, userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: product
    });
    return response.json();
  }
  catch (err) {
    return console.log(err);
  }
};
