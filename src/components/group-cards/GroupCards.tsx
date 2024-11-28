import CloseIcon from "@/assets/icons/closeIcon";
import Free from "@/assets/icons/free";
import formatBalance from "@/constants/useFormatBalance";
import useUserData from "@/constants/useUserData";
import { Link } from "react-router-dom";

export default function GroupCards() {
  const userData = useUserData();

  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-3 px-4'>
      <Link
        to={"/card/necessary"}
        className={`col-span-1 last:col-span-2 bg-customGray p-3.5 rounded-22 first:col-span-2 first:row-span-2 h-full first:flex first:flex-col justify-between relative`}
      >
        <div className='flex items-center gap-2'>
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
        <div className='p-1 rounded-7 bg-customGray7 w-max text-10 font-bold font-unbounded text-customGray2 absolute top-[15px] right-[15px]'>
          50%
        </div>
      </Link>
      <div
        className={`col-span-1 last:col-span-2 bg-customGray p-3.5 rounded-22 first:col-span-1 first:row-span-2 h-full flex flex-col gap-4 relative`}
      >
        <div className='flex items-center gap-2'>
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
        <div className='p-1 rounded-7 bg-customGray7 w-max text-10 font-bold font-unbounded text-customGray2 absolute top-[15px] right-[15px]'>
          50%
        </div>
      </div>
      <div
        className={`col-span-1 last:col-span-1 bg-customGray p-3.5 rounded-22 first:col-span-1 first:row-span-2 h-full flex flex-col gap-4 relative`}
      >
        <div className='flex items-center gap-2'>
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
        <div className='p-1 rounded-7 bg-customGray7 w-max text-10 font-bold font-unbounded text-customGray2 absolute top-[15px] right-[15px]'>
          50%
        </div>
      </div>
      <div
        className={`col-span-1 last:col-span-2 bg-customGray8 p-3.5 rounded-25 first:col-span-1 first:row-span-2 h-full last:flex justify-between`}
      >
        <div className='flex gap-4'>
          <Free />
          <div>
            <p className='text-sm font-unbounded font-bold text-customGray2'>250 тыс. сум</p>
            <p className="text-10 font-normal font-unbounded text-customGray2 opacity-50">Не входят в бюджет</p>
            <div className='font-unbounded font-medium text-8 border border-customGray2 w-max py-2 px-3 rounded-25 mt-3'>
              Добавить
            </div>
          </div>
        </div>
        <div>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
