import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomFoods } from "../api/GetProducts";
import InputProducts from "../components/InputProducts";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./InputFoods.module.css";
import { useCustomFoods } from "../hooks/useProducts";
import Banner from "../components/Banner";

export default function InputFoods() {
  const { handleHidden } = useOutletContext();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);

  const {
    productsQuery: {
      isLoading,
      error,
      data: { customFood, mgrList },
    },
    setProductsTemp,
  } = useCustomFoods();

  useEffect(() => {
    setProducts(customFood);
  }, [customFood]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmptyTemp = products.some((product) => !product.temp);

    if (hasEmptyTemp) {
      handleWarning();
      return;
    } else {
      setProductsTemp(products);
    }
  };

  return (
    <>
      {products && (
        <section className={styles.section}>
          <div className={styles.title}>식품 입력</div>
          <form
            className={styles.form}
            id='inputMachine'
            onSubmit={handleSubmit}
          >
            {warning && <Banner text={"비어있는 항목이 존재합니다."} />}
            {products.length === 0 ? (
              <div className={styles.empty}>먼저 식품 선택을 완료해주세요.</div>
            ) : (
              products.map((product) => (
                <div
                  className={styles.product}
                  key={product.id}
                  onSubmit={handleSubmit}
                >
                  <InputProducts product={product} />
                </div>
              ))
            )}
          </form>
          <div className={styles.buttons}>
            <button
              type='submit'
              form='inputMachine'
              className={styles.button1}
              disabled={products.length === 0 ? true : false}
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
