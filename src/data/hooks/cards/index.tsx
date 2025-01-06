import useUserData from "@/constants/useUserData";
import { db } from "@/firebaseConfig";
import { ICards } from "@/pages/bills/Bills";
import { collection, doc, getDocs } from "firebase/firestore";
import { useState } from "react";

const useGetCards = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<ICards[] | null>(null);
  const useData = useUserData();

  const fetchAllCard = async () => {
    try {
      setIsLoading(true);
      const userDocRef = doc(db, "users", `${useData.telegram_id}`);
      const cardsCollectionRef = collection(userDocRef, "cards");
      const querySnapshot = await getDocs(cardsCollectionRef);

      if (!querySnapshot.empty) {
        const cards: ICards[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(cards);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  return { fetchAllCard, isLoading, cards };
};

export default useGetCards;
