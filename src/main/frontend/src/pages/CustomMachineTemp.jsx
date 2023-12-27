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

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <div className={styles.text}>기기 범위</div>
      </div>
      {products &&
        products.map((product) => (
          <li key={product.id}>
            <SetTemp product={product} />
          </li>
        ))}
    </section>
  );
}
