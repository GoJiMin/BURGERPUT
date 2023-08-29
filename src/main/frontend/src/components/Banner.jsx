import React from "react";
import styles from "./Banner.module.css";

export default function Banner({ text }) {
  return <div className={styles.banner}>{text}</div>;
}
