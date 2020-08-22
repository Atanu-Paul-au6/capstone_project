import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
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
          </ul>
        </div>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
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

  return (
    <section className="container mt-5">
      <label className="display-4">
        {name}'s <i className="fas fa-chalkboard"></i>
      </label>
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </section>
  );
};

export default AdminDashboard;
