import useUserData from "@/constants/useUserData";
import { db } from "@/firebaseConfig";
import { IOperationData } from "@/pages/add-expense/AddExpense";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

export const useOperation = () => {
  const [operations, setOperations] = useState<IOperationData[] | null>(null);
  const userData = useUserData();

  const getCardOperations = async (type?: string) => {
    try {
      const operationDocRef = doc(db, "users", `${userData.telegram_id}`);
      const operationsCollectionRef = collection(operationDocRef, "operations");

      const operationsQuery = type
        ? query(operationsCollectionRef, where("type", "==", type))
        : operationsCollectionRef;

      const querySnapshot = await getDocs(operationsQuery);

      if (!querySnapshot.empty) {
        const operations: IOperationData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<IOperationData, "id">),
        }));

        setOperations(operations);
      } else {
        console.log("Empty.");
        setOperations(null);
      }
    } catch (error) {
      console.error("Xato yuz berdi:", error);
      setOperations(null);
    }
  };

  return { getCardOperations, operations };
};
