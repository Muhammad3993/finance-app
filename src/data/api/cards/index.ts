import { db } from "@/firebaseConfig";
import { ICards } from "@/pages/bills/Bills";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const fetchCard = async (telegram_id: string, cardId: string) => {
  if (!cardId) {
    throw new Error("Card ID is required");
  }

  const userDocRef = doc(db, "users", telegram_id);
  const cardRef = doc(userDocRef, "cards", cardId);

  const cardSnapshot = await getDoc(cardRef);

  if (cardSnapshot.exists()) {
    return cardSnapshot.data() as ICards;
  } else {
    throw new Error("Card not found.");
  }
};

export const fetchCards = async (telegram_id: string) => {
  const userDocRef = doc(db, "users", telegram_id);
  const cardRef = collection(userDocRef, "cards");

  const cardSnapshot = await getDocs(cardRef);

  if (cardSnapshot.empty) {
    return [];
  }

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const editCardData = async (
  { cardData, bill }: { cardData: ICards; bill: string },
  telegramId: string,
) => {
  if (!bill) {
    throw new Error("Card ID is required");
  }

  const userDocRef = doc(db, "users", telegramId);
  const cardsCollectionRef = doc(userDocRef, "cards", bill);

  try {
    await setDoc(cardsCollectionRef, { ...cardData });
  } catch (e) {
    throw new Error(`Error updating card: ${e}`);
  }
};
