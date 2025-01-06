import UserNavbar from "@/components/user-navbar/UserNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import OperationCards from "@/components/operation-cards/OperationCards";
import Plus from "@/assets/icons/plus";
import { IGroups, useGetGroupsBalance } from "@/data/hooks/groups";
import { Fragment, useEffect } from "react";
import formatBalance from "@/constants/useFormatBalance";
import { useOperation } from "@/data/hooks/operation";
import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import Cash from "@/assets/icons/cash";
import PlansCards from "@/components/plans/PlansCards";
import clsx from "clsx";
import Heart from "@/assets/icons/heart";
import Savings from "@/assets/icons/savings";

const Card = () => {
  const navigate = useNavigate();
  const { card } = useParams();

  const { groupsBudget, fetchGroups, isLoading } = useGetGroupsBalance();

  const { getCardOperations, operations } = useOperation();

  const oprationsValue = operations?.reduce((total, operation) => {
    return total + +(operation.value || 0);
  }, 0);

  useEffect(() => {
    fetchGroups();
    if (card) {
      getCardOperations(card);
    }
  }, []);

  const group: IGroups[] | undefined = groupsBudget?.filter(
    (group) => group.name === card,
  );

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
      {group?.map((group, index) => (
        <Fragment key={index}>
          <div className="px-4 flex items-center justify-center flex-col">
            <div className="w-14 h-14 bg-FFFFFF-15 flex items-center justify-center rounded-full">
              {card === "Necessary" && <Cash />}
              {card === "Desired" && <Heart />}
              {card === "Savings" && <Savings />}
            </div>
            <p className="text-2xl font-bold font-unbounded text-white">
              {card}
            </p>
            <p className="text-FFFFFF-50 text-10 font-unbounded font-medium">
              50% от общего бюджета
            </p>
          </div>
          {card === "Savings" ? (
            <div className="grid grid-cols-2 px-4 gap-1 mt-10">
              <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
                <p className="font-bold font-unbounded text-white">
                  {oprationsValue
                    ? formatBalance(Number(group.value) - oprationsValue)
                    : formatBalance(group.value)}
                  cym
                </p>
                <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                  бюджет на день
                </p>
              </div>
              <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
                <p className="font-bold font-unbounded text-white">
                  {formatBalance(group.value)} cym
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
                  {formatBalance(group.dailyValue)} cym
                </p>
                <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                  бюджет на день
                </p>
              </div>
              <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
                <p className="font-bold font-unbounded text-white">
                  {formatBalance(group.value)} cym
                </p>
                <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                  бюджет на день
                </p>
              </div>
              <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
                <p className="font-bold font-unbounded text-00BF33">
                  {oprationsValue
                    ? formatBalance(
                        Number(group.dailySpendValue) - oprationsValue,
                      )
                    : formatBalance(group.dailySpendValue)}
                  cym
                </p>
                <p className="font-unbounded font-normal text-10 text-FFFFFF-50">
                  бюджет на день
                </p>
              </div>
              <div className="bg-1B1A1E-50 rounded-2xl p-3 flex items-center justify-center flex-col border-[.5px] border-1B1A1E-100">
                <p className="font-bold font-unbounded text-00BF33">
                  {oprationsValue
                    ? formatBalance(Number(group.spendValue) - oprationsValue)
                    : formatBalance(group.spendValue)}
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
            <div className="fixed bottom-6 left-[50%] translate-x-[-50%] border-4 border-00BF33-12 rounded-full shadow-green-shadow backdrop-blur-50">
              <Link
                to={"add-expense"}
                className="h-60px w-60px bg-00BF33 flex items-center justify-center rounded-full backdrop-blur-[50px]"
              >
                <Plus />
              </Link>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Card;
