import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Rectangle } from "recharts";
import type { BarShapeProps } from "recharts";
import { formatByte, LINE_SERIES, type CategoryBasePoint, type TimeBasePoint } from "@entities/chart";
import { SubChartTooltip } from "./SubChartTooltip";

interface SubBarChartProps<T extends TimeBasePoint | CategoryBasePoint> {
  data: T[];
}

export const SubBarChart = <T extends TimeBasePoint | CategoryBasePoint>({ data }: SubBarChartProps<T>) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={150} initialDimension={{ width: 1, height: 1 }}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--layout-fg) / 0.1)" vertical={false} />
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
          width={85}
          tickFormatter={formatByte}
          tickLine={false}
          axisLine={false}
          domain={[0, "auto"]}
        />
        <Tooltip
          content={(props) => <SubChartTooltip {...props} valueFormatter={(value) => formatByte(value as number)} />}
          cursor={{ fill: "rgb(var(--layout-fg) / 0.05)" }}
        />

        <Bar
          dataKey="value"
          radius={[4, 4, 0, 0]}
          shape={(props: BarShapeProps) => {
            const { category } = props.payload;
            const seriesConfig = LINE_SERIES.find((s) => s.dataKey === category);
            return <Rectangle {...props} fill={seriesConfig?.stroke || props.fill} />;
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
