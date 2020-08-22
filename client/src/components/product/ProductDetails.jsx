import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import {
  getProductDetails,
  getRelatedProduct,
} from "../../api_request/api_product";

import { addItem } from "../../helper/cartHelper";
import ProductImage from "./ProductImage";
import Card from "./ProductCard";
import '../../Sass/style.scss'

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
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

  const loadProductDetails = (productId) => {
    getProductDetails(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //fetching the related products here as to fetch them we frist need to product id
        getRelatedProduct(data._id).then((related_data) => {
          if (related_data.error) {
            setError(related_data.error);
          } else {
            setRelatedProduct(related_data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadProductDetails(productId);
  }, [props]);

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
        <div className="detailsPageStyle row">
          <div className='col-6' style={{ width: "100%", marginTop: "2em" }}>
            <ProductImage item={product} url="product" id="productimage" />
          </div>
          <div className=" col-6 card-details">
            <p
              className="display-3"
              style={{ fontWeight: "bolder", marginTop: "2em" }}
            >
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
            {RedirectToCart(redirect)}
            <button
              onClick={addToCart}
              className="Button"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <br />
      <label
        style={{
          fontSize: "x-large",
          fontWeight: "bolder",
          textTransform: "uppercase",
        }}
      >
        Similar Products
      </label>
      <hr />
      <div className="row">
        <div className="related-products-wrap">
          {relatedProduct.map((p, i) => (
            <Card key={i} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
