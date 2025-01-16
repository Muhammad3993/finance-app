import CalendarIcon from "@/assets/icons/calendar";
import CardIncome from "@/components/card-income/CardIncome";
import { formatBalance } from "@/constants/useFormatBalance";
import { useGetCardIncomes } from "@/data/hooks/card-income";
import { useParams } from "react-router-dom";

const IncomeCardOperation = () => {
  const { bill } = useParams();

  const { data: cardIncomes, isLoading } = useGetCardIncomes(bill);

  const cardIncomesValue =
    cardIncomes?.reduce((acc, cardIncome) => acc + +cardIncome.value, 0) || 0;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {cardIncomes === null ? (
        <div className="flex flex-col items-center justify-center h-20 w-full gap-4">
          <CalendarIcon />
          <p className="text-FFFFFF-25 text-9 font-unbounded font-normal">
            Сегодня расходов не было
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mt-4 border-b border-FFFFFF-15 pb-2">
            <p className="font-medium font-unbounded text-xs text-FFFFFF-50">
              Сегодня
            </p>
            <p className="font-medium font-unbounded text-xs text-FFFFFF-50">
              + {formatBalance(cardIncomesValue)} сум
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-4">
            {cardIncomes?.map((operation, i: number) => (
              <CardIncome operation={operation} key={i} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default IncomeCardOperation;
