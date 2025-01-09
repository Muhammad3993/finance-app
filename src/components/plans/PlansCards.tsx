import CalendarIcon from "@/assets/icons/calendar";
import { useOperation } from "@/data/hooks/operation";
import { Link, useParams } from "react-router-dom";

const PlansCards = () => {
  const { card } = useParams();

  const { data: operations } = useOperation(card);

  return (
    <div className="pb-4">
      <div className="flex justify-between items-center">
        <p className="font-unbounded font-medium text-white">Планы</p>
        <Link
          to={""}
          className="font-unbounded font-medium text-10 text-00BF33 flex items-center justify-center bg-00BF33-12 py-6 px-3 rounded-25"
        >
          Смотреть все
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {operations === null ? (
          // operations?.map((operation: IOperationData, index: number) => (
          //   <div className="flex justify-between items-start" key={index}>
          //     <div className="flex items-center gap-3">
          //       <div className="w-11 h-11 flex items-center justify-center bg-FAC21C-12 rounded-full">
          //         <Home fill="#FAC21C" />
          //       </div>
          //       <div>
          //         <p className="font-unbounded font-normal text-xs text-white leading-4">
          //           {operation.category?.name}
          //         </p>
          //         <div className="flex items-center gap-1">
          //           <CardIcons />
          //           <p className="font-normal font-unbounded text-9 text-FFFFFF-50 leading-5">
          //             Основной
          //           </p>
          //         </div>
          //       </div>
          //     </div>
          //     <p className="font-unbounded font-medium text-xs text-white">
          //       {card === "Сбережения" ? "+" : "-"}
          //       {formatBalance(operation.value)}сум
          //     </p>
          //   </div>
          // ))
          ""
        ) : (
          <div className="flex flex-col items-center justify-center h-20 w-full gap-4">
            <CalendarIcon />
            <p className="text-FFFFFF-25 text-9 font-unbounded font-normal">
              Все плановые расходы введены
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansCards;
