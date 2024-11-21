import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
} from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import WebApp from "@twa-dev/sdk";

interface IState {
  user?: {
    telegram_id?: number;
    name?: string;
    lang?: string;
    is_boarding?: boolean;
    onBoarding?: {
      is_ready?: boolean;
      finance?: number;
      is_category?: boolean;
      for_rent?: number;
      for_meal?: number;
      for_communal?: number;
      for_car?: number;
      for_transport?: number;
      is_creadit?: boolean;
      credit?: {
        name?: string;
        price?: number;
        months?: number;
      }[];
      is_cultural?: boolean;
      cultural?: number;
      is_saving?: boolean;
      saving?: number;
      is_debt?: boolean;
      debt?: number;
    };
  };
  isTelegramWebApp?: boolean;
  pages?: number;
}
interface IContext {
  state: Partial<IState>;
  setState: Dispatch<Partial<IState>>;
  saveUserData: () => void;
}

const UserContext = createContext<IContext | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const dataUnsafe = WebApp.initDataUnsafe;
  const isTelegramWebApp = !!dataUnsafe?.user;

  const initialState: IState = {
    user: {
      telegram_id: 0,
      name: "No User",
      lang: "en",
      is_boarding: false,
      onBoarding: {
        is_ready: false,
        finance: 0,
        is_category: false,
        for_rent: 0,
        for_meal: 0,
        for_communal: 0,
        for_car: 0,
        for_transport: 0,
        is_creadit: false,
        credit: [
          {
            name: "Ipoteka",
            price: 0,
            months: 3,
          },
        ],
        is_cultural: false,
        cultural: 0,
        is_saving: false,
        saving: 0,
        is_debt: false,
        debt: 0,
      },
    },
    isTelegramWebApp: true,
    pages: 0,
  };

  const [state, setState] = useReducer(
    (state: IState, setState: Partial<IState>) => ({
      ...state,
      ...setState,
    }),
    initialState,
  );

  useEffect(() => {
    setState({ isTelegramWebApp });
    WebApp.expand()
    WebApp.disableVerticalSwipes()
    WebApp.viewportStableHeight
  }, [isTelegramWebApp]);

  const saveUserData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        ...state.user,
        telegram_id: dataUnsafe?.user?.id,
        name: dataUnsafe?.user?.first_name,
        lang: dataUnsafe?.user?.language_code,
        is_boarding: true,
      });
      console.log("Dokument muvaffaqiyatli qo'shildi, ID:", docRef.id);
    } catch (e) {
      console.error("Xatolik yuz berdi: ", e);
    }
  };

  const fetchUserByTelegramId = async (telegram_id: number) => {
    try {
      const q = query(
        collection(db, "users"),
        where("telegram_id", "==", telegram_id),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log("Foydalanuvchi topildi:", userData);
        setState({ user: userData });
      } else {
        console.log("Foydalanuvchi topilmadi, yangi foydalanuvchi qo'shiladi.");
      }
    } catch (e) {
      console.error("Ma'lumotlarni olishda xatolik yuz berdi:", e);
    }
  };

  useEffect(() => {
    if (isTelegramWebApp && dataUnsafe?.user?.id) {
      fetchUserByTelegramId(dataUnsafe?.user?.id);
    }
  }, [isTelegramWebApp]);

  const contextValue = {
    state,
    setState,
    saveUserData,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

export { UserContext, UserProvider, useUserContext };
