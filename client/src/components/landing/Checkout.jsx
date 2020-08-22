import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";

import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
import {
  getBrainTreeToken,
  processPayment,
} from "../../api_request/api_paymentgateway";
import { emptyCartOnPayment } from "../../helper/cartHelper";
import { newOrder } from "../../api_request/api_orders";

import Loader from "../Loader";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    error: "",
    loading: false,
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
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleChange = (event) => {
    setData({ ...data, address: event.target.value });
    //console.log(data.address);
  };

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

  const deliveryAddress = data.address;

  const makePayment = () => {
    //send requestPaymentmethod() to the backend server
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // sending the nonce data (card type,card number,etc) as 'paymentMethodNonce' with the
        //amount to be charged to the backend server
        // console.log(nonce, totalAmount(products));
        const payload = {
          amount: totalAmount(products),
          paymentMethodNonce: nonce,
        };

        processPayment(userId, token, payload)
          .then((response) => {
            // console.log(response);
            const OrderPayload = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };
            newOrder(userId, token, OrderPayload);
            emptyCartOnPayment(() => {
              setRun(!run);
              //console.log("Payment Successful");
              setData({ loading: false, success: true });
            });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log(error);
        setData({ ...data, error: error.message });
      });
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

  const ShowDropInUi = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {showLoading(data.loading)}
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <textarea
              rows="5"
              onChange={handleChange}
              className="form-control"
              value={data.address}
              placeholder="Enter Delivery Address"
              required
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button
            onClick={makePayment}
            className="Button btn-block"
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

  const showLoading = (loading) => loading && <Loader />;
  const showDropInUiError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showDropInUiSuccess = (success) => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Payment Recived,Order Is Placed,{" "}
      <Link to="/shop"> Continue Shopping</Link>
    </div>
  );

  return (
    <div>
      {getTotal() ? showCheckout() : <div></div>}
      {showDropInUiSuccess(data.success)}
    </div>
  );
};

export default Checkout;
