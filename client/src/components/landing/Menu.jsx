import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../../api_request";

//#658361
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#658361",
      fontSize: "large",
      fontWeight: "bold",
      cursor: "pointer",
    };
  }
};
//use this icon for shopping cart <i className="fas fa-shipping-fast"></i>
const Menu = ({ history }) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <Link className="navbar-brand" to="/">
        <img src="logoicon.png" alt="comapny-logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link
            className="nav-item nav-link"
            to="/"
            style={isActive(history, "/")}
          >
            Home
          </Link>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Link
              className="nav-item nav-link"
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              Profile
            </Link>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Link
              className="nav-item nav-link"
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              Dashboard
            </Link>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <Link
                className="nav-item nav-link"
                to="/register"
                style={isActive(history, "/register")}
              >
                Register
              </Link>
              <Link
                className="nav-item nav-link"
                to="/login"
                style={isActive(history, "/login")}
              >
                Login
              </Link>
            </Fragment>
          )}
          {isAuthenticated() && (
            <span
              className="nav-item nav-link"
              style={{
                color: "#658361",
                cursor: "pointer",
              }}
              onClick={() =>
                logout(() => {
                  history.push("/login");
                })
              }
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </nav>
  </div>
);

export default withRouter(Menu);
