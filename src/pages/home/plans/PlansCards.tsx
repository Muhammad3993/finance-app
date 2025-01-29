import { useGetPlans } from "@/data/hooks/plans";
import PlansCard from "@/pages/plans/card/PlansCard";
import { Link } from "react-router-dom";

const PlansCards = () => {
  const { data: plans } = useGetPlans(undefined, false);
  return (
    <>
      {plans?.length !== 0 ? (
        <>
          <div className="mt-4 px-4 flex justify-between items-center">
            <p className="font-medium font-unbounded text-white">Планы</p>
            <Link
              to={"/plans"}
              className="px-3 py-6 bg-00BF33-12 rounded-25 text-10 font-unbounded font-medium text-00BF33"
            >
              Смотреть все
            </Link>
          </div>
          <div className="w-full flex gap-2 overflow-x-auto overflow-hidden px-4 mt-3 hide-scrollbar">
            {plans?.map((plan, i) => (
              <PlansCard plan={plan} key={i} minWidth />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PlansCards;
