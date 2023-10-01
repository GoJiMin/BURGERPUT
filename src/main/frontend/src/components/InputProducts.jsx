import React, { useEffect, useState } from "react";
import styles from "./InputProducts.module.css";
import Banner from "./Banner";

export default function InputProducts({
  product: { name, min, max },
  product,
}) {
  const [temp, setTemp] = useState("");
  const [warning, setWarning] = useState(false);
  const handleChange = (e) => {
    setTemp(e.target.value);
    setTimeout(() => {
      if (
        parseInt(e.target.value) > parseInt(max) ||
        parseInt(e.target.value) < parseInt(min)
      ) {
        setWarning(true);
        setTimeout(() => {
          setWarning(false);
          setTemp("");
        }, 2300);
      }
    }, 2000);
  };

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
        <input
          className={styles.input}
          type='text'
          value={temp}
          onChange={handleChange}
        />
        <p className={styles.temp}>ºF</p>
      </div>
    </div>
  );
}
