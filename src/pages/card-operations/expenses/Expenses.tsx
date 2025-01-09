import CalendarIcon from "@/assets/icons/calendar";
import OperationCard from "@/components/operation-cards/OperationCard";
import formatBalance from "@/constants/useFormatBalance";
import { useGetCard } from "@/data/hooks/cards";
import { useOperation } from "@/data/hooks/operation";
import { useParams } from "react-router-dom";

const Expenses = () => {
  const { bill } = useParams();

  const { data: card, isLoading: isLoadingCard } = useGetCard(bill);
  const { data: operations, isLoading } = useOperation(
    undefined,
    card && card.card_name,
  );

  const operationsValue =
    operations?.reduce((acc, operation) => acc + +operation.value, 0) || 0;

  if (isLoading || isLoadingCard) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {operations === null ? (
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
              – {formatBalance(operationsValue)} сум
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-4">
            {operations?.map((operation, i: number) => (
              <OperationCard operation={operation} key={i} bill={bill} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Expenses;
