import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomProducts from "../components/CustomProducts";
import styles from "./CustomMachines.module.css";
import { getCustomFoods, getFoods, setCustomFoods } from "../api/Products";

export default function CustomFoods() {
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
    data: foods,
  } = useQuery(["foods"], () => getFoods(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(products);
    setCustomFoods(products);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {foods && (
        <section className={styles.section}>
          <div className={styles.title}>식품 선택</div>
          <div className={styles.wrapper}>
            <form
              id='customFoods'
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.products}>
                {foods &&
                  foods.map((food) => (
                    <div key={food.id}>
                      <CustomProducts value={food} setProducts={setProducts} />
                    </div>
                  ))}
              </div>
            </form>
            <div className={styles.buttons}>
              <button
                type='submit'
                form='customFoods'
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
