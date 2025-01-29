import GroupCards from "@/pages/home/group-cards/GroupCards";
import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FollowAndAnalytics from "./follow_and_analytics";
import useSettingBudget from "@/constants/useSettingBudget";
import { usePostGroupsBalance } from "@/data/hooks/groups";
import { useGetCards } from "@/data/hooks/cards";
import { ICards } from "../bills/Bills";
import { formatBalance } from "@/constants/useFormatBalance";
import { useGetOperations } from "@/data/hooks/operations";
import PlansCards from "./plans/PlansCards";

const Home = () => {
  const { state } = useUserContext();
  const location = useLocation();

  const { data: cards, isLoading: isLoadingCard } = useGetCards();
  const { data: operations, isLoading } = useGetOperations(undefined, "Cash");
  const { mutate: createGroup } = usePostGroupsBalance();

  const oprationsValue =
    operations?.reduce((total, operation) => {
      return total + +(operation.value || 0);
    }, 0) || 0;

  const finance: number =
    cards
      ?.filter((card: ICards) => card.isBalance === true)
      .reduce((total, card: ICards) => total + (card?.card_finance ?? 0), 0) ||
    0;

  const { groups } = useSettingBudget(finance);

  const resultFinance = finance - Number(oprationsValue);

  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.hide();
  }, []);

  useEffect(() => {
    if (groups && finance) {
      createGroup(groups);
    }
  }, [groups, finance, location.pathname]);

  if (state.isLoading || isLoadingCard || isLoading) {
    return <p>Loading...</p>;
  }

  if (cards?.length === 0) {
    navigate("/onboarding");
  }

  return (
    <div className="mt-[110px] pb-[100px]">
      <div className="w-full flex flex-col gap-2 items-center my-18">
        <div>
          <p className="text-10 font-unbounded font-normal text-white text-center">
            Общий бюджет
          </p>
          <p className="text-32 font-unbounded font-bold text-center text-white">
            {formatBalance(resultFinance)} сум
          </p>
        </div>
      </div>
      <GroupCards />
      <FollowAndAnalytics />
      <PlansCards />
    </div>
  );
};

export default Home;
