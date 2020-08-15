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
