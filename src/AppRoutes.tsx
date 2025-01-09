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
import KeyboardListener from "./pages/Test";
import Navigation from "./components/navigation/Navigation";
import ChooseValue from "./pages/onboarding/choose-value/ChooseValue";
import Income from "./pages/onboarding/income/Income";
import Operations from "./pages/operations";
import BillDetails from "./pages/bill-details/BillDetails";
import EditCard from "./pages/edit-card/EditCard";
import CardOperations from "./pages/card-operations";
import Expenses from "./pages/card-operations/expenses/Expenses";
import Adjustments from "./pages/card-operations/adjustments/Adjustments";
import IncomeCardOperation from "./pages/card-operations/income/Income";
import AddIncomeCard from "./pages/add-income-card/AddIncomeCard";

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
      className="max-w-[768px] max-h-[100dvh] mx-auto w-full relative overflow-y-scroll"
      onScroll={handleScroll}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />}>
          <Route index element={<ChooseValue />} />
          <Route path="income" element={<Income />} />
          <Route path="finish" element={<Finish />} />
          <Route path="finance" element={<Finance />} />
        </Route>
        <Route path="/card/:card" element={<Card />} />
        <Route path="/card/:card/add-expense" element={<AddExpense />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/bills/:bill" element={<BillDetails />} />
        <Route path="/bills/:bill/edit" element={<EditCard />} />
        <Route path="/bills/:bill/add-income" element={<AddIncomeCard />} />
        <Route path="/bills/:bill/operations" element={<CardOperations />}>
          <Route index element={<Expenses />} />
          <Route path="income" element={<IncomeCardOperation />} />
          <Route path="adjustments" element={<Adjustments />} />
        </Route>
        <Route path="/create-card" element={<CreateCard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/test" element={<KeyboardListener />} />
        <Route path="/card/:card/operations" element={<Operations />} />
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
      <Navigation />
    </main>
  );
};

export default AppRoutes;
