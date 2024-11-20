import { useUserContext } from "@/context/UserContext";
import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { setState } = useUserContext();
  const { t } = useTranslation();
  return (
    <div className='px-4 py-190 w-full h-[100vh] flex flex-col justify-between items-center'>
      <div className='flex flex-col gap-10'>
        <p className='font-unbounded font-medium text-28 text-black text-center'>
          {t("welcome")}
        </p>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("welcome_title")}
        </p>
      </div>
      <div
        className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
        onClick={() => setState({ pages: 1 })}
      >
        {t("continue")}
      </div>
    </div>
  );
};

export default Welcome;
