import { useState } from "react";

export function useInputProducts() {
  const [temp, setTemp] = useState("");
  const [warning, setWarning] = useState(false);
  const [missing, setMissing] = useState(false);

  const handleChange = (e) => {
    setTemp(e.target.value);
    setTimeout(() => {
      if (
        parseInt(e.target.value) > parseInt(max) ||
        parseInt(e.target.value) < parseInt(min)
      ) {
        setWarning(true);
        setTimeout(() => {
          setWarning(false);
          setTemp("");
        }, 2300);
      }
    }, 2000);
  };

  const handleClick = () => {
    if (missing) {
      setTemp("");
      setMissing((prev) => !prev);
      return;
    }
    setTemp("999");
    setMissing((prev) => !prev);
  };

  return { temp, warning, handleChange, handleClick, missing };
}
