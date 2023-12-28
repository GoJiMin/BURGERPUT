import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomFoods } from "../api/Products";
import styles from "./CustomMachineTemp.module.css";
import SetTemp from "../components/SetTemp";

export default function CustomFoodTemp() {
  const { data } = useQuery(["customFoodsTemp"], () => getCustomFoods());
  const [products, setProducts] = useState("");

  useEffect(() => {
    setProducts(data?.customFood);
  }, [data]);

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <div className={styles.text}>식품 범위</div>
      </div>
      <form className={styles.form}>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <SetTemp product={product} />
            </li>
          ))}
      </form>
    </section>
  );
}
