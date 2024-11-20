import { useUserContext } from "@/context/UserContext";
import { useTranslation } from "react-i18next";

const IsCredit = () => {
  const { setState, state } = useUserContext();
  console.log(state);

  const handleBegin = () => {
    setState({
      user: { onBoarding: { ...state.user?.onBoarding, is_creadit: true } },
      pages: 10,
    });
  };

  // const handleLater = () => {
  //   setState({
  //     user: { onBoarding: { ...state.user?.onBoarding, is_creadit: true } },
  //   });
  //   navigate("/");
  // };

  const { t } = useTranslation();
  return (
    <div className='px-4 py-190 w-full h-[100vh] flex flex-col justify-between items-center'>
      <div className='flex flex-col items-center gap-3'>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("isCredit")}
        </p>
        <p className='text-center text-xs w-60p text-customGray1 font-unbounded'>
          {t("isCredit_title")}
        </p>
      </div>
      <div>
        <div
          className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
          onClick={() => handleBegin()}
        >
          {t("create_credit")}
        </div>
        <div
          className='h-11 text-sm font-normal text-center text-customGray1 flex items-center justify-center mt-3 font-unbounded'
          // onClick={() => handleLater()}
        >
          {t("later")}
        </div>
      </div>
    </div>
  );
};

export default IsCredit;
