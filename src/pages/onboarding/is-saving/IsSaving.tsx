import { useUserContext } from "@/context/UserContext";
import { useTranslation } from "react-i18next";

const IsSaving = () => {
  const { setState, state } = useUserContext();
  console.log(state);

  const handleLater = () => {
    setState({
      pages: 16,
      user: {...state.user, onBoarding: {...state.user?.onBoarding, saving: 0}}
    });
  };

  const { t } = useTranslation();
  return (
    <div className='px-4 py-190 w-full h-[100vh] flex flex-col justify-between items-center'>
      <div className='flex flex-col items-center gap-3'>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("is_saving")}
        </p>
      </div>
      <div>
        <div
          className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
          onClick={() => setState({ pages: 15 })}
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

export default IsSaving;
