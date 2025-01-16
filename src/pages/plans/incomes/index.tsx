import CalendarIcon from "@/assets/icons/calendar";
import PlansCard from "../card/PlansCard";
import { IPlan, useGetPlans } from "@/data/hooks/plans";

const IncomesPlans = () => {
  const { data: plans, isLoading } = useGetPlans("incomes");
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {plans === null ? (
        <div className="flex flex-col justify-center items-center mt-88">
          <CalendarIcon width={32} height={32} />
          <p className="w-[65%] text-FFFFFF-25 text-center text-10 font-normal font-unbounded">
            У вас еще нет запланированных расходов
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {plans?.map((plan: IPlan, i: number) => (
            <PlansCard plan={plan} key={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default IncomesPlans;
