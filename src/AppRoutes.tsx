import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Onboarding from "./pages/onboarding/Onboarding";
import i18n, { DEFAULT_LANGUAGE } from "./i18n";
import Finance from "./pages/onboarding/finance/Finance";
import Finish from "./pages/onboarding/finish/FInish";
import Card from "./pages/card-details/Card";
import { useUserContext } from "./context/UserContext";
import AddExpense from "./pages/add-expense/AddExpense";
import Bills from "./pages/bills/Bills";
import CreateCard from "./pages/create-card/CreateCard";
import Budget from "./pages/budget/Budget";

const AppRoutes = () => {
  const { state, handleScroll } = useUserContext();
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
    <main
      className="max-w-[768px] max-h-[100dvh] mx-auto w-full relative overflow-hidden"
      onScroll={handleScroll}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />}>
          <Route index element={<Finance />} />
          <Route path="finish" element={<Finish />} />
        </Route>
        <Route path="/card/:card" element={<Card />} />
        <Route path="/card/:card/add-expense" element={<AddExpense />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/create-card" element={<CreateCard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;
