import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { ChartDataPoint } from "@shared/api/mockChartData";
import { SubChartTooltip } from "./SubChartTooltip";
import { formatMega } from "@widgets/mainboard/MainChart/lib/mainChart.formatters";
import { LINE_SERIES, type SeriesKey } from "@shared/lib/chart.constants";

interface SubAreaChartProps {
  data: ChartDataPoint[];
  subject?: SeriesKey;
}

export const SubAreaChart = ({ data, subject = "mega1" }: SubAreaChartProps) => {
  const series = LINE_SERIES.find((payload) => payload.dataKey === subject) ?? LINE_SERIES[0];

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={150}
      initialDimension={{ width: 1, height: 1 }}
    >
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`colorArea-${series.dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={series.stroke} stopOpacity={0.6} />
            <stop offset="95%" stopColor={series.stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
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
          tickMargin={12}
          interval={45}
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

        <Area
          key={series.dataKey}
          type="monotone"
          dataKey={series.dataKey}
          name={series.name}
          stroke={series.stroke}
          strokeWidth={1}
          fillOpacity={1}
          fill={`url(#colorArea-${series.dataKey})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
