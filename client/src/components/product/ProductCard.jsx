import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductImage from "./ProductImage";
import {
  addItem,
  increaseCartItem,
  removeCartItem,
} from "../../helper/cartHelper";

const Card = ({
  product,
  setRun = (f) => f,
  run = undefined,
  id,
  showAddToCartButton = true,
  cartItemIncrement = false,
  removeButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  
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

  const AddToCartButton = (show) => {
    return (
      show && (
        <button
          onClick={addToCart}
          className="Button1"
        >
          <i className="fas fa-cart-plus" style={{ fontSize: "x-large" }}></i>
        </button>
      )
    );
  };

  const handelChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      increaseCartItem(productId, event.target.value);
    }
  };
  const ItemIncrementDecrement = (cartItemIncrement) => {
    return (
      cartItemIncrement && (
        <div className="mt-5">
          <input
            className="form-control cartInputStyle"
            type="number"
            value={count}
            onChange={handelChange(product._id)}
          />
          <label className="text-muted">
            Items in Cart {count}{" "}
            <em style={{ fontWeight: "bolder" }}>Add More Items</em>
          </label>
        </div>
      )
    );
  };

  const removeItemFromCart = () => {
    setRun(!run);
    removeCartItem(product._id);
  };
  const removeItemButton = (removeButton) => {
    return (
      removeButton && (
        <button
          className="cartInputLableStyle btn btn-raised btn-outline-danger"
          style={{ marginTop: "1em" }}
          onClick={removeItemFromCart}
        >
          <i className="fas fa-trash-alt" style={{ fontSize: "x-large" }}></i>
        </button>
      )
    );
  };

  return (
    <div className="d-flex detailsPageStyle">
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
            >
              <p>{product.description.substring(0, 100)}</p>
              {AddToCartButton(showAddToCartButton)}
              <Link
                to={`/product/${product._id}`}
                className="Button1 ml-5"
              >
                <i className="fas fa-eye" style={{ fontSize: "x-large" }}></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-5">
        {ItemIncrementDecrement(cartItemIncrement)}
        {removeItemButton(removeButton)}
      </div>
    </div>
  );
};

export default Card;
