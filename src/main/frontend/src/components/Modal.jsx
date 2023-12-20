import React from "react";
import styles from "./Modal.module.css";
import Confirm from "./Confirm";
import { submitResultFoods, submitResultMachines } from "../api/Products";

export default function Modal({ title, component, setResult, machine, food }) {
  const close = () => {
    setResult(false);
  };

  const confirm = () => {
    machine && submitResultMachines();
    food && submitResultFoods();
    setResult(false);
  };

  return (
    <section className={styles.section}>
      <Confirm
        title={title}
        content={component}
        close={close}
        confirm={confirm}
      />
    </section>
  );
}
