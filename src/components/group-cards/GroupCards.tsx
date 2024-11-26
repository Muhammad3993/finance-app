import Desires from "@/assets/icons/desires";
import Free from "@/assets/icons/free";
import Necessary from "@/assets/icons/necessary";
import Saving from "@/assets/icons/saving";
import formatBalance from "@/constants/useFormatBalance";
import useUserData from "@/constants/useUserData";
import { Link } from "react-router-dom";

export default function GroupCards() {
  const userData = useUserData();

  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-3 px-4'>
      <Link
        to={"/card/necessary"}
        className={`col-span-1 last:col-span-2 bg-customGray p-3.5 rounded-22 first:col-span-1 first:row-span-2 h-full first:flex first:flex-col justify-between`}
      >
        <div className='flex items-center gap-2'>
          <Necessary />
          <p className='text-10 font-medium font-unbounded text-customGray2'>
            Необходимые
          </p>
        </div>
        <div>
          <p className='text-customGray2 font-bold font-unbounded'>
            {formatBalance(userData.necessary)} сум
          </p>
          <p className='text-customGray2 opacity-50 text-10 font-unbounded'>
            осталось на ноябрь
          </p>
          <div className='w-full h-9 bg-customGray3 rounded-25 overflow-hidden mt-2'>
            <div className='w-[50%] h-full bg-customGray2 rounded-25'></div>
          </div>
        </div>
      </Link>
      <div
        className={`col-span-1 last:col-span-2 bg-customGray p-3.5 rounded-22 first:col-span-1 first:row-span-2 h-full flex flex-col gap-4`}
      >
        <div className='flex items-center gap-2'>
          <Desires />
          <p className='text-10 font-medium font-unbounded text-customGray2'>
            Желания
          </p>
        </div>
        <div>
          <p className='text-customGray2 font-bold font-unbounded'>
            {formatBalance(userData.desires)} сум
          </p>
          <p className='text-customGray2 opacity-50 text-10 font-unbounded'>
            осталось на ноябрь
          </p>
          <div className='w-full h-9 bg-customGray3 rounded-25 overflow-hidden mt-2'>
            <div className='w-[50%] h-full bg-customGray2 rounded-25'></div>
          </div>
        </div>
      </div>
      <div
        className={`col-span-1 last:col-span-2 bg-customGray p-3.5 rounded-22 first:col-span-1 first:row-span-2 h-full flex flex-col gap-4`}
      >
        <div className='flex items-center gap-2'>
          <Saving />
          <p className='text-10 font-medium font-unbounded text-customGray2'>
            Сбережения
          </p>
        </div>
        <div>
          <p className='text-customGray2 font-bold font-unbounded'>
            {formatBalance(userData.savingNeed)} сум
          </p>
          <p className='text-customGray2 opacity-50 text-10 font-unbounded'>
            осталось на ноябрь
          </p>
          <div className='w-full h-9 bg-customGray3 rounded-25 overflow-hidden mt-2'>
            <div className='w-[50%] h-full bg-customGray2 rounded-25'></div>
          </div>
        </div>
      </div>
      <div
        className={`col-span-1 last:col-span-2 bg-customGray p-3.5 rounded-22 first:col-span-1 first:row-span-2 h-full last:flex justify-between`}
      >
        <div className='flex items-center gap-2'>
          <Free />
          <div>
            <p className='text-10 font-medium font-unbounded text-customGray2'>
              Свободные
            </p>
            <p className='text-8 font-unbounded font-normal text-customGray2 opacity-50'>
              не входят в бюджет
            </p>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-customGray2 font-bold font-unbounded'>
            {formatBalance(userData.reminderCash)} сум
          </p>
          <p className='text-customGray2 opacity-50 text-10 font-unbounded'>
            осталось на ноябрь
          </p>
        </div>
      </div>
    </div>
  );
}
