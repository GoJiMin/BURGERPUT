import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import styles from "./SetTemp.module.css";
import "rc-slider/assets/index.css";

export default function SetTemp({ product, product: { name, min, max } }) {
  const [temp, setTemp] = useState([+min, +max]);
  const initTemp = useRef([+min, +max]);

  useEffect(() => {
    product.min = temp[0];
    product.max = temp[1];
  }, [temp]);

  return (
    <section>
      <header className={styles.header}>
        <p>{name}</p>
        <p>{min}</p>
        <p>{max}</p>
      </header>
      <Slider
        range
        onChange={(event) => setTemp([event[0], event[1]])}
        min={initTemp.current[0]}
        max={initTemp.current[1]}
        allowCross={false}
        defaultValue={[initTemp.current[0], initTemp.current[1]]}
      />
    </section>
  );
}
