import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
import { getBrainTreeToken } from "../../api_request/api_paymentgateway";
const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    error: "",
    clientToken: null,
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBrainTreeToken(userId, token).then((data) => {
      if (data.err) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

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

  const showCheckout = () => (
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
      {showDropInUiError(data.error)}
      <div style={{ textAlign: "center" }}>
        {isAuthenticated() ? (
          <div>{ShowDropInUi()}</div>
        ) : (
          <Link
            className="btn btn-raised btn-outline-info btn-lg btn-block"
            to="/login"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );

  const makePayment = () => {
    //send requestPaymentmethod() to the backend server

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        // sending the nonce data (card type,card number,etc) as 'paymentMethodNonce' with the
        //amount to be charged to the backend server
        console.log(nonce, totalAmount(products));
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, error: error.message });
      });
  };
  const ShowDropInUi = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button
            onClick={makePayment}
            className="btn btn-raised btn-outline-success btn-lg btn-block"
            style={{
              fontWeight: "bolder",
              textTransform: "uppercase",
            }}
          >
            Pay Now
          </button>
        </div>
      ) : null}
    </div>
  );

  const showDropInUiError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return <div>{getTotal() ? showCheckout() : <div></div>}</div>;
};

export default Checkout;
