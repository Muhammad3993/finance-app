import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MonthlyBudget = () => {
  const { setState, state } = useUserContext();
  useEffect(() => {
    WebApp.BackButton.show();
  }, []);


  console.log(state);
  const navigate = useNavigate();

  const handleBegin = () => {
    setState({
      user: { onBoarding: { is_ready: true } },
    });
    navigate('/onboarding/finance')
  };

  const handleLater = () => {
    setState({ user: { is_boarding: false } });
    navigate("/");
  };

  const { t } = useTranslation();
  return (
    <div className='px-4 py-190 w-full h-[100vh] flex flex-col justify-between items-center'>
      <div className='flex flex-col gap-10'>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("monthly_budget")}
        </p>
      </div>
      <div>
        <div
          className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
          onClick={() => handleBegin()}
        >
          {t("begin")}
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

export default MonthlyBudget;
