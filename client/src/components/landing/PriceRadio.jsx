import React, { useState } from "react";

const PriceRadio = ({ prices, handelFilter }) => {
  const [value, setValue] = useState(0);

  const handelChange = (event) => {
    handelFilter(event.target.value);
    setValue(event.target.value);
  };
  return prices.map((price, index) => (
      <div key={index}>
        <input
          onChange={handelChange}
          type="radio"
          className="mr-2 ml-4"
          value={`${price._id}`}
          name={price}
        />
        <label className="form-check-lable">{price.name}</label>
      </div>
  ));
};
export default PriceRadio;
