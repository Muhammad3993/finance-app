import useUserData from "@/constants/useUserData";
import { db } from "@/firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { useState } from "react";

export interface IBudget {
  id?: string;
  card_finance?: number;
}

export const useGetBudget = () => {
  const [budgets, setBudgets] = useState<IBudget[] | null>(null);
  const userData = useUserData();

  const getBudget = async () => {
    try {
      const userDocRef = doc(db, "users", `${userData.telegram_id}`);
      const cardsCollectionRef = collection(userDocRef, "budget");
      const querySnapshot = await getDocs(cardsCollectionRef);
      const cards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBudgets(cards);
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  return { getBudget, budgets };
};
