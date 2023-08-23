import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomProducts from "../components/CustomProducts";
import styles from "./CustomMachines.module.css";
import { useMachines } from "../hooks/useProducts";

export default function InputMachines() {
  const { handleHidden } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const handleClick = () => {
    handleHidden();
    navigate("/");
  };

  const {
    productsQuery: { isLoading, error, data: machines },
    addCustomMachines,
  } = useMachines();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomMachines.mutate(
      { products },
      {
        onSuccess: () => {
          setSuccess("기기 선택이 완료되었습니다.");
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
      {machines && (
        <section className={styles.section}>
          <div className={styles.title}>기기 선택</div>
          <div className={styles.wrapper}>
            <form
              id='customMachine'
              className={styles.form}
              onSubmit={handleSubmit}
            >
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
              <button
                type='submit'
                form='customMachine'
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
