import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatMega, LINE_SERIES, type CategoryBasePoint, type SeriesKey, type TimeBasePoint } from "@entities/chart";
import { SubChartTooltip } from "./SubChartTooltip";

interface SubAreaChartProps<T extends TimeBasePoint | CategoryBasePoint> {
  data: T[];
  subject?: SeriesKey;
  xAxisKey?: string;
}

export const SubAreaChart = <T extends TimeBasePoint | CategoryBasePoint>({
  data,
  subject = "mega1",
  xAxisKey,
}: SubAreaChartProps<T>) => {
  const series = LINE_SERIES.find((payload) => payload.dataKey === subject) ?? LINE_SERIES[0];

  // Determine XAxis dataKey automatically if not provided
  const inferredXAxisKey = xAxisKey || ("time" in (data[0] || {}) ? "time" : "category");

  // Determine Area dataKey: use series.dataKey for TimeBasePoint, "value" for CategoryBasePoint
  const areaDataKey = "value" in (data[0] || {}) ? "value" : series.dataKey;

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={150} initialDimension={{ width: 1, height: 1 }}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`colorArea-${series.dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={series.stroke} stopOpacity={0.6} />
            <stop offset="95%" stopColor={series.stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--layout-fg) / 0.1)" vertical={false} />
        <XAxis
          dataKey={inferredXAxisKey}
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
          content={(props) => <SubChartTooltip {...props} valueFormatter={(value) => formatMega(value as number)} />}
          cursor={{ fill: "rgb(var(--layout-fg) / 0.05)" }}
        />

        <Area
          key={series.dataKey}
          type="monotone"
          dataKey={areaDataKey}
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
