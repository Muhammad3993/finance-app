import { fetchAllCurriense } from "@/data/api/currencies";
import { useQuery } from "@tanstack/react-query";

export interface ICurrency {
  name?: string;
  code?: string;
  intl?: string;
  symbol?: string;
  value?: number;
}

const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: () => fetchAllCurriense(),
  });
};

export default useCurrencies;
