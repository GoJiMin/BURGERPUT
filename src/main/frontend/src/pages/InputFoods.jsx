import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomFoods } from "../api/GetProducts";
import InputProducts from "../components/InputProducts";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./InputFoods.module.css";

export default function InputFoods() {
  const { handleHidden } = useOutletContext();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);

  const handleWarning = () => {
    setWarning(true);
    setTimeout(() => {
      setWarning(false);
    }, 1500);
  };
  const handleClick = () => {
    handleHidden();
    navigate("/");
  };

  const { data: customFoods } = useQuery(
    ["customFoods"],
    () => getCustomFoods(),
    { staleTime: Infinity, cacheTime: Infinity }
  );

  useEffect(() => {
    setProducts(customFoods);
  }, [customFoods]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmptyTemp = products.some((product) => !product.temp);

    if (hasEmptyTemp) {
      handleWarning();
      return;
    } else {
      console.log(products);
    }
  };
  return (
    <>
      {products && (
        <section>
          <div className={styles.title}>식품 입력</div>
          <form
            className={styles.form}
            id='inputMachine'
            onSubmit={handleSubmit}
          >
            {warning && (
              <p className={styles.warning}>비어있는 항목이 존재합니다.</p>
            )}
            <div>
              {products &&
                products.map((product) => (
                  <div
                    className={styles.product}
                    key={product.id}
                    onSubmit={handleSubmit}
                  >
                    <InputProducts product={product} />
                  </div>
                ))}
            </div>
          </form>
          <div className={styles.buttons}>
            <button
              type='submit'
              form='inputMachine'
              className={styles.button1}
            >
              저장
            </button>
            <button className={styles.button} onClick={handleClick}>
              취소
            </button>
          </div>
        </section>
      )}
    </>
  );
}
