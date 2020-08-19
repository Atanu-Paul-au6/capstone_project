import { API } from "../config";
export const getBrainTreeToken = async (userId, token) => {
  try {
    const response = await fetch(`${API}/payment/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
