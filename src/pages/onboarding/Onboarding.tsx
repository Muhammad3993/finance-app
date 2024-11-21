// import { useUserContext } from "../../context/UserContext";
import { useUserContext } from "@/context/UserContext";
import Welcome from "./welcome/Welcome";
import MonthlyBudget from "./monthly-budget/MonthlyBudget";
import Finance from "./finance/Finance";
import IsCategory from "./is-category/IsCategory";
import Rent from "./rent/Rent";
import ForProduct from "./for-product/ForProduct";
import ForCommunal from "./for-communal/ForCommunal";
import ForCar from "./for-car/ForCar";
import ForTransport from "./for-transport/ForTransport";
import IsCredit from "./is-creadit/IsCredit";
import CreateCredit from "./create-credit/CreateCredit";
import Credits from "./credits/Credits";
import IsCulturel from "./is-culturel/IsCulturel";
import Culturel from "./culturel/Culturel";
import IsSaving from "./is-saving/IsSaving";
import Saving from "./saving/Saving";
import IsDebt from "./is-debt/IsDebt";
import Debt from "./debt/Debt";
import Finish from "./finish/FInish";

const Onboarding = () => {
  const { state } = useUserContext();

  return (
    <section>
      {
        state.pages === 0 && <Welcome /> ||
        state.pages === 1 && <MonthlyBudget /> ||
        state.pages === 2 && <Finance /> ||
        state.pages === 3 && <IsCategory /> ||
        state.pages === 4 && <Rent /> ||
        state.pages === 5 && <ForProduct /> || 
        state.pages === 6 && <ForCommunal /> ||
        state.pages === 7 && <ForCar /> || 
        state.pages === 8 && <ForTransport /> ||
        state.pages === 9 && <IsCredit /> ||
        state.pages === 10 && <CreateCredit /> ||
        state.pages === 11 && <Credits /> ||
        state.pages === 12 && <IsCulturel /> || 
        state.pages === 13 && <Culturel /> ||
        state.pages === 14 && <IsSaving /> || 
        state.pages === 15 && <Saving /> || 
        state.pages === 16 && <IsDebt /> || 
        state.pages === 17 && <Debt /> || 
        state.pages === 18 && <Finish />
      }
    </section>
  );
};

export default Onboarding;
