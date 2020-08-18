import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const totalAmount = () => {
    let amount = getTotal();
    let taxamount = (amount * 18) / 100;
    let totalAmount = amount + taxamount;
    return totalAmount;
  };
  const sgst = "9%";
  const cgst = "9%";
  const totalGst = "18%";

  const showCheckout=()=>(
    <div>
    <label
      className="display-4"
      style={{
        fontSize: "x-large",
        fontWeight: "bolder",
        textTransform: "uppercase",
      }}
    >
      Checkout
    </label>
    <hr />
    <div className="lable-style">
      <label>Amount : ₹ {getTotal()}</label>
      <br />
      <label>SGST: {sgst}</label>
      <br />
      <label>CGST: {cgst}</label>
      <br />
      <label>Total GST: {totalGst}</label>
      <hr />
      <label>Total Amount Payable: ₹ {totalAmount()}</label>
    </div>
    <br />
    <div style={{ textAlign: "center" }}>
      {isAuthenticated() ? (
        <button className="btn btn-raised btn-outline-success btn-lg btn-block">
          Pay Now
        </button>
      ) : (
        <Link
          className="btn btn-raised btn-outline-info btn-lg btn-block"
          to="/login"
        >
          Log In
        </Link>
      )}
    </div>
  </div>)



  return (
    <div>
      {getTotal() ? (showCheckout()) : (
        <div></div>
      )}
    </div>
  );
};

export default Checkout;
