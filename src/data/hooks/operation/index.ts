import useUserData from "@/constants/useUserData";
import { fetchOperations } from "@/data/api/operations";
import { useQuery } from "@tanstack/react-query";

export const useOperation = (type?: string, cardName?: string) => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["operations", useData.telegram_id, type, cardName],
    queryFn: () => fetchOperations(`${useData.telegram_id}`, type, cardName),
  });
};
