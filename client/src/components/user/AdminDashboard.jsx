import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
import { getUserPurchaseHistory } from "../../api_request/api_user";
const AdminDashboard = () => {
  const [userpurchasehistory, setUserPurchaseHistory] = useState([]);

  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();
  isAuthenticated();

  useEffect(() => {
    getUserPurchaseHistory(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUserPurchaseHistory(data);
      }
    });
  }, []);

  const adminLinks = () => {
    return (
      <div className="card profilecard-styles">
        <h5 className="card-header">Quick Links</h5>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <Link className="nav-link" to="/create/category">
                Category <i className="fas fa-folder-plus"></i>
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" to="/create/product">
                Product <i className="fas fa-folder-plus"></i>
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" to="/order/list">
                Orders <i className="fas fa-folder-open"></i>
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" to={`/profile/update/${_id}`}>
                Update <i className="fas fa-user-alt"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5 profilecard-styles-1">
        <h3 className="card-header">
          Profile Information <i className="fas fa-address-card"></i>
        </h3>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item list-group-item-dark">
              <label>ID:</label>
              <label className="ml-5">{_id}</label>
            </li>
            <li className="list-group-item list-group-item-dark">
              <label>Name:</label>
              <label className="ml-5">{name}</label>
            </li>
            <li className="list-group-item list-group-item-dark">
              <label>Email:</label>
              <label className="ml-5">{email}</label>
            </li>
            <li className="list-group-item list-group-item-dark">
              <label>Role:</label>
              <label className="ml-5">
                {role === 1 ? "Admin" : "Registered User"}
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  const purchaseHistory = (userpurchasehistory) => {
    return (
      <div className="card mb-5 profilecard-styles-1">
        <h3 className="card-header">
          Shopping History <i className="fas fa-cash-register"></i>
        </h3>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              {userpurchasehistory.map((p, i) => {
                return (
                  <div>
                    {p.products.map((product, productIndex) => {
                      return (
                        <div key={productIndex}>
                          <h6>Item name: {product.name}</h6>
                          <h6>Item price: ₹ {product.price}</h6>
                          <h6>
                            Purchased On:{" "}
                            {moment(product.createdAt).format("LLLL")}
                          </h6>
                          <div
                            style={{ borderBottom: "1px solid black" }}
                            className="mt-5 mb-5"
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="container mt-5">
      <label className="display-4">
        {name}'s <i className="fas fa-chalkboard"></i>
      </label>
      <div className="row boxes">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">
          {adminInfo()} {purchaseHistory(userpurchasehistory)}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
