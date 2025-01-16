import useUserData from "@/constants/useUserData";
import { editCardData, fetchCard, fetchCards } from "@/data/api/cards";
import { db } from "@/firebaseConfig";
import { ICards } from "@/pages/bills/Bills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

export const useGetCards = () => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["cards", useData.telegram_id],
    queryFn: () => fetchCards(`${useData.telegram_id}`),
  });
};

export const useGetCard = (cardId?: string) => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["card", useData.telegram_id, cardId],
    queryFn: () => fetchCard(`${useData.telegram_id}`, cardId as string),
  });
};

export const useEditCard = () => {
  const userData = useUserData();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardData, bill }: { cardData: ICards; bill: string }) =>
      editCardData({ cardData, bill }, `${userData.telegram_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card"] });
    },
    onError: (error: Error) => {
      console.error("Error updating card:", error);
    },
  });
};

export const useDeleteCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const useData = useUserData();

  const deleteCardById = async (cardId: string | undefined) => {
    try {
      setIsLoading(true);

      const userDocRef = collection(
        db,
        "users",
        `${useData.telegram_id}`,
        "cards",
      );

      const cardDocRef = doc(userDocRef, cardId);

      await deleteDoc(cardDocRef);

      setIsLoading(false);
    } catch (e) {
      console.error("Error deleting card:", e);
      setIsLoading(false);
    }
  };

  return { deleteCardById, isLoading };
};
