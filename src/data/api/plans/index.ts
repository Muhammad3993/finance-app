import { IPlan } from "@/data/hooks/plans";
import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  Query,
  setDoc,
  where,
} from "firebase/firestore";

export const fetchPlans = async (telegram_id: string, type: string) => {
  const userDocRef = doc(db, "users", telegram_id);
  const plansRef = collection(userDocRef, "plans");

  let plansQuery: Query<DocumentData> = plansRef;

  if (type) {
    plansQuery = query(plansQuery, where("type", "==", type));
  }

  const querySnapshot = await getDocs(plansQuery);

  if (querySnapshot.empty) {
    return [];
  }

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IPlan[];
};

export const fetchPlan = async (telegram_id: string, id: string) => {
  const userDocRef = doc(db, "users", telegram_id);
  const plansRef = doc(userDocRef, "plans", id);

  const querySnapshot = await getDoc(plansRef);

  if (querySnapshot.exists()) {
    return querySnapshot.data() as IPlan;
  } else {
    throw new Error("Card not found.");
  }
};

export const createPlan = async (telegram_id: string, plan: IPlan) => {
  const userDocRef = doc(db, "users", telegram_id);
  const plansRef = collection(userDocRef, "plans");

  return await addDoc(plansRef, {
    ...plan,
  });
};

export const editPlan = async (
  telegram_id: string,
  plan: IPlan,
  id: string,
) => {
  const userDocRef = doc(db, "users", telegram_id);
  const plansRef = doc(userDocRef, "plans", id);

  return await setDoc(plansRef, {
    ...plan,
  });
};
