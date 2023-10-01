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
