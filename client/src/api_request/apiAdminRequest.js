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
