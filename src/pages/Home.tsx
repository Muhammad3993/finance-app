import { useUserContext } from "@/context/UserContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { state } = useUserContext();
  console.log(state);

  if (!state.user?.is_boarding) {
    return (
      <div>
        <h1>To`ldirilmagan</h1>
        <Link to={"/onboarding"}>Onboarding</Link>
      </div>
    );
  }

  return (
    <div>
      Home
    </div>
  );
};

export default Home;
