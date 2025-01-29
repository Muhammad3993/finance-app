import CircleFill from "@/assets/icons/circleFill";
import CircleTrue from "@/assets/icons/circleTrue";
import Things from "@/assets/icons/things";
import { useAddOperation } from "@/data/hooks/operations";
import { IPlan, useEditPlan } from "@/data/hooks/plans";
import { IOperationData } from "@/pages/add-expense/AddExpense";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IProps {
  plan: IPlan;
  minWidth?: boolean;
}

const PlansCard = (props: IProps) => {
  const { plan, minWidth } = props;
  const id: string | undefined = plan.id;
  const [isClicked, setIsClicked] = useState(plan.is_done);

  const { mutate: handleSaveOperation } = useAddOperation();
  const { mutate: handleSavePlan } = useEditPlan();

  const handleIconClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsClicked(!plan.is_done);

    const operationData: IOperationData = {
      card: plan.card,
      category: plan.category,
      date: new Date().toString(),
      description: "",
      monthDay: null,
      repeat: 0,
      type: "Necessary",
      value: plan.value,
      weekDay: null,
      planId: plan.id,
    };

    const planData: IPlan = {
      ...plan,
      is_done: !plan.is_done,
    };

    handleSaveOperation(operationData);
    if (id) {
      handleSavePlan({ planData, id });
    }
  };
  return (
    <Link
      to={`/plans/${plan.id}`}
      className={clsx(
        "w-full h-20 flex items-center justify-between bg-1B1A1E-100 rounded-25 p-5",
        minWidth && "min-w-full",
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-4",
          plan.is_done && "opacity-50",
        )}
      >
        <div className="w-10 h-10 rounded-xl p-10p bg-FA531C">
          <Things />
        </div>
        <div>
          <p className="leading-4 font-unbounded font-medium text-13 text-white">
            {plan?.category?.name}
          </p>
          <p className="leading-14 font-normal font-unbounded text-10 text-FFFFFF-50">
            Продукты – 3 ноября
          </p>
        </div>
      </div>
      <button onClick={(e) => handleIconClick(e)} disabled={isClicked}>
        {!plan.is_done ? <CircleTrue /> : <CircleFill />}
      </button>
    </Link>
  );
};

export default PlansCard;
