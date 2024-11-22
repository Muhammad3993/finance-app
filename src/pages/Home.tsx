import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { state } = useUserContext();
  console.log(state);

  useEffect(() => {
    WebApp.BackButton.hide();
  }, []);

  const navigate = useNavigate();

  if (!state.user?.telegram_id) {
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
