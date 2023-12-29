import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import styles from "./SetTemp.module.css";
import "rc-slider/assets/index.css";

export default function SetTemp({ product, product: { name, min, max } }) {
  const [temp, setTemp] = useState([+min, +max]);
  const [disabled, setDisabled] = useState(false);
  const initTemp = useRef([+min, +max]);

  const handleDisabled = () => {
    setDisabled((prev) => !prev);
  };

  useEffect(() => {
    product.min = temp[0];
    product.max = temp[1];
  }, [temp]);

  useEffect(() => {
    if (disabled) {
      product.min = 999;
      product.max = 999;
    }
  }, [disabled]);

  return (
    <section className={styles.product}>
      <header className={styles.header}>
        <p className={styles.name}>{name}</p>
        <p className={styles.initTemp}>
          ({initTemp.current[0]} ~ {initTemp.current[1]} ºF)
          <button
            className={styles.missing}
            onClick={handleDisabled}
            type='button'
          >
            결품
          </button>
        </p>
      </header>
      <article className={styles.slider}>
        <p className={styles.temp}>{disabled ? 999 : temp[0]} ºF</p>
        <Slider
          range
          onChange={(event) => setTemp([event[0], event[1]])}
          min={initTemp.current[0]}
          max={initTemp.current[1]}
          allowCross={false}
          defaultValue={[initTemp.current[0], initTemp.current[1]]}
        />

        <p className={styles.temp}>{disabled ? 999 : temp[1]} ºF</p>
      </article>
    </section>
  );
}
