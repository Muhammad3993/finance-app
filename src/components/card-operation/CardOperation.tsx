import Minus from "@/assets/icons/minus";
import Plus from "@/assets/icons/plus";
import { formatBalance } from "@/constants/useFormatBalance";
import { ICardOperation } from "@/data/hooks/card-operations";
import clsx from "clsx";

interface IProps {
  operation: ICardOperation;
}

const CardOperation = (props: IProps) => {
  const { operation } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            "bg-1CFA52-12 w-12 h-12 rounded-2xl flex items-center justify-center",
            operation.type === "minus" && "bg-DE3A31-12",
          )}
        >
          {operation.type === "minus" ? (
            <Minus fill="#DE3A31" />
          ) : (
            <Plus width={16} height={16} fill="#00BF33" />
          )}
        </div>
        <p className="font-medium font-unbounded text-xs text-white">
          Корректировка
        </p>
      </div>
      <p
        className={clsx(
          "font-medium font-unbounded text-xs text-00BF33",
          operation.type === "minus" && "text-DE3A31",
        )}
      >
        {operation.type === "minus" ? "" : "+"} {formatBalance(operation.value)}
      </p>
    </div>
  );
};

export default CardOperation;
