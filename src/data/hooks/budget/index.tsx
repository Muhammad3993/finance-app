import useUserData from "@/constants/useUserData";
import { editBudget, fetchBudget } from "@/data/api/budget";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface IBudget {
  id?: string;
  value?: number;
}

export const useGetBudget = () => {
  const userData = useUserData();
  return useQuery({
    queryKey: ["budget", userData.telegram_id],
    queryFn: () => fetchBudget(`${userData.telegram_id}`),
  });
};

export const useEditBudget = () => {
  const userData = useUserData();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardData }: { cardData: IBudget }) =>
      editBudget({ cardData }, `${userData.telegram_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error: Error) => {
      console.error("Error updating card:", error);
    },
  });
};
