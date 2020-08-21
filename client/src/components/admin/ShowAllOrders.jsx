import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
import { getOrders, getOrderStatusValues } from "../../api_request/api_orders";
// import Loader from "../Loader";

const ShowAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValue, setStatusValue] = useState([]);
  const { user, token } = isAuthenticated();

  const fetchOrders = () => {
    getOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const fetchOrderStatus = () => {
    getOrderStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValue(data);
      }
    });
  };

  useEffect(() => {
    fetchOrders();
    fetchOrderStatus();
  }, []);

  const OrderCount = () => {
    if (orders.length > 0) {
      return (
        <label
          style={{
            fontSize: "large",
            fontWeight: "bolder",
            textTransform: "uppercase",
            color: "green",
          }}
        >
          You have {orders.length} orders
        </label>
      );
    } else {
      return (
        <label
          style={{
            fontSize: "large",
            fontWeight: "bolder",
            textTransform: "uppercase",
            color: "red",
          }}
        >
          You have No orders
        </label>
      );
    }
  };

  const handleStatusChange = (e, orderId) => {
    console.log("ORDER STAUS EMUN");
  };
  const showStatus = (o) => (
    <div className="custom-select">
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <options>Update Stauts</options>
        {statusValue.map((status, sid) => (
          <option key={sid} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container">
      <div>
        <label
          style={{
            fontSize: "x-large",
            fontWeight: "bolder",
            textTransform: "uppercase",
          }}
        >
          Your orders
        </label>
        <hr />
        {OrderCount()}

        {orders.map((o, oIn) => {
          return (
            <div
              className="mt-2"
              key={oIn}
              style={{ borderBottom: "5px solid black" }}
            >
              <label>Order Details</label>
              <div className="alert alert-info">This Order is "{o.status}"</div>
              <table style={{ width: "100%" }} id="orderTable">
                <thead>
                  <tr>
                    <th>Order No</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Customer Name</th>
                    <th>Ordered At</th>
                    <th>Customer Address</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{o._id}</td>
                    <td>{showStatus(o)}</td>
                    <td>{o.transaction_id}</td>
                    <td>₹ {o.amount}</td>
                    <td>{o.user.name}</td>
                    <td>{moment(o.createdAt).fromNow()}</td>
                    <td>{o.address}</td>
                  </tr>
                </tbody>
              </table>
              <label>Product Details</label>
              <table className="mb-5" style={{ width: "100%" }} id="orderTable">
                {o.products.map((p, pId) => (
                  <Fragment key={pId}>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Number Of Products</th>
                        <th>Product ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.count}</td>
                        <td>{p._id}</td>
                      </tr>
                    </tbody>
                  </Fragment>
                ))}
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAllOrders;
