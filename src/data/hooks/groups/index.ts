import useUserData from "@/constants/useUserData";
import {
  createBalanceGroup,
  createBudgetGroup,
  fetchBalanceGroups,
  fetchBudgetGroups,
} from "@/data/api/groups";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IGroups {
  id?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  value?: number;
  spendValue?: number;
  spendPercentage?: number;
  dailyValue?: number;
  dailySpendValue: number;
}

export const usePostGroupsBudget = () => {
  const userData = useUserData();

  return useMutation({
    mutationFn: (groups: IGroups[]) =>
      createBudgetGroup(`${userData.telegram_id}`, groups),
  });
};

export const usePostGroupsBalance = () => {
  // const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const userData = useUserData();

  // const createGroup = async (groups: IGroups[]) => {
  //   setIsLoadingCreate(true);
  //   try {
  //     await setDoc(doc(db, "groups_balance", `${userData.telegram_id}`), {
  //       groups: groups,
  //     });
  //   } catch (e) {
  //     console.error("Error creating group:", e);
  //   }
  //   setIsLoadingCreate(false);
  // };

  // return { createGroup, isLoadingCreate };

  return useMutation({
    mutationFn: (groups: IGroups[]) =>
      createBalanceGroup(`${userData.telegram_id}`, groups),
  });
};

export const useGetGroups = () => {
  const userData = useUserData();

  return useQuery({
    queryKey: ["groups_budget", userData.telegram_id],
    queryFn: () => fetchBudgetGroups(`${userData.telegram_id}`),
  });
};

export const useGetGroupsBalance = () => {
  const userData = useUserData();

  return useQuery({
    queryKey: ["groups_balance", userData.telegram_id],
    queryFn: () => fetchBalanceGroups(`${userData.telegram_id}`),
  });
};
