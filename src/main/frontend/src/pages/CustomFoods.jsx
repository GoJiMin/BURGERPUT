import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomProducts from "../components/CustomProducts";
import styles from "./CustomMachines.module.css";
import { useFoods } from "../hooks/useProducts";

export default function CustomFoods() {
  const { handleHidden } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const handleClick = () => {
    handleHidden();
    navigate("/");
  };

  const {
    productsQuery: { isLoading, error, data: foods },
    addCustomFoods,
  } = useFoods();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomFoods.mutate(
      { products },
      {
        onSuccess: () => {
          setSuccess("식품 선택이 완료되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        },
      }
    );
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
