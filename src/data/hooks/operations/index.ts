import useUserData from "@/constants/useUserData";
import {
  addOperation,
  fetchOperation,
  fetchOperations,
} from "@/data/api/operations";
import { db } from "@/firebaseConfig";
import { IOperationData } from "@/pages/add-expense/AddExpense";
import { useMutation, useQuery } from "@tanstack/react-query";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

export const useGetOperations = (
  type?: string,
  cardName?: string,
  planId?: string,
) => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["operations", useData.telegram_id, type, cardName],
    queryFn: () =>
      fetchOperations(`${useData.telegram_id}`, type, cardName, planId),
  });
};

export const useGetOperation = (operationId: string) => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["operationDetails", useData.telegram_id, operationId],
    queryFn: () => fetchOperation(`${useData.telegram_id}`, operationId),
  });
};

export const useDeleteOperation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const useData = useUserData();

  const deleteOperationById = async (operationId: string | undefined) => {
    try {
      setIsLoading(true);

      const userDocRef = collection(
        db,
        "users",
        `${useData.telegram_id}`,
        "operations",
      );

      const cardDocRef = doc(userDocRef, operationId);

      await deleteDoc(cardDocRef);

      setIsLoading(false);
    } catch (e) {
      console.error("Error deleting card:", e);
      setIsLoading(false);
    }
  };

  return { deleteOperationById, isLoading };
};

export const useAddOperation = () => {
  const useData = useUserData();

  return useMutation({
    mutationFn: (operationData: IOperationData) =>
      addOperation(`${useData.telegram_id}`, operationData),
  });
};
