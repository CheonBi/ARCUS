import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { mockSubChartBarData } from "@shared/api/mockChartData";
import { SubChartTooltip } from "./SubChartTooltip";

export const SubBarChart = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={150}
      initialDimension={{ width: 1, height: 1 }}
    >
      <BarChart
        data={mockSubChartBarData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgb(var(--layout-fg) / 0.1)"
          vertical={false}
        />
        <XAxis
          dataKey="category"
          stroke="rgb(var(--layout-fg) / 0.4)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="rgb(var(--layout-fg) / 0.4)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[0, "auto"]}
        />
        <Tooltip
          content={(props) => <SubChartTooltip {...props} />}
          cursor={{ fill: "rgb(var(--layout-fg) / 0.05)" }}
        />
        <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
