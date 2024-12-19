import UserNavbar from "@/components/user-navbar/UserNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnalyticsChart from "./Chart";
import OperationCards from "@/components/operation-cards/OperationCards";
import Plus from "@/assets/icons/plus";
import { IGroups, useGetGroups } from "@/data/hooks/groups";
import { Fragment, useEffect } from "react";
import formatBalance from "@/constants/useFormatBalance";
import NecessaryIcon from "@/assets/icons/necessaryIcon";
import { useOperation } from "@/data/hooks/operation";
import ArrowLeftShort from "@/assets/icons/arrowLeftShort";

const Card = () => {
  const navigate = useNavigate();
  const { card } = useParams();

  const { groups, fetchGroups, isLoading } = useGetGroups();

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

  const group: IGroups[] | undefined = groups?.filter(
    (group) => group.name === card,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserNavbar
        leftIconBoxClick={() => navigate(-1)}
        leftIcon={<ArrowLeftShort />}
        rightIconBoxClass="bg-inherit"
        leftIconBoxClass="bg-inherit w-max"
      />
      {group?.map((group, index) => (
        <Fragment key={index}>
          <div className='px-4 flex items-center justify-center flex-col'>
            <div className='w-14 h-14 bg-customGray8 flex items-center justify-center rounded-full'>
              <NecessaryIcon />
            </div>
            <p className='text-2xl font-bold font-unbounded text-customGray2'>
              {card}
            </p>
          </div>
          {card === "Сбережения" ? (
            <div className='grid grid-cols-2 px-4 gap-1 mt-10'>
              <div className='bg-customGray8 rounded-2xl p-3 flex items-center justify-center flex-col'>
                <p className='font-bold font-unbounded text-customGray2'>
                  {oprationsValue
                    ? formatBalance(Number(group.value) - oprationsValue)
                    : formatBalance(group.value)}
                  cym
                </p>
                <p className='font-unbounded font-normal text-10 text-customGray2'>
                  бюджет на день
                </p>
              </div>
              <div className='bg-customGray8 rounded-2xl p-3 flex items-center justify-center flex-col'>
                <p className='font-bold font-unbounded text-customGray2'>
                  {formatBalance(group.value)} cym
                </p>
                <p className='font-unbounded font-normal text-10 text-customGray2'>
                  бюджет на день
                </p>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-2 grid-rows-2 px-4 gap-1 mt-10'>
              <div className='bg-customGray8 rounded-2xl p-3 flex items-center justify-center flex-col'>
                <p className='font-bold font-unbounded text-customGray2'>
                  {formatBalance(group.dailyValue)} cym
                </p>
                <p className='font-unbounded font-normal text-10 text-customGray2'>
                  бюджет на день
                </p>
              </div>
              <div className='bg-customGray8 rounded-2xl p-3 flex items-center justify-center flex-col'>
                <p className='font-bold font-unbounded text-customGray2'>
                  {formatBalance(group.value)} cym
                </p>
                <p className='font-unbounded font-normal text-10 text-customGray2'>
                  бюджет на день
                </p>
              </div>
              <div className='bg-customGray8 rounded-2xl p-3 flex items-center justify-center flex-col'>
                <p className='font-bold font-unbounded text-customGray2'>
                  {oprationsValue
                    ? formatBalance(
                        Number(group.dailySpendValue) - oprationsValue,
                      )
                    : formatBalance(group.dailySpendValue)}{" "}
                  cym
                </p>
                <p className='font-unbounded font-normal text-10 text-customGray2'>
                  бюджет на день
                </p>
              </div>
              <div className='bg-customGray8 rounded-2xl p-3 flex items-center justify-center flex-col'>
                <p className='font-bold font-unbounded text-customGray2'>
                  {oprationsValue
                    ? formatBalance(Number(group.spendValue) - oprationsValue)
                    : formatBalance(group.spendValue)}
                  cym
                </p>
                <p className='font-unbounded font-normal text-10 text-customGray2'>
                  бюджет на день
                </p>
              </div>
            </div>
          )}
          <div className='px-4 mt-6'>
            <div className='bg-customGray p-3 rounded-25 flex flex-col gap-4 mb-6'>
              <AnalyticsChart />
            </div>
            <OperationCards />
            <Link
              to={"add-expense"}
              className='fixed bottom-6 left-[50%] translate-x-[-50%] border-2 border-customGray6 rounded-full shadow-customshadow'
            >
              <div className='h-68 w-68 bg-customGray2 flex items-center justify-center rounded-full backdrop-blur-[50px]'>
                <Plus />
              </div>
            </Link>
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default Card;
