import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./SelectManagers.module.css";
import { PiTrashBold } from "react-icons/pi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineEnter } from "react-icons/ai";
import { useManagers } from "../hooks/useManagers";

export default function SelectManagers() {
  const { handleHidden } = useOutletContext();
  const navigate = useNavigate();

  const {
    managersQuery: { isLoading, error, data: initialManagers },
    manager,
    handleChange,
    handleSubmit,
    handleDelete,
  } = useManagers();

  const handleClick = () => {
    handleHidden();
    navigate("/");
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
                    onClick={() => {
                      handleDelete(id, mgrname);
                      console.log("clicked");
                    }}
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
