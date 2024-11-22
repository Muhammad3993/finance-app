import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { Outlet } from "react-router-dom";

const Onboarding = () => {

  useEffect(() => {
    WebApp.BackButton.show();
  }, []);

  return (
    <section className='overflow-auto h-[100vh]'>
      <Outlet />
    </section>
  );
};

export default Onboarding;
