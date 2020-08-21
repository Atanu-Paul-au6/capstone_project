import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../../api_request";
import { itemTotal } from "../../helper/cartHelper";

//remeber to add menu-text-color class on every new link tag.
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#D0DD97",
      fontSize: "large",
      fontWeight: "bold",
      cursor: "pointer",
    };
  }
};

//use this icon for shopping cart <i className="fas fa-shipping-fast"></i>
const Menu = ({ history }) => {
  const displayCartItemCount = () => {
    let count = itemTotal();
    if (count > 0) {
      return (
        <sup>
          <label className="badge badge-pill" id="lblCartCount">
            {itemTotal()}
          </label>
        </sup>
      );
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark navbar-sticky"
      >
        <Link className="navbar-brand" to="/">
          <img
            src="logo_transparent.png"
            alt="comapny-logo"
            style={{ width: "40px" }}
            className="logo-zoom"
          />
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
              className="nav-item nav-link menu-text-color"
              to="/"
              style={isActive(history, "/")}
            >
              Home
            </Link>
            <Link
              className="nav-item nav-link menu-text-color"
              to="/shop"
              style={isActive(history, "/shop")}
            >
              Shop
            </Link>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                className="nav-item nav-link menu-text-color"
                to="/user/dashboard"
                style={isActive(history, "/user/dashboard")}
              >
                Profile
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                className="nav-item nav-link menu-text-color"
                to="/admin/dashboard"
                style={isActive(history, "/admin/dashboard")}
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <Link
                  className="nav-item nav-link menu-text-color"
                  to="/register"
                  style={isActive(history, "/register")}
                >
                  Register
                </Link>
                <Link
                  className="nav-item nav-link menu-text-color"
                  to="/login"
                  style={isActive(history, "/login")}
                >
                  Login
                </Link>
              </Fragment>
            )}
            {isAuthenticated() && (
              <span
                className="nav-item nav-link menu-text-color"
                style={{
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
          <div className="ml-auto">
            {isAuthenticated() && (
              <span style={{ color: "white" }}>
                Hello, {isAuthenticated().user.name}
              </span>
            )}
            <Link
              className="ml-3"
              to="/cart"
              style={isActive(history, "/cart")}
            >
              <i
                className="fas fa-shopping-cart"
                style={{ color: "white", fontSize: "x-large" }}
              ></i>{" "}
              {displayCartItemCount()}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
