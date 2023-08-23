import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomProducts from "../components/CustomProducts";
import styles from "./CustomMachines.module.css";
import { getMachines } from "../api/Products";

export default function InputMachines() {
  const { handleHidden } = useOutletContext();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    handleHidden();
    navigate("/");
  };
  const {
    isLoading,
    error,
    data: machines,
  } = useQuery(["machines"], () => getMachines(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(products);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {machines && (
        <section className={styles.section}>
          <div className={styles.title}>기기 선택</div>
          <div className={styles.wrapper}>
            <form
              id='customMachine'
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.products}>
                {machines &&
                  machines.map((machine) => (
                    <div key={machine.id}>
                      <CustomProducts
                        value={machine}
                        setProducts={setProducts}
                      />
                    </div>
                  ))}
              </div>
            </form>
            <div className={styles.buttons}>
              <button
                type='submit'
                form='customMachine'
                className={styles.button1}
              >
                저장
              </button>
              <button className={styles.button} onClick={handleClick}>
                취소
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
