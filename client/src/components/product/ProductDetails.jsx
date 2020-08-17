import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { getProductDetails } from "../../api_request/api_product";
import ProductImage from "./ProductImage";
// import Card from "../product/ProductCard";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadProductDetails = (productId) => {
    getProductDetails(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadProductDetails(productId);
  }, []);

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out Of Stock</span>
    );
  };

  const showShipping = (shipping) => {
    return shipping === true ? (
      <span className="badge badge-success badge-pill">Shipping Avaible</span>
    ) : (
      <span className="badge badge-danger badge-pill">
        Shipping Not Avaible
      </span>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="d-flex detailsPageStyle">
          <div style={{ backgroundColor: "white", width: "100%" }}>
            <ProductImage item={product} url="product" id="productimage" />
          </div>
          <div style={{ fontFamily: "sans-serif", marginLeft: "5em" }}>
            <p className="display-3" style={{ fontWeight: "bolder" }}>
              {product.name}
            </p>
            <p style={{ fontSize: "x-large", fontWeight: "bold" }}>
              {product.description}
            </p>
            <p>
              Price: ₹{" "}
              <label
                className="text-danger"
                style={{ fontSize: "large", fontWeight: "bold" }}
              >
                {product.price}
              </label>
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
              {showStock(product.quantity)}
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
              {showShipping(product.shipping)}
            </p>
            <p style={{ fontSize: "large", fontWeight: "bold" }}>
              Category: {product.category && product.category.name}
            </p>
            <p style={{ fontSize: "large", fontWeight: "bold" }}>
              Arrived on :{moment(product.createdAt).fromNow()}
            </p>
            <br />
            <Link to="/" className="btn btn-raised btn-lg btn-success">
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
      <br />
      <div className="row">For Related Product</div>
    </div>
  );
};

export default ProductDetails;
