import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import Cash from "@/assets/icons/cash";
import Coin from "@/assets/icons/coin";
import Savings from "@/assets/icons/savings";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import formatBalance from "@/constants/useFormatBalance";
import { useDaysInCurrentMonth } from "@/constants/useMonthDays";
import useGetCards from "@/data/hooks/currencies";
import { IGroups, usePostGroups } from "@/data/hooks/groups";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart } from "recharts";

const FInish = () => {
  const navigate = useNavigate();

  const { cards, isLoading, fetchAllCard } = useGetCards();
  const { createGroup } = usePostGroups();
  const { daysInMonth } = useDaysInCurrentMonth();

  useEffect(() => {
    fetchAllCard();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const finance = cards
    ?.slice(0)
    ?.map((card) => card.card_finance)
    .toString();

  const firstValue = (Number(finance) * 50) / 100;
  const secondValue = (Number(finance) * 30) / 100;
  const thirdValue = (Number(finance) * 20) / 100;

  const dailyValueNeed = +(firstValue / daysInMonth).toFixed(2);
  const dailyValueCul = +(secondValue / daysInMonth).toFixed(2);

  const groups: IGroups[] = [
    {
      name: "Necessary",
      value: firstValue,
      spendValue: firstValue,
      dailyValue: dailyValueNeed,
      dailySpendValue: dailyValueNeed,
    },
    {
      name: "Desired",
      value: secondValue,
      spendValue: secondValue,
      dailyValue: dailyValueCul,
      dailySpendValue: dailyValueCul,
    },
    {
      name: "Savings",
      value: thirdValue,
      spendValue: thirdValue,
    },
  ];

  const data = [
    { value: thirdValue, color: "rgba(255, 255, 255, .25)" },
    { value: secondValue, color: "rgba(255, 255, 255, 0.5)" },
    { value: firstValue, color: "rgba(255, 255, 255, 1)" },
  ];

  return (
    <div className="bg-green-gradient h-full flex flex-col justify-between overflow-y-auto">
      <div>
        <UserNavbar
          leftIcon={<ArrowLeftShort />}
          leftIconBoxClick={() => navigate(-1)}
        />
        <div className="px-4">
          <p className="font-unbounded font-bold text-2xl text-white text-center">
            Ваш бюджет <br /> распределен
          </p>
          <div className="h-240 w-240 relative mt-24 m-auto">
            <PieChart
              width={240}
              height={240}
              className="border-none outline-none -rotate-90"
            >
              <Pie
                stroke="none"
                data={data}
                innerRadius={85}
                outerRadius={110}
                cornerRadius={6}
                dataKey="value"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    style={{ outline: "none" }}
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
            <div className="w-44 h-28 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
              <p className="text-white text-2xl font-semibold font-unbounded leading-22">
                50/30/20
              </p>
              <p className="text-10 font-unbounded font-normal text-FFFFFF-50">
                Стандартная
              </p>
            </div>
          </div>
          <div className="bg-FFFFFF-15 rounded-25 mt-12">
            <div className="flex py-4 px-5 items-center justify-between">
              <div className="flex items-center gap-4">
                <Cash width={24} height={25} />
                <div>
                  <p className="text-13 font-medium font-unbounded text-white leading-4">
                    Необходимые расходы
                  </p>
                  <p className="text-10 text-FFFFFF-50 font-medium font-unbounded leading-[14px] ">
                    {formatBalance(firstValue)} сум
                  </p>
                </div>
              </div>
              <div className="bg-FFFFFF-25 w-52 h-8 flex items-center justify-center rounded-[100px] text-white text-xs font-medium font-unbounded">
                50%
              </div>
            </div>
            <div className="flex py-4 px-5 items-center justify-between">
              <div className="flex items-center gap-4">
                <Coin fill="#ffffff" />
                <div>
                  <p className="text-13 font-medium font-unbounded text-white leading-4">
                    Желаемые расходы
                  </p>
                  <p className="text-10 text-FFFFFF-50 font-medium font-unbounded leading-[14px] ">
                    {formatBalance(secondValue)} сум
                  </p>
                </div>
              </div>
              <div className="bg-FFFFFF-25 w-52 h-8 flex items-center justify-center rounded-[100px] text-white text-xs font-medium font-unbounded">
                30%
              </div>
            </div>
            <div className="flex py-4 px-5 items-center justify-between">
              <div className="flex items-center gap-4">
                <Savings width={24} height={24} />
                <div>
                  <p className="text-13 font-medium font-unbounded text-white leading-4">
                    Сбережения
                  </p>
                  <p className="text-10 text-FFFFFF-50 font-medium font-unbounded leading-[14px] ">
                    {formatBalance(thirdValue)} сум
                  </p>
                </div>
              </div>
              <div className="bg-FFFFFF-25 w-52 h-8 flex items-center justify-center rounded-[100px] text-white text-xs font-medium font-unbounded">
                20%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 mb-8 mt-8">
        <div
          className="w-full py-4 text-black bg-white text-center rounded-50 text-xs font-medium font-unbounded"
          onClick={() => {
            createGroup(groups);
            navigate("/");
          }}
        >
          Далее
        </div>
      </div>
    </div>
  );
};

export default FInish;
