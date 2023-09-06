import React, { useState } from "react";
import styles from "./Admins.module.css";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function Admins() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: "onChange" });
  const [hide, setHide] = useState(true);
  const { handleHidden } = useOutletContext();
  const navigate = useNavigate();
  const handleClick = () => {
    handleHidden();
    navigate("/");
  };
  console.log("re-render");

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.title}>관리자 정보 입력</div>
      </div>
      <form
        id='inputForm'
        className={styles.form}
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(data));
        })}
      >
        <div className={styles.inputBox}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <div className={styles.wrapper}>
            <input
              className={styles.input}
              id='email'
              type='email'
              placeholder='example@email.com'
              autoComplete='off'
              aria-invalid={
                isSubmitted ? (errors.email ? true : false) : undefined
              }
              {...register("email", {
                required: "이메일은 필수 입력 사항입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            {errors.email && (
              <small className={styles.error} role='alert'>
                {errors.email.message}
              </small>
            )}
          </div>
        </div>

        <div className={styles.inputBox}>
          <label className={styles.label} htmlFor='id'>
            ID
          </label>
          <div className={styles.wrapper}>
            <input
              className={styles.input}
              id='id'
              type='id'
              placeholder='your ID'
              autoComplete='off'
              {...register("id", {
                required: "아이디는 필수 입력 사항입니다.",
                pattern: {
                  value: /^[a-zA-z0-9]{4,12}$/,
                  message: "아이디 형식에 맞지 않습니다.",
                },
              })}
            />
            {errors.id && (
              <small className={styles.error} role='alert'>
                {errors.id.message}
              </small>
            )}
          </div>
        </div>

        <div className={styles.inputBox}>
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
          <div className={styles.wrapper}>
            <input
              className={styles.input}
              id='password'
              type={hide ? `password` : "text"}
              placeholder='********'
              autoComplete='off'
              {...register("password", {
                required: "비밀번호는 필수 입력 사항입니다.",
                minLength: {
                  value: 8,
                  message: "비밀번호 형식에 맞지 않습니다.",
                },
              })}
            />
            {hide ? (
              <button
                className={styles.toggleButton}
                onClick={() => setHide(false)}
              >
                <AiOutlineEye />
              </button>
            ) : (
              <button
                className={styles.toggleButton}
                onClick={() => setHide(true)}
              >
                <AiOutlineEyeInvisible />
              </button>
            )}
          </div>
          {errors.password && (
            <small className={styles.error} role='alert'>
              {errors.password.message}
            </small>
          )}
        </div>
      </form>
      <div className={styles.buttons}>
        <button
          type='submit'
          form='inputForm'
          disabled={isSubmitting}
          className={styles.button1}
        >
          저장
        </button>
        <button className={styles.button} onClick={handleClick}>
          취소
        </button>
      </div>
    </section>
  );
}
