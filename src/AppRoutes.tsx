import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/onboarding/Onboarding";
import i18n, { DEFAULT_LANGUAGE } from "./i18n";

const AppRoutes = () => {
  const userLang: string = "ru";
  const supportedLanguages = ["en", "ru", "uz"];
  if (supportedLanguages.includes(userLang)) {
    i18n.changeLanguage(userLang);
  } else {
    i18n.changeLanguage(DEFAULT_LANGUAGE);
  }
 
  
  return (
    <main className='max-w-[768px] bg-[#FFFFFF] h-[100dvh] mx-auto w-full relative'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;
