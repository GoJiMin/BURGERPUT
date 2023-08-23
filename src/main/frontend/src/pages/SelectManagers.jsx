import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./SelectManagers.module.css";
// import { useQuery } from "@tanstack/react-query";
// import { getManagers } from "../api/GetManagers";
import { PiTrashBold } from "react-icons/pi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineEnter } from "react-icons/ai";

export default function SelectManagers() {
  const { handleHidden } = useOutletContext();
  const navigate = useNavigate();
  const [manager, setManager] = useState();
  const [managers, setManagers] = useState(initialManagers);
  // 아래는 실제 매니저 값을 데이터베이스에서 api를 통해 가져오는 로직임. 현재는 사용하지 않음.
  // const {
  //   error,
  //   isLoading,
  //   data: initialManagers,
  // } = useQuery(["managers"], () => getManagers());
  const handleClick = () => {
    handleHidden();
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setManagers((prev) => [...prev, manager]);
    setManager("");
  };

  const handleChange = (e) => {
    setManager(e.target.value);
  };

  const handleDelete = (value) => {
    setManagers(managers.filter((m) => m !== value));
  };
  return (
    <>
      <section className={styles.section}>
        <div className={styles.header}>
          <div className={styles.title}>관리자 목록 수정</div>
          <RiArrowGoBackFill
            className={styles.header__button}
            onClick={handleClick}
          />
        </div>

        <ul className={styles.box}>
          {managers &&
            managers.map((value, index) => (
              <div className={styles.card}>
                <li className={styles.card__name} key={index}>
                  {value}
                </li>
                <button
                  onClick={() => handleDelete(value)}
                  className={styles.cover}
                >
                  <PiTrashBold />
                </button>
              </div>
            ))}
        </ul>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type='text'
            value={manager}
            onChange={handleChange}
          />
          <button className={styles.button}>
            <AiOutlineEnter />
          </button>
        </form>
      </section>
    </>
  );
}

const initialManagers = ["오현정", "천상연", "유예지", "강다이"];
