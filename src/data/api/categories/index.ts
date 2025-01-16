import { ICategory } from "@/data/hooks/categories";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchAllCategories = async () => {
  try {
    const docRef = collection(db, "categories");
    const querySnapshot = await getDocs(docRef);

    if (querySnapshot.empty) {
      return;
    }
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
    })) as ICategory[];
  } catch (e) {
    console.error(e);
  }
};
