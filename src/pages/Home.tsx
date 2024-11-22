import { useUserContext } from "@/context/UserContext";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { state } = useUserContext();
  console.log(state.userData);
  console.log(state);

  useEffect(() => {
    WebApp.BackButton.hide();
  }, []);


  return (
    <div>
      <h1>Home</h1>
      {!state.user?.onBoarding && <Link to='/onboarding'>Start</Link>}
    </div>
  );
};

export default Home;
