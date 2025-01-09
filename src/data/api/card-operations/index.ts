import { db } from "@/firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";

export const fetchCardOperations = async (
  telegramId: string,
  cardId: string,
) => {
  if (!cardId) {
    throw new Error("Card ID is required");
  }

  const userDocRef = doc(db, "users", telegramId);
  const cardsCollectionRef = doc(userDocRef, "cards", cardId);
  const cardOperationCollectionRef = collection(
    cardsCollectionRef,
    "card_operations",
  );
  const querySnapshot = await getDocs(cardOperationCollectionRef);

  if (querySnapshot.empty) {
    return [];
  }

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    type: doc.data().type as string,
    value: doc.data().value as number,
  }));
};
