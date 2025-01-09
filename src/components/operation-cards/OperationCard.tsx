import CardIcons from "@/assets/icons/cardicons";
import Home from "@/assets/icons/home";
import formatBalance from "@/constants/useFormatBalance";
import { IOperationData } from "@/pages/add-expense/AddExpense";

interface IProps {
  operation: IOperationData;
  bill?: string;
}

const OperationCard = (props: IProps) => {
  const { operation, bill } = props;
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 flex items-center justify-center bg-FAC21C-12 rounded-full">
          <Home fill="#FAC21C" />
        </div>
        <div className="flex justify-around flex-col">
          <p className="font-unbounded font-normal text-xs text-white leading-4">
            {operation.category?.name}
          </p>
          <div className="flex items-center gap-1 mt-[1px]">
            <CardIcons />
            <p className="font-normal font-unbounded text-9 text-FFFFFF-50 leading-5">
              Основной
            </p>
          </div>
        </div>
      </div>
      <p className="font-unbounded font-medium text-xs text-white mt-[5px]">
        {bill && "-"}
        {formatBalance(operation.value)}сум
      </p>
    </div>
  );
};

export default OperationCard;
