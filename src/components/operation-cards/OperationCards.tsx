import Home from "@/assets/icons/home";
import formatBalance from "@/constants/useFormatBalance";
import { useOperation } from "@/data/hooks/operation";
import { IOperationData } from "@/pages/AddExpense";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const OperationCards = () => {
  const { card } = useParams();

  const { getCardOperations, operations } = useOperation();

  useEffect(() => {
    if (card) {
      getCardOperations(card);
    }
  }, []);

  return (
    <div className='pb-4'>
      <div className='flex justify-between items-center'>
        <p className='font-unbounded font-medium text-black '>Операции</p>
        <Link
          to={""}
          className='font-unbounded font-medium text-10 text-customGray2 flex items-center justify-center bg-customGray py-6 px-3 rounded-25'
        >
          Смотреть все
        </Link>
      </div>
      <div className='mt-4 flex flex-col gap-2'>
        {operations?.map((operation: IOperationData, index: number) => (
          <div className='flex justify-between items-start' key={index}>
            <div className='flex items-center gap-3'>
              <div className='w-11 h-11 flex items-center justify-center bg-customGray8 rounded-[14px]'>
                <Home />
              </div>
              <div>
                <p className='font-unbounded font-normal text-xs text-customGray2 opacity-50 leading-4'>
                  {operation.category?.name}
                </p>
                <p className='font-medium font-unbounded text-sm text-customGray2 leading-5'>
                  – {formatBalance(operation.value)}сум
                </p>
              </div>
            </div>
            <p className='font-unbounded font-normal text-10 text-customGray2 opacity-35'>
              {operation.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationCards;
