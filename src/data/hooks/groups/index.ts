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

export const usePostGroups = () => {
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const userData = useUserData();

  const createGroup = async (groups: IGroups[]) => {
    setIsLoadingCreate(true);
    try {
      await setDoc(doc(db, "groups", `${userData.telegram_id}`), {
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
  const [groups, setGroups] = useState<IGroups[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const groups = doc(db, "groups", `${userData.telegram_id}`);
      const docSnap = await getDoc(groups);

      if (docSnap.exists()) {
        console.log("Groups data:", docSnap.data()?.groups);
        setGroups(docSnap.data()?.groups);
      } else {
        console.log("No such document!");
        setGroups(null);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return { fetchGroups, isLoading, groups };
};
