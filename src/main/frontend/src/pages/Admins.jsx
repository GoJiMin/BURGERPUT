import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Admins.module.css";

export default function Admins() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  return (
    <section>
      <form
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(data));
        })}
      >
        <label htmlFor='email'>이메일</label>
        <input
          id='email'
          type='email'
          placeholder='test@email.com'
          aria-invalid={isSubmitted ? (errors.email ? true : false) : undefined}
          {...register("email", {
            required: "이메일은 필수 입력 사항입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small role='alert'>{errors.email.message}</small>}
        <label htmlFor='id'>아이디</label>
        <input
          id='id'
          type='id'
          placeholder='your ID'
          {...register("id", {
            required: "아이디는 필수 입력 사항입니다.",
            pattern: {
              value: /^[a-zA-z0-9]{4,12}$/,
              message: "아이디 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.id && <small role='alert'>{errors.id.message}</small>}
        <button type='submit' disabled={isSubmitting}>
          제출
        </button>
      </form>
    </section>
  );
}
