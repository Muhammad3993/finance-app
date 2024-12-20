import { db } from "@/firebaseConfig";
import { IOperationData } from "@/pages/AddExpense";
import { collection, doc, getDocs } from "firebase/firestore";
import { useState } from "react";

export const useOperation = () => {
  const [operations, setOperations] = useState<IOperationData[] | null>(null);

  console.log(operations);
  

  const getCardOperations = async (card: string) => {
    try {
      const operationDocRef = doc(db, "operations", `${card}`);
      const operationsCollectionRef = collection(operationDocRef, "operations");

      const querySnapshot = await getDocs(operationsCollectionRef);

      if (!querySnapshot.empty) {
        const operations: IOperationData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<IOperationData, "id">),
        }));

        setOperations(operations);
      } else {
        console.log(`'${card}' hujjatining operations sub-kolleksiyasi bo'sh.`);
        return [];
      }
    } catch (error) {
      console.error("Xato yuz berdi:", error);
    }
  };

  return { getCardOperations, operations };
};
