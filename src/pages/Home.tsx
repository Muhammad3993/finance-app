import Notification from "@/assets/icons/notification";
import User from "@/assets/icons/user";
import GroupCards from "@/components/group-cards/GroupCards";
import Navigation from "@/components/navigation/Navigation";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import formatBalance from "@/constants/useFormatBalance";
import useUserData from "@/constants/useUserData";
import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { state } = useUserContext();
  const useData = useUserData();

  const navigate = useNavigate();
  useEffect(() => {
    WebApp.BackButton.hide();
  }, []);

  if (!state.userData?.telegram_id) {
    navigate("/onboarding");
  }

  return (
    <div>
      <UserNavbar leftIcon={<User />} rightIcon={<Notification />} />
      <div className='w-full flex flex-col gap-2 items-center my-18'>
        <div>
          <p className='text-32 font-unbounded font-bold text-center text-customGray2'>
            {formatBalance(useData.finance)} сум
          </p>
          <p className='text-10 font-unbounded font-normal text-customGray2 opacity-50 text-center'>
            Ваш баланс
          </p>
        </div>
        <div className='bg-customGray py-6 px-4 rounded-25'>
          <p className='text-10 font-unbounded text-customGray2 font-medium'>
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
