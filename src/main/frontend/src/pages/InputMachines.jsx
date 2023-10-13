import React, { useEffect, useState } from "react";
import InputProducts from "./../components/InputProducts";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import styles from "./InputMachines.module.css";
import { useCustomMachines } from "./../hooks/useProducts";
import Banner from "./../components/Banner";
import ManagerList from "./../components/ManagerList";

export default function InputMachines() {
  const location = useLocation();
  const [selectManager, setSelectManager] = useState("");
  const { handleHidden } = useOutletContext();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);

  const {
    productsQuery: { isLoading, error, data },
    setProductsTemp,
  } = useCustomMachines();

  useEffect(() => {
    setProducts(data?.customMachine);
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
      console.log(JSON.stringify(products));
    }
  };

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
