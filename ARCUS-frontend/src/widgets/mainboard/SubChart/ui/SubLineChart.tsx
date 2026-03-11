import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import type { ChartDataPoint } from "@shared/api/mockChartData";
import { SubChartTooltip } from "./SubChartTooltip";
import { formatMega } from "@widgets/mainboard/MainChart/lib/mainChart.formatters";
import { LINE_SERIES, type SeriesKey } from "@shared/lib/chart.constants";

interface SubLineChartProps {
  data: ChartDataPoint[];
  subject?: SeriesKey;
}

export const SubLineChart = ({ data, subject = "mega1" }: SubLineChartProps) => {
  const series = LINE_SERIES.find((payload) => payload.dataKey === subject) ?? LINE_SERIES[0];
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={150}
      initialDimension={{ width: 1, height: 1 }}
    >
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgb(var(--layout-fg) / 0.1)"
          vertical={false}
        />
        <XAxis
          dataKey="time"
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
          content={(props) => (
            <SubChartTooltip {...props} valueFormatter={(value) => formatMega(value as number)} />
          )}
          cursor={{ fill: "rgb(var(--layout-fg) / 0.05)" }}
        />
        <Line
          key={series.dataKey}
          name={series.name}
          type="monotone"
          dataKey={series.dataKey}
          stroke={series.stroke}
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 4, fill: series.stroke }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
