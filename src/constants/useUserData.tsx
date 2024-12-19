import { useUserContext } from "@/context/UserContext";
import { useEffect, useMemo } from "react";

const useUserData = () => {
  const { state } = useUserContext();

  const userData = useMemo(() => {
    const name = state.userData?.name;
    const telegram_id = state.userData?.telegram_id;
    const lang = state.userData?.lang;
    const photo = state.userData?.photo;
    const finance = state.userData?.onBoarding?.finance;
    const rent = state.userData?.onBoarding?.for_rent;
    const meal = state.userData?.onBoarding?.for_meal;
    const communal = state.userData?.onBoarding?.for_communal;
    const car = state.userData?.onBoarding?.for_car;
    const transport = state.userData?.onBoarding?.for_transport;
    const credits = state.userData?.onBoarding?.credit;
    const cultural = state.userData?.onBoarding?.cultural;
    const saving = state.userData?.onBoarding?.saving;
    const debt = state.userData?.onBoarding?.debt;

    const creditsTotal =
      credits?.reduce((total, credit) => total + (credit.price || 0), 0) || 0;

    const remainder =
      Number(finance) -
      (Number(rent) +
        Number(meal) +
        Number(car) +
        Number(communal) +
        Number(transport || 0) +
        Number(debt) +
        Number(creditsTotal));

    const necessary = Number(finance) - remainder;

    const remainderAll =
      Number(rent) +
      Number(meal) +
      Number(car) +
      Number(communal) +
      Number(transport || 0) +
      Number(saving) +
      Number(cultural) +
      Number(debt) +
      Number(creditsTotal);

    const reminderCash = Number(finance) - remainderAll;

    return {
      name,
      telegram_id,
      lang,
      photo,
      finance,
      rent,
      meal,
      communal,
      car,
      transport,
      credits,
      cultural,
      saving,
      debt,
      necessary,
      desires: cultural,
      savingNeed: saving,
      reminderCash,
      currency: state.userData?.currency,
    };
  }, [state]);

  useEffect(() => {
    console.log("User data or state updated:", userData);
  }, [state]);

  return userData;
};

export default useUserData;