import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./SelectManagers.module.css";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { PiTrashBold } from "react-icons/pi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineEnter } from "react-icons/ai";
import { addManger, deleteManger, getMangerList } from "../api/Managers";

export default function SelectManagers() {
  const { handleHidden } = useOutletContext();
  const navigate = useNavigate();
  const [manager, setManager] = useState("");
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    data: initialManagers,
  } = useQuery(["managers"], () => getMangerList());

  const addMgr = useMutation(
    ({ manager }) => addManger([{ mgrname: manager }]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["managers"]);
      },
    }
  );

  const delMgr = useMutation(
    ({ id, mgrname }) => deleteManger([{ id, mgrname }]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["managers"]);
      },
    }
  );

  const handleClick = () => {
    handleHidden();
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (manager.trim().length === 0) {
      return;
    }
    console.log(JSON.stringify({ mgrname: manager }));
    addMgr.mutate({ manager });
    setManager("");
  };

  const handleChange = (e) => {
    setManager(e.target.value);
  };

  const handleDelete = (id, mgrname) => {
    delMgr.mutate({ id, mgrname });
  };
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {initialManagers && (
        <section className={styles.section}>
          <div className={styles.header}>
            <div className={styles.title}>관리자 목록 수정</div>
            <RiArrowGoBackFill
              className={styles.header__button}
              onClick={handleClick}
            />
          </div>

          <ul className={styles.box}>
            {initialManagers &&
              initialManagers.map(({ id, mgrname }) => (
                <div className={styles.card}>
                  <li className={styles.card__name} key={id}>
                    {mgrname}
                  </li>
                  <button
                    onClick={() => handleDelete(id, mgrname)}
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
      )}
    </>
  );
}
