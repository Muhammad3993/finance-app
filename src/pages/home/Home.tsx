import GroupCards from "@/pages/home/group-cards/GroupCards";
import Navigation from "@/components/navigation/Navigation";
import formatBalance from "@/constants/useFormatBalance";
import { useDaysInCurrentMonth } from "@/constants/useMonthDays";
import useUserData from "@/constants/useUserData";
import { useUserContext } from "@/context/UserContext";
import { IGroups, usePostGroups } from "@/data/hooks/groups";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FollowAndAnalytics from "./follow_and_analytics";

const Home = () => {
  const { state } = useUserContext();
  const useData = useUserData();

  const navigate = useNavigate();
  const { createGroup, isLoadingCreate } = usePostGroups();
  const { daysInMonth } = useDaysInCurrentMonth();

  const dailyValue = (useData.necessary / daysInMonth).toFixed(2);
  const dailyValueCul = (Number(useData?.cultural) / daysInMonth).toFixed(2);


  const groupss: IGroups[] = [
    {
      name: "Необходимые",
      value: useData.necessary,
      spendValue: useData.necessary,
      dailyValue: +dailyValue,
      dailySpendValue: +dailyValue,
    },
    {
      name: "Желания",
      value: useData.cultural,
      spendValue: useData.cultural,
      dailyValue: +dailyValueCul,
      dailySpendValue: +dailyValueCul,
    },
    {
      name: "Сбережения",
      value: useData.saving,
      spendValue: useData.cultural,
    },
  ];

  console.log(useData);

  useEffect(() => {
    WebApp.BackButton.hide();
  }, []);

  if (!state.userData?.telegram_id) {
    navigate("/onboarding");
  }

  if (isLoadingCreate) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* <UserNavbar leftIcon={<User />} rightIcon={<Notification />} /> */}
      <div className='w-full flex flex-col gap-2 items-center my-18'>
        <div>
          <p className='text-10 font-unbounded font-normal text-white text-center'>
            Общий бюджет
          </p>
          <p
            className='text-32 font-unbounded font-bold text-center text-white'
            onClick={() => createGroup(groupss)}
          >
            {formatBalance(useData.finance)} сум
          </p>
        </div>
      </div>
      <GroupCards />
      <FollowAndAnalytics />
      {!state.user?.onBoarding && <Link to='/onboarding'>Start</Link>}
      <Navigation />
    </div>
  );
};

export default Home;
