import React, { useEffect } from "react";
import styles from "./CustomMachineTemp.module.css";
import SetTemp from "../components/SetTemp";
import { useCheatMachines, useCheatProducts } from "../hooks/useCheat";

export default function CustomMachineTemp() {
  const { data } = useCheatMachines();
  const { handleSave, handleSubmit, setProducts, products } =
    useCheatProducts();

  useEffect(() => {
    setProducts(data?.customMachine);
  }, [data]);

  console.log(products);

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
