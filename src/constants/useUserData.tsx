import { useUserContext } from "@/context/UserContext";
import { useMemo } from "react";

const useUserData = () => {
  const { state } = useUserContext();

  const userData = useMemo(() => {
    const name = state.userData?.name;
    const username = state.userData?.username;
    const telegram_id = state.userData?.telegram_id;
    const lang = state.userData?.lang;
    const photo = state.userData?.photo;

    return {
      name,
      username,
      telegram_id,
      lang,
      photo,
      currency: state.userData?.currency,
    };
  }, [state]);

  return userData;
};

export default useUserData;
