import React, { useEffect } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import {
  useCustomFoods,
  useCustomMachines,
  useCustomProducts,
} from "./../hooks/useProducts";
import Banner from "./../components/Banner";
import InputProducts from "./../components/InputProducts";
import ManagerList from "./../components/ManagerList";
import Button from "../components/Button";
import styles from "./InputFoods.module.css";
import Modal from "../components/Modal";

export default function InputFoods() {
  const location = useLocation();
  const { handleHidden } = useOutletContext();

  const {
    productsQuery: { isLoading, error, data },
    setProductsTemp,
  } = useCustomFoods();

  const {
    handleSubmit,
    warning,
    products,
    result,
    loading,
    setProducts,
    setResult,
    selectManager,
    setSelectManager,
    handleClick,
  } = useCustomProducts({ location, handleHidden, setProductsTemp });

  useEffect(() => {
    setProducts(data?.customFood);
  }, [data]);

  console.log(result);

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
            {loading && (
              <Banner
                type={"loading"}
                text={
                  <img
                    src='/spinner/spinner.gif'
                    width='60%'
                    style={{ paddingTop: "2px" }}
                  />
                }
              />
            )}
            {result.result === "true" && (
              <Modal
                title={"제출"}
                food={true}
                setResult={setResult}
                component={"값이 정상적으로 입력 되었습니다. 제출하시겠습니까?"}
              />
            )}
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
