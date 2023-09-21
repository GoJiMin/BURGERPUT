import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getManagerList, addManager, deleteManger } from "../api/Managers";

export function useManagers() {
  const queryClient = useQueryClient();
  const [manager, setManager] = useState("");
  const managersQuery = useQuery(["managers"], () => getManagerList(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const addMgr = useMutation(
    ({ manager }) => addManager([{ mgrname: manager }]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["managers"]);
      },
    }
  );

  const delMgr = useMutation(
    ({ id, manager }) => deleteManger([{ id, mgrname: manager }]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["managers"]);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addMgr.mutate({ manager });
    setManager("");
  };

  const handleChange = (e) => {
    setManager(e.target.value);
  };

  const handleDelete = (id, mgrname) => {
    delMgr.mutate({ id, mgrname });
  };

  return { managersQuery, manager, handleChange, handleSubmit, handleDelete };
}
