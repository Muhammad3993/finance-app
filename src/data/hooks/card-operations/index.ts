import useUserData from "@/constants/useUserData";
import { fetchCardOperations } from "@/data/api/card-operations";
import { useQuery } from "@tanstack/react-query";

export interface ICardOperation {
  id?: string;
  type: string;
  value: number;
}

export const useGetCardOperations = (cardId?: string) => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["cardOperations", useData.telegram_id, cardId],
    queryFn: () =>
      fetchCardOperations(`${useData.telegram_id}`, cardId as string),
  });
};
