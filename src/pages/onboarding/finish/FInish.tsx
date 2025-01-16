import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import Cash from "@/assets/icons/cash";
import Coin from "@/assets/icons/coin";
import Savings from "@/assets/icons/savings";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { formatBalance } from "@/constants/useFormatBalance";
import useSettingBudget from "@/constants/useSettingBudget";
import { IBudget, useGetBudget } from "@/data/hooks/budget";
import { usePostGroupsBudget } from "@/data/hooks/groups";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart } from "recharts";

const FInish = () => {
  const navigate = useNavigate();

  const { data: budgets, isLoading } = useGetBudget();
  const { mutate: createGroup } = usePostGroupsBudget();

  const budget =
    budgets?.map((budget: IBudget) => budget.value).toString() || "0";

  const { groups, firstValue, secondValue, thirdValue } = useSettingBudget(
    +budget,
  );

  const data = [
    {
      value: thirdValue,
      color: "rgba(0, 140, 191, 1)",
      secondayColor: "rgba(0, 140, 191, 0.12)",
    },
    {
      value: secondValue,
      color: "rgba(111, 0, 255, 1)",
      secondayColor: "rgba(111, 0, 255, 0.12)",
    },
    {
      value: firstValue,
      color: "rgba(0, 191, 51, 1)",
      secondayColor: "rgba(0, 191, 51, 0.12)",
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-040308 h-full flex flex-col justify-between overflow-y-auto">
      <div>
        <UserNavbar
          leftIcon={<ArrowLeftShort />}
          leftIconBoxClick={() => navigate(-1)}
        />
        <div className="px-4 w-full">
          <p className="font-unbounded font-bold text-2xl text-white text-center">
            Ваш бюджет <br /> распределен
          </p>
          <div className="w-[240px] relative mt-24 m-auto">
            <PieChart
              width={250}
              height={250}
              className="border-none outline-none -rotate-90"
            >
              <Pie
                stroke="none"
                data={data}
                innerRadius={85}
                outerRadius={110}
                cornerRadius={6}
                dataKey="value"
                label={({ index }) => {
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
                            stdDeviation="10"
                            floodColor={entry.color}
                            result="shadow"
                          />
                        </filter>
                      </defs>
                    </>
                  );
                }}
                labelLine={false}
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
            <div className="w-44 h-28 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
              <p className="text-white text-2xl font-semibold font-unbounded leading-22">
                50/30/20
              </p>
              <p className="text-10 font-unbounded font-normal text-FFFFFF-50">
                Стандартная
              </p>
            </div>
          </div>
          <div className="bg-1B1A1E-50 rounded-25 mt-12">
            <div className="flex py-4 px-5 items-center justify-between">
              <div className="flex items-center gap-4">
                <Cash width={24} height={25} fill="#00BF33" />
                <div>
                  <p className="text-13 font-medium font-unbounded text-white leading-4">
                    Необходимые расходы
                  </p>
                  <p className="text-10 text-FFFFFF-50 font-medium font-unbounded leading-[14px] ">
                    {formatBalance(firstValue)} сум
                  </p>
                </div>
              </div>
              <div className="bg-00BF33-12 w-52 h-8 flex items-center justify-center rounded-[100px] text-00BF33 text-xs font-medium font-unbounded">
                50%
              </div>
            </div>
            <div className="flex py-4 px-5 items-center justify-between">
              <div className="flex items-center gap-4">
                <Coin fill="#6F00FF" />
                <div>
                  <p className="text-13 font-medium font-unbounded text-white leading-4">
                    Желаемые расходы
                  </p>
                  <p className="text-10 text-FFFFFF-50 font-medium font-unbounded leading-[14px] ">
                    {formatBalance(secondValue)} сум
                  </p>
                </div>
              </div>
              <div className="bg-6F00FF-25 w-52 h-8 flex items-center justify-center rounded-[100px] text-6F00FF text-xs font-medium font-unbounded">
                30%
              </div>
            </div>
            <div className="flex py-4 px-5 items-center justify-between">
              <div className="flex items-center gap-4">
                <Savings width={24} height={24} fill="#008CBF" />
                <div>
                  <p className="text-13 font-medium font-unbounded text-white leading-4">
                    Сбережения
                  </p>
                  <p className="text-10 text-FFFFFF-50 font-medium font-unbounded leading-[14px] ">
                    {formatBalance(thirdValue)} сум
                  </p>
                </div>
              </div>
              <div className="bg-008CBF-25 w-52 h-8 flex items-center justify-center rounded-[100px] text-008CBF text-xs font-medium font-unbounded">
                20%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 mb-8 mt-8">
        <div
          className="w-full py-4 px-6 rounded-[50px] bg-00BF33 text-xs font-medium font-unbounded mb-8 text-white shodow-some-shadows flex items-center justify-center cursor-pointer"
          onClick={() => {
            createGroup(groups);
            navigate("/onboarding/finance");
          }}
        >
          Далее
        </div>
      </div>
    </div>
  );
};

export default FInish;
