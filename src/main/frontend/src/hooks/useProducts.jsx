import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMachines,
  setCustomMachines,
  getFoods,
  setCustomFoods,
  getCustomMachines,
  submitMachines,
  getCustomFoods,
  submitFoods,
} from "../api/Products";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function useMachines() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["machines"], getMachines, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const addCustomMachines = useMutation(
    ({ products }) => setCustomMachines(products),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customMachines"]);
      },
    }
  );

  return { productsQuery, addCustomMachines };
}

export function useFoods() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["foods"], getFoods, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const addCustomFoods = useMutation(
    ({ products }) => setCustomFoods(products),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customFoods"]);
      },
    }
  );

  return { productsQuery, addCustomFoods };
}

export function useCustomProducts({ location, handleHidden, setProductsTemp }) {
  const [selectManager, setSelectManager] = useState("");
  const [products, setProducts] = useState([]);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    handleHidden();
    navigate("/");
  };

  const handleWarning = () => {
    setWarning(true);
    setTimeout(() => {
      setWarning(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmptyTemp = products.some((product) => !product.temp);

    if (hasEmptyTemp || selectManager.length === 0) {
      handleWarning();
      return;
    } else {
      setProductsTemp({ selectManager, products, location });
    }
  };

  return {
    handleClick,
    selectManager,
    setSelectManager,
    handleSubmit,
    warning,
    products,
    setProducts,
  };
}

export function useCustomMachines() {
  const productsQuery = useQuery(["customMachines"], getCustomMachines, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const setProductsTemp = ({ selectManager, products, location }) =>
    submitMachines({
      mgrname: selectManager?.label,
      customMachine: products,
      time: location?.state,
    });

  return { productsQuery, setProductsTemp };
}

export function useCustomFoods() {
  const productsQuery = useQuery(["customFoods"], getCustomFoods, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const setProductsTemp = ({ selectManager, products, location }) =>
    submitFoods({
      mgrname: selectManager?.label,
      customFood: products,
      time: location?.state,
    });

  return { productsQuery, setProductsTemp };
}
