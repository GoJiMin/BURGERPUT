import React, { useEffect, useState } from "react";
import InputProducts from "./../components/InputProducts";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import styles from "./InputFoods.module.css";
import { useCustomFoods } from "./../hooks/useProducts";
import Banner from "./../components/Banner";
import ManagerList from "./../components/ManagerList";
import Button from "../components/Button";

export default function InputFoods() {
  const location = useLocation();
  const [selectManager, setSelectManager] = useState("");
  const { handleHidden } = useOutletContext();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);

  const {
    productsQuery: { isLoading, error, data },
    setProductsTemp,
  } = useCustomFoods();

  useEffect(() => {
    setProducts(data?.customFood);
  }, [data]);

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

    if (hasEmptyTemp || selectManager.length === 0) {
      handleWarning();
      return;
    } else {
      setProductsTemp({ selectManager, products, location });
    }
  };

  return (
    <>
      {products && (
        <section className={styles.section}>
          <div className={styles.title}>
            <div className={styles.text}>식품 입력</div>
            {data?.mgrList && (
              <ManagerList
                className={styles.mgrList}
                mgrList={data.mgrList}
                selectManager={selectManager}
                setSelectManager={setSelectManager}
              />
            )}
          </div>
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
            <Button
              text={"저장"}
              form={"inputMachine"}
              disabled={products.length === 0 ? true : false}
            />
            <Button text={"취소"} handleFunction={handleClick} />
          </div>
        </section>
      )}
    </>
  );
}
