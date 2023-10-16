import { useState } from "react";

export function customProductsHook() {
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setChecked((prev) => !prev);
    handleCheck(e.target.checked);
  };
  const deleteProducts = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };
  const handleCheck = (isChecked) => {
    if (isChecked) {
      setProducts((prev) => [...prev, { id, isChecked }]);
    } else {
      deleteProducts(id);
    }
  };

  return { checked, handleChange };
}
