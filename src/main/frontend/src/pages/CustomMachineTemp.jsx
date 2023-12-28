import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomMachines } from "../api/Products";
import styles from "./CustomMachineTemp.module.css";
import SetTemp from "../components/SetTemp";

export default function CustomMachineTemp() {
  const { data } = useQuery(["customMachinesTemp"], () => getCustomMachines());
  const [products, setProducts] = useState("");

  useEffect(() => {
    setProducts(data?.customMachine);
  }, [data]);

  const handleSave = (e) => {
    e.preventDefault();

    console.log(JSON.stringify(products));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProducts = generateRandomTemp(products);

    console.log(e.target.value);
  };

  /**
   * 지정된 최소, 최대 온도 범위를 이용해 랜덤한 온도를 제출하는 함수
   * @param {Object[]} products
   * @returns 랜덤한 온도가 저장된 Products 배열
   */
  const generateRandomTemp = (products) => {
    let randProducts = [];
    products.forEach(({ id, name, min, max }) => {
      const randomTemp = rand(Number(min), Number(max));

      randProducts.push({ id, randomTemp });
    });

    return randProducts;
  };

  /**
   * 최소, 최대값을 받아 해당 범위 내의 랜덤 값을 리턴하는 함수
   * @param {Number} min
   * @param {Number} max
   * @returns 해당 범위 내의 랜덤값
   */
  const rand = (min, max) => {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    return random;
  };

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <div className={styles.text}>기기 범위</div>
      </div>
      <form className={styles.form}>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <SetTemp product={product} />
            </li>
          ))}
      </form>
      <section className={styles.btnContainer}>
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          value={"AM"}
        >
          오전 기기 제출
        </button>
        <button className={styles.saveBtn} onClick={handleSave}>
          범위 저장
        </button>
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          value={"PM"}
        >
          오후 기기 제출
        </button>
      </section>
    </section>
  );
}
