import React from "react";
import "../../style/style.css";

const Layout = ({ children, className }) => (
  <div>
    <div className="jumbotron jumbotron-fluid jumbotronImg">
      <div className="container">
      </div>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
