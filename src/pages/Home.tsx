import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { state } = useUserContext();
  console.log(state);

  const navigate = useNavigate();
  useEffect(() => {
    WebApp.BackButton.hide();
  }, []);
  if (!state.userData?.telegram_id) {
    navigate("/onboarding");
  }

  return (
    <div>
      <h1>Home</h1>
      {!state.user?.onBoarding && <Link to='/onboarding'>Start</Link>}
    </div>
  );
};

export default Home;
