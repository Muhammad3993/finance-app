import { useUserContext } from "@/context/UserContext";

const useUserData = () => {
  const { state } = useUserContext();
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
  const creditsTotal: number | undefined =
    credits?.reduce((total, credit) => total + (credit.price || 0), 0) || 0;
  const remainder =
    Number(finance) -
    (Number(rent) +
      Number(meal) +
      Number(car) +
      Number(communal) +
      Number(transport ? transport : 0) +
      Number(debt) +
      Number(creditsTotal));

  const necessary = Number(finance) - remainder;
  const remainderAll: number | undefined =
    Number(rent) +
    Number(meal) +
    Number(car) +
    Number(communal) +
    Number(transport ? transport : 0) +
    Number(saving) +
    Number(cultural) +
    Number(debt) +
    Number(creditsTotal);

  const reminderCash = Number(finance) - remainderAll;

  const userData = {
    name: name,
    telegram_id: telegram_id,
    lang: lang,
    photo: photo,
    finance: finance,
    rent: rent,
    meal: meal,
    communal: communal,
    car: car,
    transport: transport,
    credits: credits,
    cultural: cultural,
    saving: saving,
    debt: debt,
    necessary: necessary,
    desires: cultural,
    savingNeed: saving,
    reminderCash: reminderCash,
  };
  return userData;
};

export default useUserData;
