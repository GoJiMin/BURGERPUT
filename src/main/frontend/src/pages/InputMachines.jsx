import React, { useEffect, useState } from "react";
import InputProducts from "./../components/InputProducts";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import styles from "./InputMachines.module.css";
import { useCustomMachines } from "./../hooks/useProducts";
import Banner from "./../components/Banner";
import ManagerList from "./../components/ManagerList";
import Button from "../components/Button";

export default function InputMachines() {
  const location = useLocation();
  const { handleHidden } = useOutletContext();

  const {
    productsQuery: { isLoading, error, data },
    handleSubmit,
    warning,
    products,
    setProducts,
    selectManager,
    setSelectManager,
    handleClick,
  } = useCustomMachines({ location, handleHidden });

  useEffect(() => {
    setProducts(data?.customMachine);
  }, [data]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {products && (
        <section className={styles.section}>
          <div className={styles.title}>
            <div className={styles.text}>기기 입력</div>
            {data?.mgrList && (
              <ManagerList
                className={styles.mgrList}
                mgrList={data.mgrList}
                x
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
            <div>
              {products.length === 0 ? (
                <div className={styles.empty}>
                  먼저 기기 선택을 완료해주세요.
                </div>
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
            </div>
          </form>
          <div className={styles.buttons}>
            <Button
              text={"저장"}
              type={"submit"}
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
