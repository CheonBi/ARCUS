import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { numberFormatter, type TooltipValue } from "@entities/chart";
import { cn } from "@shared/lib/cn";
import { dailyMetricsChartVariants } from "../model/styles";
import type { dailyMetricsChartProps } from "../model/types";

export const DailyMetricsChart = ({
  selectedRange,
  chartData,
  className,
  density,
  ...props
}: dailyMetricsChartProps) => {
  return (
    <div className={cn(dailyMetricsChartVariants({ density }), className)} {...props}>
      <ResponsiveContainer width="100%" height="100%" minHeight={260} initialDimension={{ width: 1, height: 1 }}>
        <ComposedChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="rgb(var(--layout-fg) / 0.08)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            stroke="rgb(var(--layout-fg) / 0.58)"
          />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            stroke="rgb(var(--layout-fg) / 0.58)"
            tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            stroke="rgb(var(--layout-fg) / 0.58)"
            tickFormatter={(value: number) => `${value}ms`}
          />
          <Tooltip
            cursor={{ fill: "rgb(var(--layout-fg) / 0.05)" }}
            contentStyle={{
              borderRadius: 18,
              border: "1px solid rgb(var(--layout-fg) / 0.08)",
              backgroundColor: "rgb(15 23 42 / 0.94)",
              color: "rgb(248 250 252)",
            }}
            formatter={(value: TooltipValue, name: string | number | undefined) => {
              const label = String(name ?? "");

              if (Array.isArray(value)) {
                return [value.join(", "), label];
              }

              if (typeof value !== "number") {
                return [value ?? "-", label];
              }

              if (label === "traffic") {
                return [`${numberFormatter.format(value)} 건`, "처리량"];
              }

              if (label === "avgLatency") {
                return [`${numberFormatter.format(value)} ms`, "평균 응답"];
              }

              return [value, label];
            }}
            labelFormatter={(label) => `구간 ${label}`}
          />
          <Bar
            yAxisId="left"
            dataKey="traffic"
            radius={[10, 10, 4, 4]}
            fill="rgb(56 189 248 / 0.78)"
            barSize={selectedRange === "30d" ? 18 : 28}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgLatency"
            stroke="rgb(251 191 36)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "rgb(251 191 36)" }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
