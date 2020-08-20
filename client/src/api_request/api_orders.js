import { API } from "../config";
export const newOrder = async (userId, token, OrderPayload) => {
  try {
    const response = await fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: OrderPayload }),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
