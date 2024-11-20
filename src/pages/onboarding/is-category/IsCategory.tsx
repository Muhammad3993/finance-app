import { useUserContext } from "@/context/UserContext";
import { t } from "i18next";
import { Trans } from "react-i18next";

const IsCategory = () => {
  const { setState, state } = useUserContext();

  console.log(state);

  const handleBegin = () => {
    setState({
      user: {
        ...state.user,
        onBoarding: { ...state.user?.onBoarding, is_category: true },
      },
      pages: 4
    });
  };

  return (
    <div className='px-4 py-190 w-full h-[100vh] flex flex-col justify-between items-center'>
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
