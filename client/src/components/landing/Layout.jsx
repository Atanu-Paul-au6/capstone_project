import React from "react";
import '../../Sass/style.scss'

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
