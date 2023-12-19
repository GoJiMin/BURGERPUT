import React, { useState } from "react";
import styles from "./Modal.module.css";
import Confirm from "./Confirm";
import { submitResult } from "../api/Products";

export default function Modal({ title, component }) {
  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    setIsOpen(false);
  };

  const confirm = () => {
    submitResult();
    setIsOpen(false);
  };

  return (
    <section className={styles.section}>
      {isOpen && (
        <Confirm
          title={title}
          content={component}
          close={close}
          confirm={confirm}
        />
      )}
    </section>
  );
}
