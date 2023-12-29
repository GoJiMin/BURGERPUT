import { useState } from "react";
import {
  getCustomFoods,
  getCustomMachines,
  getCustomTempFood,
  getCustomTempMachine,
  setCustomMachines,
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

    // setCustomTemp.mutate(
    //   { products },
    //   {
    //     onSuccess: () => {
    //       setSuccess(true);
    //       setTimeout(() => {
    //         setSuccess(false);
    //       }, 4000);
    //     },
    //   }
    // );
    console.log(products);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const newProducts = generateRandomTemp(products);
    const manager = selectManager?.label;
    const time = e.target.value;

    submitCustomTemp({
      manager,
      newProducts,
      time,
    })
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
  const { data } = useQuery(["customMachinesTemp"], getCustomTempMachine);

  const setCustomTemp = useMutation(
    ({ products }) => setCustomMachines(products),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customMachinesTemp"]);
      },
    }
  );

  const submitCustomTemp = ({ manager, newProducts, time }) =>
    submitMachines({
      mgrname: manager,
      customMachine: newProducts,
      time: time,
    });

  return { data, setCustomTemp, submitCustomTemp };
}

export function useCheatFoods() {
  const { data } = useQuery(["customFoodsTemp"], getCustomTempFood);

  const setCustomTemp = useMutation(
    ({ products }) => setCustomTempFood(products),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customFoodsTemp"]);
      },
    }
  );

  const submitCustomTemp = ({ manager, newProducts, time }) =>
    submitFoods({
      mgrname: manager,
      customFood: newProducts,
      time: time,
    });

  return { data, setCustomTemp, submitCustomTemp };
}
