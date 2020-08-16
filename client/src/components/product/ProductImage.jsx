import React from "react";
import { API } from "../../config";

const ProductImage = ({ item, url, id }) => (
  <div className="product-img text-center">
    <img
      className="mb-3 img-hover-zoom"
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      style={{ maxHeight: "100%", maxWidth: "100%" }}
      id={id}
    />
  </div>
);

export default ProductImage;
