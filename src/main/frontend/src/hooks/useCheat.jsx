import { useState } from "react";
import {
  getCustomFoods,
  getCustomMachines,
  setCustomTempFood,
  setCustomTempMachine,
  submitFoods,
  submitMachines,
} from "../api/Products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRandomTemp } from "./useRandomTemp";

export function useCheatProducts({ setCustomTemp, submitCustomTemp }) {
  const [products, setProducts] = useState("");
  const [selectManager, setSelectManager] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const { generateRandomTemp } = useRandomTemp();

  const handleSave = (e) => {
    e.preventDefault();

    setCustomTemp.mutate(
      { products },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);
        },
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const newProducts = generateRandomTemp(products);
    const manager = selectManager?.label;
    const time = e.target.value;

    const result = { manager, newProducts, time };

    submitCustomTemp(result)
      .then((res) => {
        setResult(res.data);
      })
      .finally(() => setLoading(false))
      .catch(console.error);
  };

  return {
    handleSave,
    handleSubmit,
    setProducts,
    setSelectManager,
    setResult,
    selectManager,
    products,
    success,
    loading,
    result,
  };
}

export function useCheatMachines() {
  const { data } = useQuery(["customMachines"], () => getCustomMachines());

  const setCustomTemp = useMutation(
    ({ products }) => setCustomTempMachine(products),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customMachines"]);
      },
    }
  );

  const submitCustomTemp = ({ manager, newProducts, time }) => {
    submitMachines({
      mgrname: manager,
      customMachine: newProducts,
      time: time,
    });
  };

  return { data, setCustomTemp, submitCustomTemp };
}

export function useCheatFoods() {
  const { data } = useQuery(["customFoods"], () => getCustomFoods());

  const setCustomTemp = useMutation(
    ({ products }) => setCustomTempFood(products),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customFoods"]);
      },
    }
  );

  const submitCustomTemp = ({ manager, newProducts, time }) => {
    submitFoods({
      mgrname: manager,
      customFood: newProducts,
      time: time,
    });
  };

  return { data, setCustomTemp, submitCustomTemp };
}
