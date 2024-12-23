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
import { ICurrence } from "@/pages/create-card/CreateCard";

interface IUser {
  telegram_id?: number;
  name?: string;
  lang?: string;
  photo?: string;
  onBoarding?: {
    finance?: number;
    for_rent?: number;
    for_meal?: number;
    for_communal?: number;
    for_car?: number;
    for_transport?: number;
    credit?: {
      name?: string;
      price?: number;
      months?: number;
    }[];
    cultural?: number;
    saving?: number;
    debt?: number;
  };
  currency?: ICurrence;
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
  handleSaveWithOnboarding: () => void;
  handleSaveBasic: () => void;
  handleScroll: (e: React.UIEvent) => void;
  isScrolled: boolean;
}

const UserContext = createContext<IContext | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const dataUnsafe = WebApp.initDataUnsafe;
  const isTelegramWebApp = !!dataUnsafe?.user;

  const initialState: IState = {
    user: {
      telegram_id: 0,
      name: "No USer",
      lang: "en",
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
    setState({ isTelegramWebApp });
    WebApp.expand();
    WebApp.disableVerticalSwipes();
    WebApp.themeParams.text_color;
    // WebApp.requestFullscreen();
    WebApp.contentSafeAreaInset;
    WebApp.safeAreaInset;

    WebApp.BackButton.onClick(() => {
      window.history.back();
    });
  }, [isTelegramWebApp]);

  const saveUserData = async (userData: IUser, onboardingData?: object) => {
    try {
      const docData = {
        ...userData,
        onBoarding: onboardingData || null,
      };

      const docRef = await setDoc(doc(db, "users", `${5673577167}`), docData);
      console.log("Foydalanuvchi muvaffaqiyatli yaratildi, ID:", docRef);
    } catch (e) {
      console.error("Foydalanuvchini yaratishda xatolik yuz berdi:", e);
    }
  };

  const handleSaveBasic = () => {
    const basicUserData: IUser = {
      telegram_id: dataUnsafe?.user?.id,
      name: dataUnsafe?.user?.first_name,
      lang: dataUnsafe.user?.language_code,
      photo: dataUnsafe.user?.photo_url,
    };
    saveUserData(basicUserData);
  };

  const handleSaveWithOnboarding = () => {
    const basicUserData: IUser = {
      telegram_id: dataUnsafe?.user?.id,
      name: dataUnsafe.user?.first_name,
      lang: state.user?.lang,
      photo: dataUnsafe.user?.photo_url,
    };

    const onboardingData = {
      ...state.user?.onBoarding,
    };

    saveUserData(basicUserData, onboardingData);
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
        console.log("Foydalanuvchi topildi:", userData);
        setState({ userData });
      } else {
        console.log("Foydalanuvchi topilmadi, yangi foydalanuvchi qo'shiladi.");
      }
      setState({ isLoading: false });
    } catch (e) {
      console.error("Ma'lumotlarni olishda xatolik yuz berdi:", e);
    }
  };

  useEffect(() => {
    // if (isTelegramWebApp && dataUnsafe?.user?.id) {
    fetchUserByTelegramId(5673577167);
    // }
  }, [isTelegramWebApp]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledText, setIsScrolledText] = useState(false);

  // Divni scroll qilish
  const handleScroll = (e: React.UIEvent) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 0) {
      setIsScrolled(true);
    } else if (scrollTop >= 241) {
      setIsScrolledText(true);
    } else {
      setIsScrolled(false);
    }
  };

  const contextValue = {
    state,
    setState,
    handleSaveWithOnboarding,
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
