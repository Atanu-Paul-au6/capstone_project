import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
import {
  getAllProducts,
  deleteOneProduct,
} from "../../api_request/apiAdminRequest";
import Loader from "../Loader";

const UpdateProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();
  const fetchAllProducts = () => {
    setLoading(true);
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  };

  const deleteProduct = (productId) => {
    // alert('this is clicked')
    deleteOneProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        fetchAllProducts();
      }
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const goBack = () => (
    <Link to="/admin/dashboard" className="btn btn-dark">
      <i className="fas fa-arrow-left" style={{ fontSize: "xx-large" }}></i>
    </Link>
  );
  const showLoading = () => loading && <Loader />;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total-Products: {products.length}</h2>
          {goBack()}
          <hr />
          {showLoading()}
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <em>{p.name}</em>
                <div>
                  <Link
                    className="btn btn-raised btn-warning"
                    to={`/admin/product/update/${p._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-raised btn-danger"
                    onClick={() => {
                      deleteProduct(p._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateProducts;
