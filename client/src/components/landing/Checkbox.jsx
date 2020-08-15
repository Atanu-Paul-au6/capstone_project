import React, { useState } from "react";

const Checkbox = ({ categories, handelFilter }) => {
  const [checked, setChecked] = useState([]);

  const handelCheck = (category) => () => {
    //indexof() method will return the first index or -1
    const checkedCategoryId = checked.indexOf(category);
    const newcheckedCategoryId = [...checked];

    //if checkedCategoryId is not already in the state then push it in the state

    if (checkedCategoryId === -1) {
      newcheckedCategoryId.push(category);
    } else {
      newcheckedCategoryId.splice(checkedCategoryId, 1);
    }
    //console.log(newcheckedCategoryId);
    setChecked(newcheckedCategoryId);
    handelFilter(newcheckedCategoryId);
  };

  return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
      <input
        onChange={handelCheck(category._id)}
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(category._id === -1)}
      />
      <label className="form-check-lable">{category.name}</label>
    </li>
  ));
};

export default Checkbox;
