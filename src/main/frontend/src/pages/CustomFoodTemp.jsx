import React, { useEffect } from "react";
import styles from "./CustomMachineTemp.module.css";
import SetTemp from "../components/SetTemp";
import { useCheatFoods, useCheatProducts } from "../hooks/useCheat";
import ManagerList from "../components/ManagerList";
import Banner from "../components/Banner";
import Modal from "../components/Modal";

export default function CustomMachineTemp() {
  const { submitCustomTemp, data, setCustomTemp } = useCheatFoods();
  const {
    handleSave,
    handleSubmit,
    setProducts,
    setSelectManager,
    setResult,
    selectManager,
    products,
    success,
    loading,
    result,
  } = useCheatProducts({
    submitCustomTemp,
    setCustomTemp,
  });

  useEffect(() => {
    setProducts(data?.customFood);
  }, [data]);

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <div className={styles.text}>식품 범위</div>
        {data?.mgrList && (
          <ManagerList
            className={styles.mgrList}
            mgrList={data.mgrList}
            selectManager={selectManager}
            setSelectManager={setSelectManager}
          />
        )}
      </div>
      <form className={styles.form}>
        {success && <Banner text={"지정한 범위를 저장했습니다."} />}
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
            machine={true}
            setResult={setResult}
            component={"값이 정상적으로 입력 되었습니다. 제출하시겠습니까?"}
          />
        )}
        {result.result === "false" && (
          <Modal
            title={"에러 발생"}
            error={true}
            submit={handleSubmit}
            setResult={setResult}
            component={"입력에 실패했습니다. 다시 시도해주세요."}
          />
        )}
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <SetTemp product={product} />
            </li>
          ))}
      </form>
      <section className={styles.btnContainer}>
        <button className={styles.saveBtn} onClick={handleSave}>
          범위 저장
        </button>
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          value={"AM"}
        >
          오전 식품 제출
        </button>
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          value={"PM"}
        >
          오후 식품 제출
        </button>
      </section>
    </section>
  );
}
