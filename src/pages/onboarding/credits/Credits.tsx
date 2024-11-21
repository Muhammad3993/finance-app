import { useUserContext } from "@/context/UserContext";
import { useTranslation } from "react-i18next";

const Credits = () => {
  const { setState, state } = useUserContext();
  console.log(state);

  const { t } = useTranslation();
  return (
    <div className='px-4 w-full min-h-[100vh] flex flex-col justify-center items-center gap-36'>
      <div className='flex flex-col items-center gap-3 w-full'>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("creadits_title")}
        </p>
        <div className='max-h-[500px] w-full flex flex-col gap-5 mt-10'>
          {state.user?.onBoarding?.credit?.map((credit, index: number) => (
            <div className='bg-customGray p-4 rounded-2xl' key={index}>
              <p className='font-unbounded text-customGray1'>{credit.name}</p>
              <div className='flex justify-between my-2 text-customGray1'>
                <p className='text-xs font-normal font-unbounded'>
                  Платить осталось
                </p>
                <p className='text-xs font-normal font-unbounded'>
                  {credit.months} месяцев
                </p>
              </div>
              <div className='w-full h-[46px] flex items-center justify-center bg-white rounded-[10px]'>
                <p className='font-unbounded text-customGray1'>
                  {credit.price} сум/мес
                </p>
              </div>
            </div>
          ))}
          <div
            className='w-full h-54 bg-customGray flex items-center justify-center rounded-2xl font-unbounded text-customGray1'
            onClick={() => setState({ pages: 10 })}
          >
            {t("create_credit")}
          </div>
        </div>
      </div>
      <div
        className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
        onClick={() => setState({ pages: 12 })}
      >
        {t("confirm")}
      </div>
    </div>
  );
};

export default Credits;
