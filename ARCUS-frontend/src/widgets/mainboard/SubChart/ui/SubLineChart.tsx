import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";
import { formatMega, LINE_SERIES, type CategoryBasePoint, type SeriesKey, type TimeBasePoint } from "@entities/chart";
import { SubChartTooltip } from "./SubChartTooltip";

interface SubLineChartProps<T extends TimeBasePoint | CategoryBasePoint> {
  data: T[];
  subject?: SeriesKey;
  xAxisKey?: string;
}

export const SubLineChart = <T extends TimeBasePoint | CategoryBasePoint>({
  data,
  subject = "mega1",
  xAxisKey,
}: SubLineChartProps<T>) => {
  const series = LINE_SERIES.find((payload) => payload.dataKey === subject) ?? LINE_SERIES[0];

  // Determine XAxis dataKey automatically if not provided
  const inferredXAxisKey = xAxisKey || ("time" in (data[0] || {}) ? "time" : "category");

  // Determine Line dataKey: use series.dataKey for TimeBasePoint, "value" for CategoryBasePoint
  const lineDataKey = "value" in (data[0] || {}) ? "value" : series.dataKey;

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={150} initialDimension={{ width: 1, height: 1 }}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--layout-fg) / 0.1)" vertical={false} />
        <XAxis
          dataKey={inferredXAxisKey}
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
          content={(props) => <SubChartTooltip {...props} valueFormatter={(value) => formatMega(value as number)} />}
          cursor={{ fill: "rgb(var(--layout-fg) / 0.05)" }}
        />
        <Line
          key={series.dataKey}
          name={series.name}
          type="monotone"
          dataKey={lineDataKey}
          stroke={series.stroke}
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 4, fill: series.stroke }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
