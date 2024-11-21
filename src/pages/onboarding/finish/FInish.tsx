import { useUserContext } from "@/context/UserContext";
import { PieChart, Pie, Cell } from "recharts";

const Finish = () => {
  const { state, saveUserData } = useUserContext();

  const finance: number | undefined = state?.user?.onBoarding?.finance;
  const for_rent: number | undefined = state?.user?.onBoarding?.for_rent;
  const for_meal: number | undefined = state?.user?.onBoarding?.for_meal;
  const for_car: number | undefined = state?.user?.onBoarding?.for_car;
  const debt: number | undefined = state?.user?.onBoarding?.debt;
  const for_transport: number | undefined = !for_car
    ? state?.user?.onBoarding?.for_transport
    : 0;
  const for_communal: number | undefined =
    state?.user?.onBoarding?.for_communal;
  const creditsTotal: number | undefined =
    state?.user?.onBoarding?.credit?.reduce(
      (total, credit) => total + (credit.price || 0),
      0,
    ) || 0;
  const cultural: number | undefined = state?.user?.onBoarding?.cultural;
  const saving: number | undefined = state?.user?.onBoarding?.saving;

  const remainder: number | undefined =
    Number(finance) -
    (Number(for_rent) +
      Number(for_meal) +
      Number(for_car) +
      Number(for_communal) +
      Number(for_transport) +
      Number(debt) +
      Number(creditsTotal));

  const remainderAll: number | undefined =
    Number(for_rent) +
    Number(for_meal) +
    Number(for_car) +
    Number(for_communal) +
    Number(for_transport) +
    Number(saving) +
    Number(cultural) +
    Number(debt) +
    Number(creditsTotal);

  console.log(remainderAll);

  const totalIncome: number | undefined = state.user?.onBoarding?.finance;
  // const spendCash: number | undefined = Number(totalIncome) - Number(remainder);

  // const reminderCash: number | undefined =
  //   Number(totalIncome) - Number(remainderAll);

  // const percentageNeed =
  //   totalIncome && spendCash ? (spendCash * 100) / totalIncome : 0;
  // const culturalNeed =
  //   totalIncome && cultural ? (cultural * 100) / totalIncome : 0;
  // const savingNeed = totalIncome && saving ? (saving * 100) / totalIncome : 0;

  const percentageNeed =
    totalIncome && remainder
      ? ((totalIncome - remainder) * 100) / totalIncome
      : 0;
  const culturalNeed =
    totalIncome && cultural ? (cultural * 100) / totalIncome : 0;
  const savingNeed = totalIncome && saving ? (saving * 100) / totalIncome : 0;
  const reminderCash =
    totalIncome && remainderAll
      ? ((totalIncome - remainderAll) * 100) / totalIncome
      : 0;

  const data = [
    { name: "Необходимые", value: percentageNeed, color: "#D9D9D9" },
    { name: "Сбережения", value: savingNeed, color: "#D9D9D9" },
    { name: "Развлечения", value: culturalNeed, color: "#D9D9D9" },
    { name: "Свободные", value: reminderCash, color: "#D9D9D9" },
  ];

  const filteredData = data.filter(item => item.value > 0);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white p-4'>
      <p className='font-unbounded font-medium text-22 text-black text-center'>
        Отлично! Мы распределили весь ваш бюджет на этот месяц
      </p>

      <div className='mt-6 bg-gray-200 w-full max-w-sm p-4 rounded-lg flex justify-between items-center'>
        <span className='font-unbounded'>Доход</span>
        <span className='font-unbounded'>
          {totalIncome?.toLocaleString()} сум
        </span>
      </div>

      <PieChart
        width={400}
        height={300}
        className='mt-8 border-none outline-none'
      >
        <Pie
          data={filteredData}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={120}
          dataKey='value'
          paddingAngle={5}
          label={({ percent, x, y }) => (
            <text
              x={x}
              y={y}
              fill='black'
              textAnchor='middle'
              dominantBaseline='central'
              fontWeight='bold'
            >
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          )}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>

      {/* Kategoriyalar va summalar */}
      <div className='mt-6 text-sm w-full max-w-sm'>
        {data.map((item, index) => (
          <div key={index} className='flex justify-between items-center mt-2'>
            <span>{item.name}</span>
            <span>
              {((item.value / 100) * Number(totalIncome)).toLocaleString()} сум
            </span>
          </div>
        ))}
        {/* {data.slice(3).map((item, index) => (
          <div key={index} className='flex justify-between items-center mt-2'>
            <span>{item.name}</span>
            <span>{item.value.toLocaleString()} сум</span>
          </div>
        ))} */}
      </div>

      {/* Tugma */}
      <button
        className='mt-8 bg-gray-200 text-black py-2 px-4 rounded-lg'
        onClick={() => saveUserData()}
      >
        Продолжить
      </button>
    </div>
  );
};

export default Finish;
