import Card from "@/assets/icons/card";
import Transport from "@/assets/icons/transport";
import { Link } from "react-router-dom";

const OperationCards = () => {
  return (
    <div className="pb-4">
      <div className='flex justify-between'>
        <p className='text-customGray2 text-xs opacity-65 font-normal font-unbounded'>
          Операции
        </p>
        <Link
          to={""}
          className='text-customGray2 text-xs font-normal font-unbounded'
        >
          Все операции
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <div className='flex flex-col bg-customGray rounded-2xl p-3 gap-2'>
          <div className='flex justify-between'>
            <p className='text-13 font-medium font-unbounded text-customGray2'>
              - 1700 <span className='text-10'>сум</span>
            </p>
            <p className='text-10 font-normal text-customGray2 opacity-35'>
              24 ноя 2024
            </p>
          </div>
          <div className="flex gap-1">
            <div className='py-1 px-6 bg-customGray5 w-max flex items-center gap-61 rounded-25'>
              <Card width={12} height={12} />
              <p className='text-customGray2 text-8 font-unbounded font-normal'>
                HUMO 4820*
              </p>
            </div>      <div className='py-1 px-6 bg-customGray5 w-max flex items-center gap-61 rounded-25'>
              <Transport />
              <p className='text-customGray2 text-8 font-unbounded font-normal'>
                HUMO 4820*
              </p>
            </div>
          </div>
        </div>        <div className='flex flex-col bg-customGray rounded-2xl p-3 gap-2'>
          <div className='flex justify-between'>
            <p className='text-13 font-medium font-unbounded text-customGray2'>
              - 1700 <span className='text-10'>сум</span>
            </p>
            <p className='text-10 font-normal text-customGray2 opacity-35'>
              24 ноя 2024
            </p>
          </div>
          <div className="flex gap-1">
            <div className='py-1 px-6 bg-customGray5 w-max flex items-center gap-61 rounded-25'>
              <Card width={12} height={12} />
              <p className='text-customGray2 text-8 font-unbounded font-normal'>
                HUMO 4820*
              </p>
            </div>      <div className='py-1 px-6 bg-customGray5 w-max flex items-center gap-61 rounded-25'>
              <Transport />
              <p className='text-customGray2 text-8 font-unbounded font-normal'>
                HUMO 4820*
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCards;
