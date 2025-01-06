import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

export interface ICurrency {
  name?: string;
  code?: string;
  intl?: string;
  symbol?: string;
  value?: number;
}

const useCurrencies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState<ICurrency[] | null>(null);

  const fetchAllCurriense = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "currencies"));

      if (!querySnapshot.empty) {
        const currencies = querySnapshot.docs.map((doc) => doc.data());
        setCurrencies(currencies);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return { isLoading, currencies, fetchAllCurriense };
};

export default useCurrencies;
