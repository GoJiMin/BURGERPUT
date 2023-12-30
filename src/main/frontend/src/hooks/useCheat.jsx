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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRandomTemp } from "./useRandomTemp";

export function useCheatProducts({ setCustomTemp, submitCustomTemp }) {
  const [products, setProducts] = useState("");
  const [selectManager, setSelectManager] = useState("");
  const [warning, setWarning] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const { generateRandomTemp } = useRandomTemp();

  const handleWarning = (type) => {
    type === "missing" && setWarning("missing");
    type === "manager" && setWarning("manager");
    setTimeout(() => {
      setWarning(null);
    }, 1500);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const hasMissing = products.some((product) => product.min === 999);

    if (hasMissing) {
      handleWarning();
      return;
    } else {
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProducts = generateRandomTemp(products);
    const manager = selectManager?.label;
    const time = e.target.value;

    if (!manager) {
      handleWarning("manager");
      return;
    } else {
      setLoading(true);
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
    }
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
    warning,
    loading,
    result,
  };
}

export function useCheatMachines() {
  const { data } = useQuery(["customMachinesTemp"], getCustomTempMachine, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const queryClient = useQueryClient();

  const setCustomTemp = useMutation(
    ({ products }) => setCustomTempMachine(products),
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
  const { data } = useQuery(["customFoodsTemp"], getCustomTempFood, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const queryClient = useQueryClient();

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
