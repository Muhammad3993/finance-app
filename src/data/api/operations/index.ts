import { db } from "@/firebaseConfig";
import { IOperationData } from "@/pages/add-expense/AddExpense";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  Query,
  where,
} from "firebase/firestore";

export const fetchOperations = async (
  telegram_id: string,
  type?: string,
  cardName?: string,
  planId?: string,
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
  if (planId) {
    operationsQuery = query(operationsQuery, where("planId", "==", planId));
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

export const fetchOperation = async (
  telegram_id: string,
  operationId: string,
): Promise<IOperationData | undefined> => {
  if (!operationId) {
    throw new Error("Operation ID is required.");
  }

  const operationDocRef = doc(db, "users", telegram_id);
  const operationsCollectionRef = doc(
    operationDocRef,
    "operations",
    operationId,
  );

  const querySnapshot = await getDoc(operationsCollectionRef);

  if (querySnapshot.exists()) {
    return querySnapshot.data() as IOperationData;
  } else {
    throw new Error("Operation not found.");
  }
};

export const addOperation = async (
  telegram_id: string,
  operationData: IOperationData,
) => {
  const userDocRef = doc(db, "users", telegram_id);

  const cardsCollectionRef = collection(userDocRef, "operations");
  return await addDoc(cardsCollectionRef, {
    ...operationData,
  });
};
