import ArrowRight from "@/assets/icons/arrowRight";
import CalendarIcon from "@/assets/icons/calendar";
import formatBalance from "@/constants/useFormatBalance";
import { useOperation } from "@/data/hooks/operation";
import { IOperationData } from "@/pages/add-expense/AddExpense";
import { Link, useParams } from "react-router-dom";
import OperationCard from "./OperationCard";

const OperationCards = () => {
  const { card } = useParams();

  const { data: operations } = useOperation(card, "Cash");

  return (
    <div className="pb-4">
      <div className="flex justify-between items-center">
        <p className="font-unbounded font-medium text-white">Операции</p>
        <Link
          to={`/card/${card}/operations`}
          className="font-unbounded font-medium text-10 text-00BF33 flex items-center justify-center bg-00BF33-12 py-6 px-3 rounded-25"
        >
          Смотреть все
        </Link>
      </div>
      {card === "Сбережения" && (
        <div className="mt-4 bg-1B1A1E-50 rounded-20">
          {operations !== null ? (
            operations?.map((operation: IOperationData, index: number) => (
              <div
                className="h-12 flex items-center justify-between py-3 px-4 border-b-[.5px] border-1B1A1E-100 last:border-none"
                key={index}
              >
                <p className="text-FFFFFF-50 font-unbounded font-medium text-xs">
                  {operation.date} декабря
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-00BF33 font-unbounded font-medium text-xs">
                    + {formatBalance(operation.value)} UZS
                  </p>
                  <ArrowRight fill="white" />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-20 w-full gap-4">
              <CalendarIcon />
              <p className="text-FFFFFF-25 text-9 font-unbounded font-normal">
                Сегодня расходов не было
              </p>
            </div>
          )}
        </div>
      )}
      {card !== "Сбережения" && (
        <div className="mt-4 flex flex-col gap-2">
          {operations !== null ? (
            operations?.map((operation: IOperationData, index: number) => (
              <OperationCard operation={operation} key={index} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-20 w-full gap-4">
              <CalendarIcon />
              <p className="text-FFFFFF-25 text-9 font-unbounded font-normal">
                Сегодня расходов не было
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OperationCards;
