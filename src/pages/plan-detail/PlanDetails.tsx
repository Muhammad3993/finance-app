import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import Card from "@/assets/icons/card";
import CircleFill from "@/assets/icons/circleFill";
import CircleTrue from "@/assets/icons/circleTrue";
import LostIcon from "@/assets/icons/lostIcon";
import ReverseIcon from "@/assets/icons/reverseIcon";
import { SettingMemo } from "@/assets/icons/setting";
import Things from "@/assets/icons/things";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import SettingsModal from "./modal/SettingsModal";
import { useState } from "react";
import { IPlan, useEditPlan, useGetPlan } from "@/data/hooks/plans";
import { formatOperation } from "@/constants/useFormatBalance";
import FindIcon from "@/assets/icons/findIcon";
import clsx from "clsx";
import Salary from "@/assets/icons/salary";
import { IOperationData } from "../add-expense/AddExpense";
import { useAddOperation, useGetOperations } from "@/data/hooks/operations";
import { useQueryClient } from "@tanstack/react-query";
import ArrowRight from "@/assets/icons/arrowRight";

const PlanDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [isOpenSettingsModal, setIsOpenSettingsModal] =
    useState<boolean>(false);

  const { data: plan, isLoading } = useGetPlan(id || "");
  const { data: operations } = useGetOperations(undefined, undefined, id);


  const [isClicked, setIsClicked] = useState(plan?.is_done);

  const { mutate: handleSaveOperation } = useAddOperation();
  const { mutate: handleSavePlan } = useEditPlan();

  const handleIconClick = () => {
    if (!plan) return;

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
      planId: id,
    };

    const planData: IPlan = {
      ...plan,
      is_done: !plan.is_done,
    };

    handleSaveOperation(operationData);
    if (id) {
      handleSavePlan(
        { planData, id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["plan"],
            });
          },
        },
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserNavbar
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClick={() => navigate(-1)}
        rightIcon={<SettingMemo />}
        rightIconBoxClick={() => setIsOpenSettingsModal(true)}
      />
      <div className="px-4">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div
            className={clsx(
              "w-20 h-20 flex items-center justify-center rounded-full",
              plan?.type === "incomes" ? "bg-00BF33" : "bg-DE3A31",
            )}
          >
            {plan?.type === "incomes" ? <FindIcon /> : <LostIcon />}
          </div>
          <p className="font-medium font-unbounded text-xs text-white">
            {plan?.type === "incomes" ? "Плановый доход" : "Плановый расход"}
          </p>
        </div>
        <div
          className={clsx(
            "mt-24 w-full h-82 flex items-center justify-center rounded-25",
            plan?.type === "incomes" ? "bg-00BF33-12" : "bg-DE3A31-12",
          )}
        >
          <p
            className={clsx(
              "font-bold font-unbounded text-2xl",
              plan?.type === "incomes" ? "text-00BF33" : "text-DE3A31",
            )}
          >
            – {formatOperation(plan?.value || 0)} UZS
          </p>
        </div>
        <div className="flex items-center justify-between py-24 px-4 gap-2 bg-1B1A1E-50 rounded-25 mt-4">
          <div className="flex-1 gap-4 flex flex-col items-center justify-center">
            <div
              className={clsx(
                "w-14 h-14 flex items-center justify-center rounded-full",
                plan?.type === "incomes" ? "bg-00BF33-12" : "bg-DE3A31-12",
              )}
            >
              <Card fill={plan?.type === "incomes" ? "#00BF33" : "#DE3A31"} />
            </div>
            <p className="text-9 font-unbounded font-medium text-white">
              {plan?.card?.card_name}
            </p>
          </div>
          <div className="flex-1 gap-4 flex flex-col items-center justify-center">
            <div
              className={clsx(
                "w-14 h-14 flex items-center justify-center rounded-full",
                plan?.type === "incomes" ? "bg-00BF33-12" : "bg-DE3A31-12",
              )}
            >
              {plan?.type === "incomes" ? (
                <Salary />
              ) : (
                <Things fill="#DE3A31" width={24} height={24} />
              )}
            </div>
            <p className="text-9 font-unbounded font-medium text-white">
              {plan?.category?.name}
            </p>
          </div>
          <div className="flex-1 gap-4 flex flex-col items-center justify-center">
            <div
              className={clsx(
                "w-14 h-14 flex items-center justify-center rounded-full",
                plan?.type === "incomes" ? "bg-00BF33-12" : "bg-DE3A31-12",
              )}
            >
              <ReverseIcon
                fill={plan?.type === "incomes" ? "#00BF33" : "#DE3A31"}
              />
            </div>
            <p className="text-9 font-unbounded font-medium text-white">
              {plan?.repeat}
            </p>
          </div>
        </div>
        {operations?.length !== 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between">
              <p className="text-base font-unbounded font-medium  text-white ">
                История
              </p>
              <Link
                to={""}
                className="py-6 px-3 bg-00BF33-12 text-00BF33 rounded-25 text-10 font-unbounded font-medium  "
              >
                Смотреть все
              </Link>
            </div>
            <div className="flex flex-col bg-1B1A1E-50 rounded-20 mt-4">
              {operations?.map((operation: IOperationData, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center h-11 border-b border-1B1A1E-100 last:border-none px-4"
                >
                  <p className="font-unbounded text-xs font-medium text-FFFFFF-50">
                    {/* {operation.date} */}
                    11 декабря
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-00BF33 font-unbounded font-medium text-xs">
                      {operation.value}
                    </p>
                    <ArrowRight fill="#FFFFFF80" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between bg-1B1A1E-50 backdrop-blur-100 py-4 px-5 bottom-6 fixed right-2 left-2 rounded-25">
          <div className="flex flex-col gap-1">
            <p className="font-normal font-unbounded text-9 text-00BF33 leading-3">
              Запланировано – 5 ноября, 2024
            </p>
            <p className="font-medium font-unbounded text-xs leading-4 text-white">
              {formatOperation(plan?.value || 0)} UZS
            </p>
          </div>
          <button onClick={() => handleIconClick()} disabled={isClicked}>
            {!plan?.is_done ? <CircleTrue /> : <CircleFill />}
          </button>
        </div>
      </div>
      <SettingsModal
        isOpenSettingsModal={isOpenSettingsModal}
        setIsOpenSettingsModal={setIsOpenSettingsModal}
        // setIsOpenDeleteModal={setIsOpenDeleteModal}
        id={id}
        type={plan?.type}
      />
    </>
  );
};

export default PlanDetails;
