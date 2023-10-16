import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomProducts from "./../components/CustomProducts";
import styles from "./CustomMachines.module.css";
import { useMachines } from "./../hooks/useProducts";
import Banner from "./../components/Banner";
import Button from "../components/Button";

export default function InputMachines() {
  const { handleHidden } = useOutletContext();
  const navigate = useNavigate();
  const handleClick = () => {
    handleHidden();
    navigate("/");
  };

  const {
    productsQuery: { isLoading, error, data: machines },
    handleSubmit,
    setProducts,
    success,
  } = useMachines();

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
              {success && <Banner text={"기기 선택이 완료되었습니다."} />}
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
              <Button text={"저장"} type={"submit"} form={"customMachine"} />
              <Button text={"취소"} handleFunction={handleClick} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
