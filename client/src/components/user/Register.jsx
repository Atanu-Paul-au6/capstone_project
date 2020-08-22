import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../landing/Layout";
import { signup } from "../../api_request";
const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    error: "",
    success: false,
    loading: false,
  });

  const { name, email, password, role, success, error, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // console.log(role);
    if (role === "1") {
      signup({ name, email, password, role }).then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            role: "",
            error: "",
            success: true,
          });
        }
      });
    } else {
      console.log("YEPPPPP");
      signup({ name, email, password }).then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            role: "",
            error: "",
            success: true,
          });
        }
      });
    }
  };

  const registerFrom = () => (
    <form>
      <h3 style={{ textTransform: "uppercase" }}>Register</h3>
      {showError()}
      {showSuccess()}
      <div className="form-group bmd-form-group">
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Enter Name"
          onChange={handleChange("name")}
          value={name}
        ></input>
      </div>
      <div className="form-group bmd-form-group">
        <input
          type="email"
          className="form-control"
          id="formGroupExampleInput1"
          placeholder="Enter Email Address"
          onChange={handleChange("email")}
          value={email}
        ></input>
      </div>
      <div className="form-group bmd-form-group">
        <input
          type="password"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Enter Password"
          onChange={handleChange("password")}
          value={password}
        ></input>
      </div>
      <div className="form-group bmd-form-group">
        <select onChange={handleChange("role")} className="form-control">
          <option value="">Select Role</option>
          <option value="0">Buyer</option>
          <option value="1">Seller</option>
        </select>
      </div>
      <div className="form-group bmd-form-group">
        <button
          type="button"
          className="Button form-control"
          onClick={clickSubmit}
        >
          Register
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Account Created. Go To <Link to="/login">Login</Link>
    </div>
  );
  const showLoading = () => loading && <div className="loader">Loading...</div>;

  return (
    <div className="container formBox">
      {showLoading()}
      {registerFrom()}
    </div>
  );
};

export default Register;
