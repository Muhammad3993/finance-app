import Card from "@/assets/icons/card";
import Chart from "@/assets/icons/chart";
import Coin from "@/assets/icons/coin";
import Date from "@/assets/icons/date";
import { NavLink } from "react-router-dom";
import "./navigation.css"

const Navigation = () => {
  return (
    <div className='w-max h-16 fixed bottom-6 left-[50%] translate-x-[-50%] flex items-center gap-1 p-1 bg-customGray4 rounded-50 backdrop-blur-[100px]'>
      <NavLink to={"/"} className="w-14 h-14 flex justify-center items-center rounded-full nav_link">
        <Coin />
      </NavLink>
      <NavLink to={"/bills"} className="w-14 h-14 flex justify-center items-center rounded-full nav_link">
        <Card />
      </NavLink>
      <NavLink to={"/budget"} className="w-14 h-14 flex justify-center items-center rounded-full nav_link">
        <Chart />
      </NavLink>
      <NavLink to={"/date"} className="w-14 h-14 flex justify-center items-center rounded-full nav_link">
        <Date />
      </NavLink>
    </div>
  );
};

export default Navigation;
