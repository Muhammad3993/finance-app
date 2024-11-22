import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const IsDebt = () => {
  const { setState, state } = useUserContext();

  useEffect(() => {
    WebApp.BackButton.show();
  }, []);

  const navigate = useNavigate();

  const handleLater = () => {
    setState({
      user: {
        ...state.user,
        is_boarding: true,
        onBoarding: { ...state.user?.onBoarding, debt: 0 },
      },
    });
    navigate("/onboarding/finish");
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
          onClick={() => navigate('/onboarding/debt')}
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
