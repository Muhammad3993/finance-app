import { fetchAllCategories } from "@/data/api/categories";
import { useQuery } from "@tanstack/react-query";

export interface ICategory {
  id: string;
  name: string;
}

const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchAllCategories(),
  });
};

export default useGetCategories;
