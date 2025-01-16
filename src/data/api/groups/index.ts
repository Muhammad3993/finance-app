import { IGroups } from "@/data/hooks/groups";
import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

export const createBudgetGroup = async (
  telegramId: string,
  groups: IGroups[],
) => {
  try {
    const groupDocRef = doc(db, "groups_budget", telegramId);

    await setDoc(groupDocRef, { groups });
  } catch (e) {
    console.error("Error creating group:", e);
  }
};

export const createBalanceGroup = async (
  telegramId: string,
  groups: IGroups[],
) => {
  try {
    const groupDocRef = doc(db, "groups_balance", telegramId);

    await setDoc(groupDocRef, { groups });
  } catch (e) {
    console.error("Error creating group:", e);
  }
};
