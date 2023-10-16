import React, { useEffect } from "react";
import styles from "./InputProducts.module.css";
import Banner from "./Banner";
import { useInputProducts } from "../hooks/useInputProducts";

export default function InputProducts({
  product: { name, min, max },
  product,
}) {
  const { temp, warning, handleChange, handleClick, missing } =
    useInputProducts();

  useEffect(() => {
    product.temp = temp;
  }, [product, temp]);

  return (
    <div className={styles.product}>
      <div className={styles.text}>
        <p className={styles.text__title}>{name} :</p>
        <p className={styles.text__temp}>
          ({min} ~ {max}ºF)
        </p>
      </div>

      {warning && <Banner text={"지정된 온도 범위가 아닙니다."} />}
      <div className={styles.container}>
        <button className={styles.missing} onClick={handleClick} type='button'>
          결품
        </button>
        <input
          className={missing ? `${styles.input__missing}` : `${styles.input}`}
          type='text'
          value={temp}
          disabled={missing}
          onChange={handleChange}
        />
        <p
          className={
            missing ? `${styles.text__temp__missing}` : `${styles.text__temp}`
          }
        >
          ºF
        </p>
      </div>
    </div>
  );
}
