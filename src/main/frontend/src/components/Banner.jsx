import React from "react";
import styles from "./Banner.module.css";

export default function Banner({ text }, type) {
  return (
    <div
      className={type === "loading" ? `${styles.banner}` : `${styles.loading}`}
    >
      {text}
    </div>
  );
}
