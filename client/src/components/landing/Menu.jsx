import React from "react";
import { Link, withRouter } from "react-router-dom";

//#658361
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#658361", fontSize: "large", fontWeight: "bold" };
  }
};

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
        </div>
      </div>
    </nav>
  </div>
);

export default withRouter(Menu);
