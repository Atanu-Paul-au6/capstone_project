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
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Enter Name"
          onChange={handleChange("name")}
        ></input>
      </div>
      <div className="form-group bmd-form-group">
        <input
          type="email"
          className="form-control"
          id="formGroupExampleInput1"
          placeholder="Enter Email Address"
          onChange={handleChange("email")}
        ></input>
      </div>
      <div className="form-group bmd-form-group">
        <input
          type="password"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Enter Password"
          onChange={handleChange("password")}
        ></input>
      </div>
      <div className="form-group bmd-form-group">
      <button
        type="button"
        className="btn btn-raised btn-info btn-lg form-control"
        onClick={clickSubmit}
      >
        Register
      </button>
      </div>
    </form>
  );

  return (
    <Layout className="container formBox">
      {registerFrom()}
    </Layout>
  );
};

export default Register;
