import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

const Card = ({ product }) => {
  return (
    <div className="card-deck">
      <div className="card card-background " style={{ width: "18rem" }}>
        <div
          className="card-header text-white bg-dark"
          style={{ fontSize: "medium" }}
        >
          {product.name}
        </div>
        <div className="card-body text-dark">
          <ProductImage item={product} url="product" />
          <p>{product.description.substring(0, 50)}</p>
          <label>₹ {product.price}</label>
          <br />
          <div
            className="card-footer"
            style={{ position: "absolute", bottom: "0" }}
          >
            <Link to="/" className="btn btn-raised btn-success">
              <i
                className="fas fa-cart-plus"
                style={{ fontSize: "x-large" }}
              ></i>
            </Link>
            <Link to="/" className="btn btn-raised btn-dark ml-5">
              <i className="fas fa-eye" style={{ fontSize: "x-large" }}></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
