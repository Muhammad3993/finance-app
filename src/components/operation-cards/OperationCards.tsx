import ArrowRight from "@/assets/icons/arrowRight";
import CalendarIcon from "@/assets/icons/calendar";
import { IOperationData } from "@/pages/add-expense/AddExpense";
import { Link, useParams } from "react-router-dom";
import OperationCard from "./OperationCard";
import { formatOperation } from "@/constants/useFormatBalance";
import { useGetOperations } from "@/data/hooks/operations";

const OperationCards = () => {
  const { card } = useParams();

  const { data: operations } = useGetOperations(card, "Cash");

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
      {card === "Savings" && (
        <div className="mt-4 bg-1B1A1E-50 rounded-20">
          {operations !== null ? (
            operations?.map((operation: IOperationData, index: number) => (
              <Link
                to={`/card/${card}/operations/${operation.id}`}
                className="h-12 flex items-center justify-between py-3 px-4 border-b-[.5px] border-1B1A1E-100 last:border-none"
                key={index}
              >
                <p className="text-FFFFFF-50 font-unbounded font-medium text-xs">
                  {operation.date} декабря
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-00BF33 font-unbounded font-medium text-xs">
                    + {formatOperation(operation.value)} UZS
                  </p>
                  <ArrowRight fill="white" />
                </div>
              </Link>
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
      {card !== "Savings" && (
        <div className="mt-4 flex flex-col gap-2">
          {operations !== null ? (
            operations?.map((operation: IOperationData, index: number) => (
              <OperationCard operation={operation} card={card} key={index} />
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
