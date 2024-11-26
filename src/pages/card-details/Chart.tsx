import ChartIcon from "@/assets/icons/chartIcon";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "JAN", value: 1000 },
  { month: "FEB", value: 5000 },
  { month: "MAR", value: 4000 },
  { month: "APR", value: 3000 },
  { month: "MAY", value: 2000 },
  { month: "JUN", value: 5000 },
  { month: "JUL", value: 4000 },
];

const AnalyticsChart = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "234px",
        backgroundColor: "#f9f9f9",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className='p-5 pb-0 flex justify-between'>
        <div>
          <p className="text-xs font-bold text-customGray2 opacity-25 font-unbounded">Analytics</p>
          <p className="text-xl font-bold font-unbounded mb-5 text-customGray2">5K+</p>
        </div>
        <ChartIcon />
      </div>
      <div className='w-full h-full ml-[-20px]'>
        <ResponsiveContainer width='100%' height='64%'>
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[1000, 5000]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}K`}
              axisLine={false}
              tickLine={false}
            />
            <Area
              type='monotone'
              dataKey='value'
              fill='rgba(250, 83, 28, 0.38)'
              stroke={"#FA531C"}
              strokeWidth={3}
              dot={{ r: 5, fill: "#FA531C" }}
              activeDot={{ r: 5, fill: "#FA531C" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
