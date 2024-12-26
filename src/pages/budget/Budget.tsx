import ArrowRight from "@/assets/icons/arrowRight";
import Cash from "@/assets/icons/cash";
import Navigation from "@/components/navigation/Navigation";
import formatBalance from "@/constants/useFormatBalance";
import { useGetBudget } from "@/data/hooks/budget";
import useGetCards from "@/data/hooks/currencies";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import BudgetModal from "./BudgetModal";

const Budget = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { cards, isLoading, fetchAllCard } = useGetCards();
  const { budgets, getBudget } = useGetBudget();

  useEffect(() => {
    fetchAllCard();
    getBudget();
  }, []);

  const data = [
    {
      value: 20,
      color: "rgba(0, 140, 191, 1)",
      secondayColor: "rgba(0, 140, 191, 0.12)",
    },
    {
      value: 30,
      color: "rgba(111, 0, 255, 1)",
      secondayColor: "rgba(111, 0, 255, 0.12)",
    },
    {
      value: 50,
      color: "rgba(0, 191, 51, 1)",
      secondayColor: "rgba(0, 191, 51, 0.12)",
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const finance = Number(cards?.slice(0)?.map((card) => card.card_finance));
  const budget = Number(budgets?.slice(0)?.map((card) => card.value));

  return (
    <div className="mt-[45px] overflow-hidden pb-[100px]">
      <div className="h-[380px] w-[380px] relative mt-24 m-auto">
        <PieChart
          width={380}
          height={380}
          className="border-none outline-none -rotate-[135deg]"
        >
          <Pie
            stroke="none"
            data={data}
            innerRadius={105}
            outerRadius={130}
            cornerRadius={6}
            dataKey="value"
            label={({ percent, x, y, index }) => {
              const entry = data[index];
              return (
                <>
                  <defs>
                    <filter
                      id={`shadow-${index}`}
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="25"
                        floodColor={entry.color}
                        result="shadow"
                      />
                    </filter>
                  </defs>

                  <foreignObject
                    x={x - 30}
                    y={y - 20}
                    width={73}
                    height={34}
                    transform={`rotate(135 ${x} ${y})`}
                  >
                    <div
                      style={{
                        backgroundColor: entry.secondayColor,
                        color: entry.color,
                        textAlign: "center",
                        width: "73px",
                        height: "34px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="backdrop-blur-50 rounded-25 text-base font-extrabold font-unbounded absolute right-0"
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </div>
                  </foreignObject>
                </>
              );
            }}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                style={{
                  outline: "none",
                }}
                key={`cell-${index}`}
                fill={entry.color}
                filter={`url(#shadow-${index})`}
              />
            ))}
          </Pie>
        </PieChart>

        <div className="w-[200px] h-[200px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center mt-2">
          <p className="text-white text-2xl font-semibold font-unbounded leading-34">
            {budgets?.length !== 0
              ? formatBalance(Number(budget))
              : formatBalance(finance)}
          </p>
          <p className="text-10 font-unbounded font-normal text-FFFFFF-50 leading-3">
            Месячный бюджет
          </p>
          <div
            className="bg-00BF33-12 py-6 px-3 mt-2 rounded-25 text-10 text-00BF33 font-medium"
            onClick={() => {
              setIsOpenPopup(true);
            }}
          >
            Изменить
          </div>
        </div>
      </div>

      <div className="px-4 z-1">
        <div className="bg-1B1A1E-80 p-4 flex items-center justify-between rounded-25 cursor- gap-4">
          <div className="w-14 h-14 bg-00BF33-12 flex items-center justify-center rounded-50">
            <Cash width={24} height={24} fill="#00BF33" />
          </div>
          <div className="w-[65%]">
            <p className="text-xs font-medium font-unbounded text-white leading-4">
              Необходимые расходы
            </p>
            <p className="text-10 font-medium text-FFFFFF-50 font-unbounded">
              5 млн. сум на месяц
            </p>
          </div>
          <ArrowRight fill="white" />
        </div>
        <div className="bg-1B1A1E-80 p-4 flex items-center justify-between rounded-25 cursor- gap-4">
          <div className="w-14 h-14 bg-00BF33-12 flex items-center justify-center rounded-50">
            <Cash width={24} height={24} fill="#00BF33" />
          </div>
          <div className="w-[65%]">
            <p className="text-xs font-medium font-unbounded text-white leading-4">
              Необходимые расходы
            </p>
            <p className="text-10 font-medium text-FFFFFF-50 font-unbounded">
              5 млн. сум на месяц
            </p>
          </div>
          <ArrowRight fill="white" />
        </div>
        <div className="bg-1B1A1E-80 p-4 flex items-center justify-between rounded-25 cursor- gap-4">
          <div className="w-14 h-14 bg-00BF33-12 flex items-center justify-center rounded-50">
            <Cash width={24} height={24} fill="#00BF33" />
          </div>
          <div className="w-[65%]">
            <p className="text-xs font-medium font-unbounded text-white leading-4">
              Необходимые расходы
            </p>
            <p className="text-10 font-medium text-FFFFFF-50 font-unbounded">
              5 млн. сум на месяц
            </p>
          </div>
          <ArrowRight fill="white" />
        </div>
        <div className="bg-1B1A1E-80 p-4 flex items-center justify-between rounded-25 cursor- gap-4">
          <div className="w-14 h-14 bg-00BF33-12 flex items-center justify-center rounded-50">
            <Cash width={24} height={24} fill="#00BF33" />
          </div>
          <div className="w-[65%]">
            <p className="text-xs font-medium font-unbounded text-white leading-4">
              Необходимые расходы
            </p>
            <p className="text-10 font-medium text-FFFFFF-50 font-unbounded">
              5 млн. сум на месяц
            </p>
          </div>
          <ArrowRight fill="white" />
        </div>
      </div>

      <BudgetModal isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup} />
      <Navigation />
    </div>
  );
};

export default Budget;
