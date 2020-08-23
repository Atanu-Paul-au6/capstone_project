import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
import {
  getOneProducts,
  getCategories,
  updateOneProduct,
} from "../../api_request/apiAdminRequest";
import Loader from "../Loader";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    error: "",
    createdProduct: "",
    formData: "",
    redirectToDashboard: false,
    loading: false,
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToDashboard,
    formData,
  } = values;

  const popluateForm = (productId) => {
    setValues({ loading: true });
    getOneProducts(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
          loading: false,
        });
        populateDropdown();
      }
    });
  };

  //method to load all the categories names in the form dropdown
  const populateDropdown = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    popluateForm(match.params.productId);
  }, []);
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ loading: true });
    updateOneProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            redirectToDashboard: true,
            createdProduct: data.result.name,
          });
          // console.log(data);
          // console.log(data.result.name)
        }
      }
    );
  };
  //name
  const productFrom = () => (
    <div className="card" style={{ border: "1px solid black" }}>
      {showLoading()}
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <h5 className="card-header">Update Product</h5>
          <div className="card-body">
            <input
              type="file"
              className="form-control-file"
              id="InputFile"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            />
            <small className="text-muted">Select Product Image</small>
            <input
              type="text"
              className="form-control mt-4"
              value={name}
              placeholder="Enter Product Name"
              onChange={handleChange("name")}
            />
            <textarea
              rows="4"
              className="form-control mt-4"
              value={description}
              placeholder="Enter Product Description"
              onChange={handleChange("description")}
            ></textarea>
            <input
              type="number"
              className="form-control mt-4"
              value={price}
              placeholder="Enter Product Price"
              onChange={handleChange("price")}
            />
            <select
              onChange={handleChange("category")}
              className="form-control mt-4"
            >
              <option value="">Select Product Category</option>
              {categories &&
                categories.map((fetchedCategory, i) => (
                  <option key={i} value={fetchedCategory._id}>
                    {fetchedCategory.name}
                  </option>
                ))}
            </select>
            <select
              onChange={handleChange("shipping")}
              className="form-control mt-4"
            >
              <option value="">Is Shipping Avaible on this Product??</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            <input
              type="number"
              className="form-control mt-4"
              value={quantity}
              placeholder="Enter Product Quantity"
              onChange={handleChange("quantity")}
            />
          </div>
          {showLoading()}
          <div className="d-flex flex-row justify-content-center">
            <button type="submit" className="Button">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  const showLoading = () => loading && <Loader />;
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  // console.log(createdProduct);
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      "{createdProduct}" is updated
    </div>
  );

  const redirectUser = () => {
    if (redirectToDashboard) {
      if (!error) {
        return <Redirect to="/admin/dashboard" />;
      }
    }
  };

  const goBack = () => (
    <Link to="/edit/product" className="btn btn-dark">
      <i className="fas fa-arrow-left" style={{ fontSize: "xx-large" }}></i>
    </Link>
  );
  return (
    <section className="container mb-5">
      {goBack()}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {productFrom()}
          {showError()}
          {showSuccess()}
          {redirectUser()}
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
