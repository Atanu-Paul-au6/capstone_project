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

//payload = paymentMethod(card,paypal,etc) and total amount
export const processPayment = async (userId, token, payload) => {
  try {
    const response = await fetch(`${API}/payment/processing/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
