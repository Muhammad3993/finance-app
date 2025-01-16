import { IBudget } from "@/data/hooks/budget";
import { db } from "@/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const fetchBudget = async (telegramId: string) => {
  const userDocRef = doc(db, "users", telegramId);
  const cardsCollectionRef = collection(userDocRef, "budget");
  const querySnapshot = await getDocs(cardsCollectionRef);

  if (querySnapshot.empty) {
    return [];
  }

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    value: doc.data().value,
  }));
};

export const editBudget = async (
  { cardData }: { cardData: IBudget },
  telegramId: string,
) => {
  const userDocRef = doc(db, "users", telegramId);
  const cardsCollectionRef = collection(userDocRef, "budget");
  const newCardDocRef = doc(cardsCollectionRef, "budget_number");

  try {
    await setDoc(newCardDocRef, {
      ...cardData,
    });
  } catch (e) {
    throw new Error(`Error updating card: ${e}`);
  }
};
