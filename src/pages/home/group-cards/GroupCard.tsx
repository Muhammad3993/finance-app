import Cash from "@/assets/icons/cash";
import Heart from "@/assets/icons/heart";
import Savings from "@/assets/icons/savings";
import { formatBalance } from "@/constants/useFormatBalance";
import { IGroups } from "@/data/hooks/groups";
import { useGetOperations } from "@/data/hooks/operations";
import { Cell, Pie, PieChart } from "recharts";

interface IProps {
  group: IGroups;
}

const GroupCard = (props: IProps) => {
  const { group } = props;

  const { data: operations } = useGetOperations(`${group.name}`, "Cash");

  const oprationsValue =
    operations?.reduce((total, operation) => {
      return total + Number(operation.value);
    }, 0) || 0;

  const dailySpendValueS =
    Number(group.dailySpendValue) - Number(oprationsValue);
  const monthlySpendValueS = Number(group.spendValue) - Number(oprationsValue);

  const color =
    group.name === "Necessary"
      ? "rgba(0, 191, 51, 0.12)"
      : group.name === "Desired"
      ? "rgba(51, 0, 191, 0.12)"
      : "rgba(0, 122, 255, 0.12)";
  const color1 =
    group.name === "Necessary"
      ? "#00BF33"
      : group.name === "Desired"
      ? "#3300BF"
      : "#007AFF";

  const icon =
    group.name === "Necessary" ? (
      <Cash />
    ) : group.name === "Desired" ? (
      <Heart />
    ) : (
      <Savings />
    );

  const data = [
    { value: oprationsValue, color: color },
    { value: monthlySpendValueS, color: color1 },
  ];

  return (
    <>
      <div className="h-220 w-220 relative">
        <div
          className={`w-[100px] h-[100px] blur-[70px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
          style={{
            background: color1,
          }}
        ></div>
        <PieChart
          width={220}
          height={220}
          className="border-none outline-none -rotate-90 "
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
          <div className="w-14 h-14 flex items-center justify-center">
            {icon}
          </div>
          <p className="text-white font-semibold font-unbounded leading-22">
            {group.name}
          </p>
          <p className="text-FFFFFF-80 text-10 font-medium font-unbounded leading-14">
            {group.value ? formatBalance(group.value) : 0} сум
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between items-center py-2 px-6 rounded-20 bg-FFFFFF-8">
        <div className="w-[47%]">
          <p className="text-13 font-unbounded font-medium leading-4 text-center text-white">
            {group.name !== "Savings" &&
              (operations && operations.length > 0
                ? formatBalance(dailySpendValueS)
                : formatBalance(group.dailySpendValue))}
            {group.name === "Savings" && formatBalance(monthlySpendValueS || 0)}{" "}
            сум
          </p>
          <p className="text-9 font-unbounded font-medium text-center text-FFFFFF-50 leading-3">
            осталось на сегодня
          </p>
        </div>
        <div className="w-[1px] h-10 bg-FFFFFF-50 relative left-[-1px]" />
        <div className="w-[47%]">
          <p className="text-13 font-unbounded font-medium leading-4 text-center text-white">
            {formatBalance(group.value)} сум
          </p>
          <p className="text-9 font-unbounded font-medium text-center text-FFFFFF-50 leading-3">
            осталось на ноябрь
          </p>
        </div>
      </div>
    </>
  );
};

export default GroupCard;
