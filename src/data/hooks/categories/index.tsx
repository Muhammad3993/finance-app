import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

export interface ICategory {
  id: string;
  name: string;
}

const useGetCategories = () => {
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  const fetchAllCategories = async () => {
    try {
      setIsCategoryLoading(true);
      const docRef = collection(db, "categories");
      const querySnapshot = await getDocs(docRef);

      if (!querySnapshot.empty) {
        const categories: ICategory[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name as string,
        }));

        setCategories(categories);
      }
      setIsCategoryLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  return { fetchAllCategories, isCategoryLoading, categories };
};

export default useGetCategories;
