import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/onboarding/Onboarding";
import i18n, { DEFAULT_LANGUAGE } from "./i18n";
import Welcome from "./pages/onboarding/welcome/Welcome";
import MonthlyBudget from "./pages/onboarding/monthly-budget/MonthlyBudget";
import Finance from "./pages/onboarding/finance/Finance";
import IsCategory from "./pages/onboarding/is-category/IsCategory";
import Rent from "./pages/onboarding/rent/Rent";
import ForProduct from "./pages/onboarding/for-product/ForProduct";
import ForCommunal from "./pages/onboarding/for-communal/ForCommunal";
import ForCar from "./pages/onboarding/for-car/ForCar";
import ForTransport from "./pages/onboarding/for-transport/ForTransport";
import IsCredit from "./pages/onboarding/is-creadit/IsCredit";
import CreateCredit from "./pages/onboarding/create-credit/CreateCredit";
import Credits from "./pages/onboarding/credits/Credits";
import IsCulturel from "./pages/onboarding/is-culturel/IsCulturel";
import Culturel from "./pages/onboarding/culturel/Culturel";
import IsSaving from "./pages/onboarding/is-saving/IsSaving";
import Saving from "./pages/onboarding/saving/Saving";
import IsDebt from "./pages/onboarding/is-debt/IsDebt";
import Debt from "./pages/onboarding/debt/Debt";
import Finish from "./pages/onboarding/finish/FInish";
import Card from "./pages/card-details/Card";
import { useUserContext } from "./context/UserContext";
import AddExpense from "./pages/AddExpense";
import Bills from "./pages/Bills";
import CreateCard from "./pages/create-card/CreateCard";

const AppRoutes = () => {
  const { state } = useUserContext();
  const userLang: string = "ru";
  const supportedLanguages = ["en", "ru", "uz"];
  if (supportedLanguages.includes(userLang)) {
    i18n.changeLanguage(userLang);
  } else {
    i18n.changeLanguage(DEFAULT_LANGUAGE);
  }

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className='max-w-[768px] bg-[#FFFFFF] h-[100vh] mx-auto w-full relative'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/onboarding' element={<Onboarding />}>
          <Route index element={<Welcome />} />
          <Route path='monthly-budget' element={<MonthlyBudget />} />
          <Route path='finance' element={<Finance />} />
          <Route path='is-category' element={<IsCategory />} />
          <Route path='rent' element={<Rent />} />
          <Route path='for-product' element={<ForProduct />} />
          <Route path='for-communal' element={<ForCommunal />} />
          <Route path='for-car' element={<ForCar />} />
          <Route path='for-transport' element={<ForTransport />} />
          <Route path='is-credit' element={<IsCredit />} />
          <Route path='create-credit' element={<CreateCredit />} />
          <Route path='credits' element={<Credits />} />
          <Route path='is-culturel' element={<IsCulturel />} />
          <Route path='culturel' element={<Culturel />} />
          <Route path='is-saving' element={<IsSaving />} />
          <Route path='saving' element={<Saving />} />
          <Route path='is-debt' element={<IsDebt />} />
          <Route path='debt' element={<Debt />} />
          <Route path='finish' element={<Finish />} />
        </Route>
        <Route path='/card/:card' element={<Card />} />
        <Route path='/card/:card/add-expense' element={<AddExpense />} />
        <Route path='/bills' element={<Bills />} />
        <Route path='/create-card' element={<CreateCard />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;
