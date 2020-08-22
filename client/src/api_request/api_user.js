import { API } from "../config";
export const getUserData = async (userId, token) => {
  try {
    const response = await fetch(`${API}/profile/${userId}`, {
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

export const changeUserData = async (userId, token, user) => {
  try {
    const response = await fetch(`${API}/profile/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const updateLocalStorageData = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let authData = JSON.parse(localStorage.getItem("jwt"));
      authData.user = user;
      localStorage.setItem("jwt", JSON.stringify(authData));
      next();
    }
  }
};

export const getUserPurchaseHistory = async (userId, token) => {
  //console.log(userId, token)
  try {
    const response = await fetch(`${API}/profile/purchase/history/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(response)
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};