import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { t } from "i18next";
import { useEffect } from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

const IsCategory = () => {
  const { state } = useUserContext();
  useEffect(() => {
    WebApp.BackButton.show();
  }, []);
  const navigate = useNavigate();
  console.log(state);

  const handleBegin = () => {
    navigate("/onboarding/rent");
  };

  return (
    <div className='px-4 w-full min-h-[100vh] flex flex-col justify-center items-center gap-28'>
      <div className='flex flex-col items-center gap-3'>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("category")}
        </p>
        <p className='text-center text-xs w-60p text-customGray1 font-unbounded'>
          <Trans i18nKey={"budget_function"} />
        </p>
      </div>
      <div
        className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
        onClick={() => handleBegin()}
      >
        {t("begin")}
      </div>
    </div>
  );
};

export default IsCategory;
