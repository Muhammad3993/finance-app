import useUserData from "@/constants/useUserData";
import { createPlan, editPlan, fetchPlan, fetchPlans } from "@/data/api/plans";
import { ICards } from "@/pages/bills/Bills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICategory } from "../categories";

export interface IPlan {
  id?: string;
  card: ICards | null;
  category: ICategory | null;
  value: number | string;
  repeat: string;
  type?: string;
  is_done: boolean;
  autoDone: boolean;
}

export const useGetPlans = (type: string) => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["plans", useData.telegram_id, type],
    queryFn: () => fetchPlans(`${useData.telegram_id}`, type),
  });
};

export const useGetPlan = (id: string) => {
  const useData = useUserData();

  return useQuery({
    queryKey: ["plan", useData.telegram_id, id],
    queryFn: () => fetchPlan(`${useData.telegram_id}`, id),
  });
};

export const useCreatePlan = () => {
  const useData = useUserData();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plan: IPlan) => createPlan(`${useData.telegram_id}`, plan),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });
};

export const useEditPlan = () => {
  const useData = useUserData();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ planData, id }: { planData: IPlan; id: string }) =>
      editPlan(`${useData.telegram_id}`, planData, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });
};
