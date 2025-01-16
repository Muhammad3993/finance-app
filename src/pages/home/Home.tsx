import GroupCards from "@/pages/home/group-cards/GroupCards";
import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FollowAndAnalytics from "./follow_and_analytics";
import useSettingBudget from "@/constants/useSettingBudget";
import { usePostGroupsBalance } from "@/data/hooks/groups";
import { useGetCards } from "@/data/hooks/cards";
import { ICards } from "../bills/Bills";
import { formatBalance } from "@/constants/useFormatBalance";
import { useGetOperations } from "@/data/hooks/operations";

const Home = () => {
  const { state } = useUserContext();

  const { data: cards, isLoading: isLoadingCard } = useGetCards();
  const { data: operations, isLoading } = useGetOperations(undefined, "Cash");
  const { createGroup, isLoadingCreate } = usePostGroupsBalance();

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
  }, [finance]);

  if (state.isLoading || isLoadingCard || isLoading || isLoadingCreate) {
    return <p>Loading...</p>;
  }

  if (cards?.length === 0) {
    navigate("/onboarding");
  }

  return (
    <div className="mt-[110px]">
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
      <Link to="/onboarding" className="text-white">
        Start
      </Link>
      <Link to="/test" className="text-white">
        Start
      </Link>
    </div>
  );
};

export default Home;
