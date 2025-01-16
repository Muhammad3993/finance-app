import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchAllCurriense = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "currencies"));

    if (querySnapshot.empty) {
      return
    }
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {
    console.error(e);
  }
};
