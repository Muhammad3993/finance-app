import { useUserContext } from "@/context/UserContext";

const Home = () => {
  const { state } = useUserContext();
  console.log(state);

  if (!state.user?.is_boarding) {
    return <h1>To`ldirilmagan</h1>;
  }

  return <div>Home</div>;
};

export default Home;
