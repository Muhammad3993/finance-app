import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
  useState,
} from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import WebApp from "@twa-dev/sdk";
import { ICurrency } from "@/data/hooks/currencies";

interface IUser {
  telegram_id?: number;
  name?: string;
  lang?: string;
  photo?: string;
  currency?: ICurrency;
}

interface IState {
  user?: IUser;
  userData: IUser | null;
  isTelegramWebApp?: boolean;
  pages?: number;
  isLoading?: boolean;
}
interface IContext {
  state: Partial<IState>;
  setState: Dispatch<Partial<IState>>;
  handleSaveBasic: () => void;
  handleScroll: (e: React.UIEvent) => void;
  isScrolled: boolean;
  isScrolledText: boolean;
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
      currency: {
        code: "uzs",
        intl: "uz-UZ",
        name: "Uzbekistani Som",
        symbol: "uzs",
        value: 1,
      },
    },
    userData: null,
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
    if (!isTelegramWebApp || !dataUnsafe?.user?.id) {
      console.warn(
        "Telegram WebApp yoki foydalanuvchi ma'lumotlari mavjud emas.",
      );
      return;
    }

    setState({ isTelegramWebApp });
    WebApp.expand();
    WebApp.disableVerticalSwipes();
    WebApp.requestFullscreen();
    WebApp.contentSafeAreaInset;
    WebApp.safeAreaInset;

    WebApp.BackButton.onClick(() => {
      window.history.back();
    });
  }, [isTelegramWebApp]);

  const saveUserData = async (userData: IUser) => {
    if (!userData.telegram_id) {
      console.error("Telegram ID mavjud emas. Foydalanuvchi saqlanmaydi.");
      return;
    }

    try {
      const docData = { ...userData };
      await setDoc(doc(db, "users", `${userData.telegram_id}`), docData);
      console.log("Foydalanuvchi ma'lumotlari saqlandi:", docData);
    } catch (e) {
      console.error("Foydalanuvchi ma'lumotlarini saqlashda xatolik:", e);
    }
  };

  const handleSaveBasic = () => {
    if (!dataUnsafe?.user?.id) {
      console.error(
        "Telegram ID mavjud emas. Foydalanuvchi ma'lumotlarini saqlab bo'lmaydi.",
      );
      return;
    }

    const basicUserData: IUser = {
      telegram_id: dataUnsafe.user.id,
      name: dataUnsafe.user.first_name,
      lang: dataUnsafe.user.language_code,
      photo: dataUnsafe.user.photo_url,
      currency: state.userData?.currency,
    };

    saveUserData(basicUserData);
  };

  const fetchUserByTelegramId = async (telegram_id: number) => {
    try {
      setState({ isLoading: true });
      const q = query(
        collection(db, "users"),
        where("telegram_id", "==", telegram_id),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log("Foydalanuvchi ma'lumotlari topildi:", userData);
        setState({ userData });
      } else {
        console.log("Foydalanuvchi topilmadi.");
      }
      setState({ isLoading: false });
    } catch (e) {
      console.error("Ma'lumotlarni olishda xatolik yuz berdi:", e);
      setState({ isLoading: false });
    }
  };

  useEffect(() => {
    if (dataUnsafe?.user?.id) {
      fetchUserByTelegramId(dataUnsafe.user.id);
      handleSaveBasic();
    }
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledText, setIsScrolledText] = useState(false);

  const handleScroll = (e: React.UIEvent) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 0);
    setIsScrolledText(scrollTop > 88);
  };

  const contextValue = {
    state,
    setState,
    handleSaveBasic,
    isScrolled,
    isScrolledText,
    handleScroll,
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
