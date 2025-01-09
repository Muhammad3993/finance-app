import { db } from "@/firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";

export const fetchCardIncomes = async (telegramId: string, cardId: string) => {
  if (!cardId) {
    throw new Error("Card ID is required");
  }

  const userDocRef = doc(db, "users", telegramId);
  const cardsCollectionRef = doc(userDocRef, "cards", cardId);
  const cardOperationCollectionRef = collection(cardsCollectionRef, "incomes");
  const querySnapshot = await getDocs(cardOperationCollectionRef);

  if (querySnapshot.empty) {
    return [];
  }

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    cardId: doc.data().cardId,
    category: doc.data().category,
    date: doc.data().date,
    description: doc.data().description,
    monthDay: doc.data().monthDay,
    repeat: doc.data().repeat,
    value: doc.data().value as number,
    weekDay: doc.data().weekDay,
  }));
};
