import GroupCards from "@/pages/home/group-cards/GroupCards";
import Navigation from "@/components/navigation/Navigation";
import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FollowAndAnalytics from "./follow_and_analytics";
import useGetCards from "@/data/hooks/currencies";
import formatBalance from "@/constants/useFormatBalance";
import { useOperation } from "@/data/hooks/operation";

const Home = () => {
  const { state } = useUserContext();

  const { cards, fetchAllCard } = useGetCards();
  const { getCardOperations, operations } = useOperation();

  const oprationsValue =
    operations?.reduce((total, operation) => {
      return total + +(operation.value || 0);
    }, 0) || 0;

  const finance = Number(cards?.map((card) => card.card_finance));

  const resultFinance = finance - Number(oprationsValue);

  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.hide();
    fetchAllCard();
    getCardOperations();
  }, []);

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (!state.userData?.telegram_id) {
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
      <Navigation />
    </div>
  );
};

export default Home;
