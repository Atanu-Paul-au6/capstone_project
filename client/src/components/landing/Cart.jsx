import React, { useState, useEffect } from "react";
import { getCart } from "../../helper/cartHelper";
import { Link } from "react-router-dom";
import Card from "../product/ProductCard";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    const itemsincard = "itemsincard";
    return (
      <div>
        <label
          style={{
            fontSize: "x-large",
            fontWeight: "bolder",
            textTransform: "uppercase",
          }}
        >
          You have {`${items.length}`} items in your Cart
        </label>
        <hr />
        <div>
          {items.map((p, i) => (
            <Card
              key={i}
              product={p}
              setRun={setRun}
              run={run}
              id={itemsincard}
              showAddToCartButton={false}
              cartItemIncrement={true}
              removeButton={true}
            />
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <label
      style={{
        fontSize: "x-large",
        fontWeight: "bolder",
        textTransform: "uppercase",
      }}
    >
      Cart Empty{" "}
      <Link to="/shop">
        <em>SHOP NOW</em>
      </Link>
    </label>
  );

  return (
    <div className="container">
      <div className="row mt-5 boxes">
        <div className="col-5">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
