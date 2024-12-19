import Card from "@/assets/icons/card";
import Chart from "@/assets/icons/chart";
import Coin from "@/assets/icons/coin";
import Date from "@/assets/icons/date";
import { NavLink } from "react-router-dom";
import "./navigation.css";
import User from "@/assets/icons/user";

const Navigation = () => {
  return (
    <div className='w-max fixed bottom-6 left-[50%] translate-x-[-50%] flex items-center gap-2 p-2 bg-FFFFFF-8 rounded-50 backdrop-blur-[100px]'>
      <NavLink
        to={"/"}
        className='w-14 h-14 flex justify-center items-center rounded-full nav_link'
      >
        <Coin fill='white' />
      </NavLink>
      <NavLink
        to={"/bills"}
        className='w-14 h-14 flex justify-center items-center rounded-full nav_link'
      >
        <Card fill='white' />
      </NavLink>
      <NavLink
        to={"/date"}
        className='w-14 h-14 flex justify-center items-center rounded-full nav_link'
      >
        <Date fill='white' />
      </NavLink>
      <NavLink
        to={"/budget"}
        className='w-14 h-14 flex justify-center items-center rounded-full nav_link'
      >
        <Chart fill='white' />
      </NavLink>
      <NavLink
        to={"/user"}
        className='w-14 h-14 flex justify-center items-center rounded-full nav_link'
      >
        <User fill='white' />
      </NavLink>
    </div>
  );
};

export default Navigation;
