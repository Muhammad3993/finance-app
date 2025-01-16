import useUserData from "@/constants/useUserData";
import {
  deleteCardData,
  editCardData,
  fetchCard,
  fetchCards,
} from "@/data/api/cards";
import { ICards } from "@/pages/bills/Bills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const useData = useUserData();

  return useMutation({
    mutationFn: (cardId?: string) =>
      deleteCardData(`${useData.telegram_id}`, cardId),
  });
};
