import React, { useEffect, useState } from "react";
import styles from "./CustomProducts.module.css";
import { customProductsHook } from "../hooks/useCustomProducts";

export default function CustomProducts({
  value: { name, min, max, id },
  setProducts,
  checkedIt,
}) {
  console.log(checkedIt);
  const { checked, handleChange } = customProductsHook({
    setProducts,
    id,
    checkedIt,
  });

  useEffect(() => {
    if (checked) {
      setProducts((prev) => [...prev, { id, checked }]);
    }
  }, []);

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
