import React, { useState } from "react";
import styles from "./CustomProducts.module.css";

export default function CustomProducts({
  value: { name, min, max, id },
  setProducts,
}) {
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setChecked((prev) => !prev);
    handleCheck(e.target.checked);
  };
  const deleteProducts = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };
  const handleCheck = (isChecked) => {
    if (isChecked) {
      setProducts((prev) => [...prev, { id, isChecked }]);
    } else {
      deleteProducts(id);
    }
  };

  return (
    <div className={styles.product}>
      <input
        className={styles.check}
        type='checkbox'
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      <label className={styles.text} htmlFor={id}>
        {name}
        <span className={styles.text__temp}>
          ({min} ~ {max} ºF)
        </span>
      </label>
    </div>
  );
}
