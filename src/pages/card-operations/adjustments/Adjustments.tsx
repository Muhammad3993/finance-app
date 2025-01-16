import CalendarIcon from "@/assets/icons/calendar";
import CardOperation from "@/components/card-operation/CardOperation";
import { formatBalance } from "@/constants/useFormatBalance";
import {
  ICardOperation,
  useGetCardOperations,
} from "@/data/hooks/card-operations";
import { useParams } from "react-router-dom";

const Adjustments = () => {
  const { bill } = useParams();
  const { data: cardOperations, isLoading } = useGetCardOperations(bill);

  const cardOperationsValue =
    cardOperations?.reduce(
      (acc, cardOperation) => acc + cardOperation.value,
      0,
    ) || 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {cardOperations === null ? (
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
              – {formatBalance(cardOperationsValue)} сум
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-4">
            {cardOperations?.map((operation: ICardOperation, i: number) => (
              <CardOperation operation={operation} key={i} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Adjustments;
