import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const fetchBudgetGroups = async (telegramId: string) => {
  const groups = doc(db, "groups_budget", telegramId);
  const docSnap = await getDoc(groups);

  return docSnap.data()?.groups;
};

export const fetchBalanceGroups = async (telegramId: string) => {
  const groups = doc(db, "groups_balance", telegramId);
  const docSnap = await getDoc(groups);

  return docSnap.data()?.groups;
};
