import useUserData from "@/constants/useUserData";
import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";

export interface IGroups {
  id?: string;
  name?: string;
  value?: number;
  spendValue?: number;
  spendPercentage?: number;
  dailyValue?: number;
  dailySpendValue?: number;
}

export const usePostGroupsBudget = () => {
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const userData = useUserData();

  const createGroup = async (groups: IGroups[]) => {
    setIsLoadingCreate(true);
    try {
      await setDoc(doc(db, "groups_budget", `${userData.telegram_id}`), {
        groups: groups,
      });
      console.log("Group created successfully!");
    } catch (e) {
      console.error("Error creating group:", e);
    }
    setIsLoadingCreate(false);
  };

  return { createGroup, isLoadingCreate };
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
      console.log("Group created successfully!");
    } catch (e) {
      console.error("Error creating group:", e);
    }
    setIsLoadingCreate(false);
  };

  return { createGroup, isLoadingCreate };
};

export const useGetGroups = () => {
  const userData = useUserData();
  const [groupsBudget, setGroupsBudget] = useState<IGroups[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const groups = doc(db, "groups_budget", `${userData.telegram_id}`);
      const docSnap = await getDoc(groups);

      if (docSnap.exists()) {
        console.log("Groups data:", docSnap.data()?.groups);
        setGroupsBudget(docSnap.data()?.groups);
      } else {
        console.log("No such document!");
        setGroupsBudget(null);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return { fetchGroups, isLoading, groupsBudget };
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
        console.log("Groups data:", docSnap.data()?.groups);
        setGroupsBudget(docSnap.data()?.groups);
      } else {
        console.log("No such document!");
        setGroupsBudget(null);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return { fetchGroups, isLoading, groupsBudget };
};
