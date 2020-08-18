import React, { useState, useEffect } from "react";
import Layout from "../landing/Layout";
import { getProducts } from "../../api_request/api_product";
import Loader from "../Loader";
import Card from "../product/ProductCard";
import SeachBar from "./SearchBar";

const Login = () => {
  const [mostSold, setMostSold] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadProductsBySell = () => {
    setLoading(true);
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setMostSold(data);
        setLoading(false);
      }
    });
  };

  const loadProductsByArrival = () => {
    setLoading(true);
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setNewArrival(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);
  const showLoading = () => loading && <Loader />;
  return (
    <Layout className="container">
      <SeachBar />
      {showLoading()}
      <label
        className="mb-4"
        style={{
          fontSize: "x-large",
          fontWeight: "bolder",
          textTransform: "uppercase",
        }}
      >
        biggest sellers
      </label>
      <hr />
      <div className="row equal">
        {mostSold.map((product, i) => (
          <div className="col-sm-3 d-flex pb-5 center-card" key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>
      <hr />
      <label
        className="mb-4"
        style={{
          fontSize: "x-large",
          fontWeight: "bolder",
          textTransform: "uppercase",
        }}
      >
        just arrived
      </label>
      <hr />
      <div className="row equal">
        {newArrival.map((product, i) => (
          <div className="col-sm-3 d-flex pb-5 center-card" key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Login;
