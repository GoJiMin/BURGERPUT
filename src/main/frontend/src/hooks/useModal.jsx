import { submitResultFoods, submitResultMachines } from "../api/Products";

export function useModal({ machine, food }) {
  const close = () => {
    setResult(false);
  };

  const confirm = () => {
    machine && submitResultMachines();
    food && submitResultFoods();
    setResult(false);
  };

  return { close, confirm };
}