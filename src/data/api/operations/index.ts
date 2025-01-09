import { db } from "@/firebaseConfig";
import { IOperationData } from "@/pages/add-expense/AddExpense";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  Query,
  where,
} from "firebase/firestore";

export const fetchOperations = async (
  telegram_id: string,
  type?: string,
  cardName?: string,
) => {
  const operationDocRef = doc(db, "users", telegram_id);
  const operationsCollectionRef = collection(operationDocRef, "operations");

  let operationsQuery: Query<DocumentData> = operationsCollectionRef;

  if (type) {
    operationsQuery = query(operationsQuery, where("type", "==", type));
  }

  if (cardName) {
    operationsQuery = query(
      operationsQuery,
      where("card.card_name", "==", cardName),
    );
  }

  const querySnapshot = await getDocs(operationsQuery);

  if (querySnapshot.empty) {
    return [];
  }

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<IOperationData, "id">),
  }));
};
