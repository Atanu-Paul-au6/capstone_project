import { API } from "../config";

export const signup = async (user) => {
  // console.log(user);
  try {
    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const login = async (user) => {
  // console.log(user);
  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const authenticate = (data, callbackFunction) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    callbackFunction();
  }
};

export const logout = async (callbackFunction) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    callbackFunction();

    try {
      const response = await fetch(`${API}/logout`, {
        method: "GET",
      });
      console.log("logged out", response);
    } catch (err) {
      return console.log(err);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
