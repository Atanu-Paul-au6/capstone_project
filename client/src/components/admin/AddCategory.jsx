import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
import { createCategory } from "../../api_request/apiAdminRequest";
import Loader from "../Loader";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  //fetching user and token from local stroage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    createCategory(user._id, token, { name }).then((data) => {
      // console.log(user._id, token)
      if (data.error) {
        setError(true);
        setLoading(false);
      } else {
        setError("");
        setSuccess(true);
        setLoading(false);
      }
    });
  };

  const categoryFrom = () => (
    <div className="card mt-5" style={{ border: "1px solid black" }}>
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <h5 className="card-header">Create Category</h5>
          <div className="card-body">
            <input
              type="text"
              className="form-control"
              id="CategoryInput"
              placeholder="Enter category name"
              onChange={handleChange}
              value={name}
              autoFocus
              required
            />
          </div>
          <div className="d-flex flex-row justify-content-center">
            <button
              type="submit"
              className="Button"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const showLoading = () => loading && <Loader />;
  const showSuccess = () => {
    if (success) {
      return (
        <div className="card mt-5">
          <h5 className="card-header">Success</h5>
          <div className="card-body">
            <p className="text-success">
              New Category with name "{name}" created
            </p>
          </div>
        </div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div className="card mt-5">
          <h5 className="card-header">Error</h5>
          <div className="card-body">
            <p className="text-danger">
              Category with Name: "{name}" already present. Please give a new
              name
            </p>
          </div>
        </div>
      );
    }
  };

  const goBack = () => (
    <Link to="/admin/dashboard" className="btn btn-dark">
      <i className="fas fa-arrow-left" style={{ fontSize: "xx-large" }}></i>
    </Link>
  );

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">{categoryFrom()}</div>
      </div>
      {goBack()}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
        </div>
      </div>
    </section>
  );
};

export default AddCategory;
