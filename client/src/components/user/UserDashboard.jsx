import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card">
        <h5 className="card-header">Quick Links</h5>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <Link className="nav-link" to="/cart">
                My Cart <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" to="/profile/update">
                Update <i className="fas fa-user-alt"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const userInfo = () => {
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

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Shopping History <i className="fas fa-cash-register"></i></h3>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Previously Bought</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="container mt-5">
      <label className="display-4">{name}'s <i className="fas fa-chalkboard"></i></label>
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
