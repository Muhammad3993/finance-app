import useUserData from "@/constants/useUserData";
import { fetchGroups } from "@/data/api/groups";
import { db } from "@/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";

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
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const userData = useUserData();

  const createGroup = async (groups: IGroups[]) => {
    if (!userData || !userData.telegram_id) {
      return;
    }

    setIsLoadingCreate(true);
    setError(null);

    try {
      const groupDocRef = doc(db, "groups_budget", `${userData.telegram_id}`);

      await setDoc(groupDocRef, { groups });
    } catch (e) {
      console.error("Error creating group:", e);
      setError("Failed to create group. Please try again.");
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return { createGroup, isLoadingCreate, error };
};

export const usePostGroupsBalance = () => {
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const userData = useUserData();

  const createGroup = async (groups: IGroups[]) => {
    setIsLoadingCreate(true);
    try {
      await setDoc(doc(db, "groups_balance", `${userData.telegram_id}`), {
        groups: groups,
      });
    } catch (e) {
      console.error("Error creating group:", e);
    }
    setIsLoadingCreate(false);
  };

  return { createGroup, isLoadingCreate };
};

export const useGetGroups = () => {
  const userData = useUserData();

  return useQuery({
    queryKey: ["groups", userData.telegram_id],
    queryFn: () => fetchGroups(`${userData.telegram_id}`),
  });
};

export const useGetGroupsBalance = () => {
  const userData = useUserData();
  const [groupsBudget, setGroupsBudget] = useState<IGroups[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const groups = doc(db, "groups_balance", `${userData.telegram_id}`);
      const docSnap = await getDoc(groups);

      if (docSnap.exists()) {
        setGroupsBudget(docSnap.data()?.groups);
      } else {
        setGroupsBudget(null);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return { fetchGroups, isLoading, groupsBudget };
};
