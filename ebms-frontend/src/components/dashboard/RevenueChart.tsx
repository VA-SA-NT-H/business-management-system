import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip
} from "recharts";

interface Props {
  revenue: number;
  averageOrderValue: number;
}

const RevenueChart = ({
  revenue,
  averageOrderValue
}: Props) => {

  const data = [
    {
      name: "Revenue",
      value: revenue
    },
    {
      name: "Average Order",
      value: averageOrderValue
    }
  ];

  return (

    <div
      className="
      bg-white
      dark:bg-slate-800
      text-black
      dark:text-white
      rounded-2xl
      shadow-sm
      border
      border-slate-200
      dark:border-slate-700
      p-6"
    >

      <h2
        className="
        text-xl
        font-semibold
        mb-4
        text-black
        dark:text-white"
      >
        Revenue Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <AreaChart data={data}>

          <XAxis dataKey="name" />

          <Tooltip />

          <Area
            dataKey="value"
            type="monotone"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;