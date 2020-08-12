import React, { useState } from "react";
import Layout from "../landing/Layout";
import { API } from "../../config";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signup = (user) => {
    console.log(user);
    fetch(`${API}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password });
  };

  const registerFrom = () => (
    <form>
      <h3>Register</h3>
      <div className="form-group bmd-form-group">
        <label htmlFor="name" className="bmd-label-floating">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          onChange={handleChange("name")}
        ></input>
      </div>
      <div className="form-group bmd-form-group">
        <label htmlFor="email" className="bmd-label-floating">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          onChange={handleChange("email")}
        ></input>
      </div>
      <div className="form-group bmd-form-group">
        <label htmlFor="password" className="bmd-label-floating">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={handleChange("password")}
        ></input>
      </div>
      <button
        type="button"
        className="btn btn-raised btn-success btn-lg float-xl-right"
        onClick={clickSubmit}
      >
        Register
      </button>
    </form>
  );

  return (
    <Layout className="container col-md-8 offest-md-2">
      {registerFrom()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Register;
