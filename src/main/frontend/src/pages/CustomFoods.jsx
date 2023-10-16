import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./CustomMachines.module.css";
import { useFoods } from "./../hooks/useProducts";
import CustomProducts from "./../components/CustomProducts";
import Banner from "./../components/Banner";
import Button from "../components/Button";

export default function CustomFoods() {
  const { handleHidden } = useOutletContext();

  const navigate = useNavigate();
  const handleClick = () => {
    handleHidden();
    navigate("/");
  };

  const {
    productsQuery: { isLoading, error, data: foods },
    setProducts,
    handleSubmit,
    success,
  } = useFoods();

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
              {success && <Banner text={"식품 선택이 완료되었습니다."} />}
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
              <Button text={"저장"} form={"customFoods"} />
              <Button text={"취소"} handleFunction={handleClick} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
