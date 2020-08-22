import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../landing/Layout";
import { login, authenticate, isAuthenticated } from "../../api_request";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToDashboard: false,
  });

  const { email, password, loading, error, redirectToDashboard } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToDashboard: true,
          });
        });
      }
    });
  };

  const loginFrom = () => (
    <form>
      <h3 style={{ textTransform: "uppercase" }}>Login</h3>
      {showError()}
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
        <label>
          Not Registered Yet!!!, CLICK <Link to="/register">HERE</Link> to
          register
        </label>
      </div>
      <div className="form-group bmd-form-group">
        <button
          type="button"
          className="Button form-control"
          onClick={clickSubmit}
        >
          Login
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
  const showLoading = () => loading && <div className="loader">Loading...</div>;
  const redirectUser = () => {
    if (redirectToDashboard) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/shop" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div className="container formBox">
      {showLoading()}
      {loginFrom()} {redirectUser()}
    </div>
  );
};

export default Login;
