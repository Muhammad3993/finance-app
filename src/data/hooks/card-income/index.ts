import useUserData from "@/constants/useUserData";
import { fetchCardIncomes } from "@/data/api/card-income";
import { useQuery } from "@tanstack/react-query";

export interface ICardOperation {
  id?: string;
  type: string;
  value: number;
}

export const useGetCardIncomes = (cardId?: string) => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["cardIncomes", useData.telegram_id, cardId],
    queryFn: () => fetchCardIncomes(`${useData.telegram_id}`, cardId as string),
  });
};
