import Notification from "@/assets/icons/notification";
import User from "@/assets/icons/user";
import GroupCards from "@/components/group-cards/GroupCards";
import Navigation from "@/components/navigation/Navigation";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import formatBalance from "@/constants/useFormatBalance";
import { useDaysInCurrentMonth } from "@/constants/useMonthDays";
import useUserData from "@/constants/useUserData";
import { useUserContext } from "@/context/UserContext";
import { IGroups, useGetGroups, usePostGroups } from "@/data/hooks/groups";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { state } = useUserContext();
  const useData = useUserData();

  const navigate = useNavigate();
  const { createGroup } = usePostGroups();
  const { groups, fetchGroups, isLoading } = useGetGroups();
  const { daysInMonth } = useDaysInCurrentMonth();

  const dailyValue = (useData.necessary / daysInMonth).toFixed(2);
  const dailyValueCul = (Number(useData?.cultural) / daysInMonth).toFixed(2);
  


  const totalValue = groups?.reduce((accumulator, currentGroup) => {
    if (currentGroup.value !== undefined) {
      return accumulator + currentGroup.value;
    }
    return accumulator;
  }, 0);

  const groupss: IGroups[] = [
    {
      name: "Необходимые",
      value: useData.necessary,
      spendValue: useData.necessary,
      dailyValue: +dailyValue,
      dailySpendValue: +dailyValue
    },
    {
      name: "Желания",
      value: useData.cultural,
      spendValue: useData.cultural,
      dailyValue: +dailyValueCul,
      dailySpendValue: +dailyValueCul
    },
    {
      name: "Сбережения",
      value: useData.saving,
      spendValue: useData.cultural,
    },
  ];

  useEffect(() => {
    WebApp.BackButton.hide();
    fetchGroups();
  }, []);

  if (!state.userData?.telegram_id) {
    navigate("/onboarding");
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <UserNavbar leftIcon={<User />} rightIcon={<Notification />} />
      <div className='w-full flex flex-col gap-2 items-center my-18'>
        <div>
          <p className='text-32 font-unbounded font-bold text-center text-customGray2'>
            {formatBalance(totalValue)} сум
          </p>
          <p className='text-10 font-unbounded font-normal text-customGray2 opacity-50 text-center'>
            Ваш баланс
          </p>
        </div>
        <div className='bg-customGray py-6 px-4 rounded-25'>
          <p
            className='text-10 font-unbounded text-customGray2 font-medium'
            onClick={() => createGroup(groupss)}
          >
            Изменить
          </p>
        </div>
      </div>
      <GroupCards />
      {!state.user?.onBoarding && <Link to='/onboarding'>Start</Link>}
      <Navigation />
    </div>
  );
};

export default Home;
