import UserNavbar from "@/components/user-navbar/UserNavbar";
import { useNavigate, useParams } from "react-router-dom";
import OperationCards from "@/components/operation-cards/OperationCards";
import {
  IGroups,
  useGetGroups,
  useGetGroupsBalance,
} from "@/data/hooks/groups";
import { Fragment, useEffect } from "react";
import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import Cash from "@/assets/icons/cash";
import PlansCards from "@/components/plans/PlansCards";
import clsx from "clsx";
import Heart from "@/assets/icons/heart";
import Savings from "@/assets/icons/savings";
import PlusComponent from "@/components/plus/Plus";
import { formatBalance } from "@/constants/useFormatBalance";
import { useGetOperations } from "@/data/hooks/operations";

const Card = () => {
  const navigate = useNavigate();
  const { card } = useParams();

  const { groupsBudget, fetchGroups, isLoading } = useGetGroupsBalance();

  const { data: operations } = useGetOperations(card, "Cash");

  const oprationsValue = operations?.reduce((total, operation) => {
    return total + +(operation.value || 0);
  }, 0);
  const { data: budgetGroups } = useGetGroups();

  useEffect(() => {
    fetchGroups();
  }, []);

  const group: IGroups | undefined = groupsBudget?.filter(
    (group: IGroups) => group.name === card,
  )[0];
  const groupBudget: IGroups | undefined = budgetGroups?.filter(
    (group: IGroups) => group.name === card,
  )[0];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pb-[100px]">
      <UserNavbar
        leftIconBoxClick={() => navigate(-1)}
        leftIcon={<ArrowLeftShort />}
        isText
        text={card}
        textClass="text-white"
        rightIconBoxClass="bg-inherit"
        leftIconBoxClass="bg-inherit justify-start"
      />

      <div
        className={clsx(
          "bg-00BF33 w-full h-[390px] blur-[150px] fixed z-[-1] -top-[320px]",
          card === "Desired" && "bg-[#3300BF]",
          card === "Savings" && "bg-[#008CBF]",
        )}
      ></div>
      <Fragment>
        <div className="px-4 flex items-center justify-center flex-col">
          <div className="w-14 h-14 bg-FFFFFF-15 flex items-center justify-center rounded-full">
            {card === "Necessary" && <Cash />}
            {card === "Desired" && <Heart />}
            {card === "Savings" && <Savings />}
          </div>
          <p className="text-2xl font-bold font-unbounded text-white">{card}</p>
          <p className="text-FFFFFF-50 text-10 font-unbounded font-medium">
            50% от общего бюджета
          </p>
        </div>
        {card === "Savings" ? (
          <div className="grid grid-cols-2 px-4 gap-1 mt-10">
            <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
              <p className="font-bold font-unbounded text-white">
                {oprationsValue
                  ? formatBalance(Number(group?.value) - oprationsValue)
                  : formatBalance(group?.value)}
                cym
              </p>
              <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                бюджет на день
              </p>
            </div>
            <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
              <p className="font-bold font-unbounded text-white">
                {formatBalance(group?.value)} cym
              </p>
              <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                бюджет на день
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 px-4 gap-1 mt-10">
            <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
              <p className="font-bold font-unbounded text-white">
                {formatBalance(groupBudget?.dailyValue)} cym
              </p>
              <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                бюджет на день
              </p>
            </div>
            <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
              <p className="font-bold font-unbounded text-white">
                {formatBalance(groupBudget?.value)} cym
              </p>
              <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                бюджет на день
              </p>
            </div>
            <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
              <p className="font-bold font-unbounded text-00BF33">
                {oprationsValue
                  ? formatBalance(
                      Number(group?.dailySpendValue) - oprationsValue,
                    )
                  : formatBalance(group?.dailySpendValue)}
                cym
              </p>
              <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                бюджет на день
              </p>
            </div>
            <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
              <p className="font-bold font-unbounded text-00BF33">
                {oprationsValue
                  ? formatBalance(Number(group?.spendValue) - oprationsValue)
                  : formatBalance(group?.spendValue)}
                cym
              </p>
              <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                бюджет на день
              </p>
            </div>
          </div>
        )}
        <div className="px-4 mt-6">
          {/* <div className='rounded-25 flex flex-col gap-4 mb-6'>
              <AnalyticsChart />
            </div> */}
          <OperationCards />
          <PlansCards />
          <PlusComponent link="add-expense" />
        </div>
      </Fragment>
    </div>
  );
};

export default Card;
