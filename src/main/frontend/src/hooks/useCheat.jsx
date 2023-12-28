import { useState } from "react";
import { getCustomMachines } from "../api/Products";
import { useQuery } from "@tanstack/react-query";
import { useRandomTemp } from "./useRandomTemp";

export function useCheatProducts() {
  const [products, setProducts] = useState("");
  const { generateRandomTemp } = useRandomTemp();

  const handleSave = (e) => {
    e.preventDefault();

    console.log(JSON.stringify(products));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProducts = generateRandomTemp(products);

    console.log(newProducts);
  };

  return { handleSave, handleSubmit, products, setProducts };
}

export function useCheatMachines() {
  const { data } = useQuery(["customMachinesTemp"], () => getCustomMachines());

  return { data };
}
