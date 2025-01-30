import GroupCards from "@/pages/home/group-cards/GroupCards";
import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const { data: cards, isLoading: isLoadingCard } = useGetCards();
  const { data: operations, isLoading } = useGetOperations(undefined, "Cash");
  const { mutate: createGroup } = usePostGroupsBalance();

  const oprationsValue =
    operations?.reduce((total, operation) => {
      return total + +(operation.value || 0);
    }, 0) || 0;

  const finance = useMemo(
    () =>
      cards
        ?.filter((card: ICards) => card.isBalance === true)
        .reduce(
          (total, card: ICards) => total + (card?.card_finance ?? 0),
          0,
        ) || 0,
    [cards],
  );

  const { groups } = useSettingBudget(finance);

  const resultFinance = finance - Number(oprationsValue);

  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.hide();
  }, []);

  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (groups && finance) {
      createGroup(groups, {
        onSuccess: () => {
          setIsWaiting(true);
        },
        onError: () => {
          setIsWaiting(true);
        },
      });
    }
  }, [groups, finance]);

  if (cards?.length === 0 && !isLoadingCard) {
    navigate("/onboarding");
  }

  if (state.isLoading || isLoadingCard || isLoading) {
    return <p>Loading...</p>;
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
      <GroupCards isWaiting={isWaiting} />
      <FollowAndAnalytics />
      <PlansCards />
    </div>
  );
};

export default Home;
