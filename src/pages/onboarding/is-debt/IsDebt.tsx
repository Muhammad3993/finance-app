import { useUserContext } from "@/context/UserContext";
import { useTranslation } from "react-i18next";

const IsDebt = () => {
  const { setState, state } = useUserContext();

  const handleLater = () => {
    setState({
      user: {
        ...state.user,
        is_boarding: true,
        onBoarding: { ...state.user?.onBoarding, debt: 0 },
      },
      pages: 18,
    });
  };

  const { t } = useTranslation();
  return (
    <div className='px-4 w-full min-h-[100vh] flex flex-col justify-center items-center gap-36'>
      <div className='flex flex-col items-center gap-3'>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("is_debt")}
        </p>
      </div>
      <div>
        <div
          className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
          onClick={() => setState({ pages: 17 })}
        >
          {t("Определить сумму")}
        </div>
        <div
          className='h-11 text-sm font-normal text-center text-customGray1 flex items-center justify-center mt-3 font-unbounded'
          onClick={() => handleLater()}
        >
          {t("later")}
        </div>
      </div>
    </div>
  );
};

export default IsDebt;
