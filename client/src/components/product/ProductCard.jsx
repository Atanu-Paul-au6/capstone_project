import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductImage from "./ProductImage";
import { addItem } from "../../helper/cartHelper";

const Card = ({ product, setRun = (f) => f, run = undefined, id }) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const RedirectToCart = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div className="card-deck products-card">
      <div
        className="card card-background mb-5"
        id={id}
        style={{ width: "15rem" }}
      >
        <div
          className="card-header text-white bg-dark"
          style={{ fontSize: "medium" }}
        >
          {product.name}
        </div>
        <div className="card-body text-dark">
          {RedirectToCart(redirect)}
          <ProductImage item={product} url="product" />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            className="card-footer"
            style={{ position: "absolute", bottom: "0" }}
          >
            <p>{product.description.substring(0, 100)}</p>
            <button onClick={addToCart} className="btn btn-raised btn-success">
              <i
                className="fas fa-cart-plus"
                style={{ fontSize: "x-large" }}
              ></i>
            </button>
            <Link
              to={`/product/${product._id}`}
              className="btn btn-raised btn-dark ml-5"
            >
              <i className="fas fa-eye" style={{ fontSize: "x-large" }}></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
