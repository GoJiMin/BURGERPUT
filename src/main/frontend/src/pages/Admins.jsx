import React from "react";
import styles from "./Admins.module.css";
import { Link } from "react-router-dom";

export default function Admins() {
  return (
    <section className={styles.container}>
      <Link className={styles.wrapper} to='/select/machines'>
        {/* <img
          className={styles.pixel}
          src='/img/pixelmachine.png'
          alt='pixelmachine'
        /> */}
        <div className={styles.button}>기기 선택</div>
      </Link>
      <Link className={styles.wrapper} to='/select/foods'>
        {/* <img
          className={styles.pixel}
          src='/img/pixelfood.png'
          alt='pixelmachine'
        /> */}
        <div className={styles.button}>식품 선택</div>
      </Link>
      <Link className={styles.wrapper} to='/select/managers'>
        {/* <img
          className={styles.pixel}
          src='/img/pixelmanager.png'
          alt='pixelmachine'
        /> */}
        <div className={styles.button}>관리자 목록 수정</div>
      </Link>
    </section>
  );
}
