import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
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
import { useNavigate } from "react-router-dom";

interface IUser {
  telegram_id?: number;
  name?: string;
  lang?: string;
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
}

interface IState {
  user?: IUser;
  userData: IUser;
  isTelegramWebApp?: boolean;
  pages?: number;
}
interface IContext {
  state: Partial<IState>;
  setState: Dispatch<Partial<IState>>;
  handleSaveWithOnboarding: () => void;
  handleSaveBasic: () => void;
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
    userData: {},
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
    WebApp.viewportStableHeight;
    WebApp.setBackgroundColor("#ffffff");

    WebApp.BackButton.onClick(() => {
      window.history.back();
    });
  }, [isTelegramWebApp]);

  const navigate = useNavigate();

  if (!state.userData?.telegram_id) {
    setTimeout(() => {
      navigate("/onboarding");
    }, 10000);
  }

  const saveUserData = async (userData: IUser, onboardingData?: object) => {
    try {
      const docData = {
        ...userData,
        onBoarding: onboardingData || null,
      };

      const docRef = await setDoc(
        doc(db, "users", `${userData.telegram_id}`),
        docData,
      );
      console.log("Foydalanuvchi muvaffaqiyatli yaratildi, ID:", docRef);
    } catch (e) {
      console.error("Foydalanuvchini yaratishda xatolik yuz berdi:", e);
    }
  };

  const handleSaveBasic = () => {
    const basicUserData = {
      telegram_id: dataUnsafe?.user?.id,
      name: dataUnsafe?.user?.first_name,
      lang: state.user?.lang,
    };
    saveUserData(basicUserData);
  };

  const handleSaveWithOnboarding = () => {
    const basicUserData = {
      telegram_id: dataUnsafe?.user?.id,
      name: dataUnsafe.user?.first_name,
      lang: state.user?.lang,
    };

    const onboardingData = {
      ...state.user?.onBoarding,
    };

    saveUserData(basicUserData, onboardingData);
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
        setState({ userData });
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

  console.log(state.userData.name);

  const contextValue = {
    state,
    setState,
    handleSaveWithOnboarding,
    handleSaveBasic,
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
