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

export const getOrders = async (userId, token) => {
  try {
    const response = await fetch(`${API}/order/show/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getOrderStatusValues = async (userId, token) => {
  try {
    const response = await fetch(`${API}/order/status/values/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const changeOrderStatus = async (userId, token, orderId, status) => {
  try {
    const response = await fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, orderId }),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
