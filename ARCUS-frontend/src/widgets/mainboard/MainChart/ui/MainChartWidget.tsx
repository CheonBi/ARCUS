import { cn } from "@shared/lib/cn";
import "./MainChartWidget.css";
import { mainChartVariants } from "../model/mainChart.styles";
import type { mainChartProps } from "../model/mainChart.types";
import { useHiddenSeries } from "@widgets/mainboard/MainChart/lib/useHiddenSeries";
import { LINE_SERIES } from "@shared/lib/chart.constants";
import { formatMega, formatByte } from "../lib/mainChart.formatters";
import { MainChartHeader } from "./MainChartHeader";
import { MainChartTooltip } from "./MainChartTooltip";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const MainChartWidget = ({
  className,
  data,
  title = "종합 차트",
  badge = "Live",
  icon,
  variant,
  ...props
}: mainChartProps) => {
  const { hiddenSeries, handleLegendClick } = useHiddenSeries();

  return (
    <div className={cn(mainChartVariants({ variant, className }))} {...props}>
      <MainChartHeader title={title} badge={badge} icon={icon} />

      {/* Recharts Area */}
      <div className="flex flex-1 items-center justify-center rounded-xl min-h-0 min-w-0 w-full h-full overflow-hidden">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight={150}
          initialDimension={{ width: 1, height: 1 }}
        >
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid stroke="rgb(var(--layout-fg) / 0.3)" yAxisId="left" />

            <XAxis
              dataKey="time"
              stroke="rgb(var(--layout-fg) / 0.8)"
              fontSize={12}
              tickLine={false}
              tickMargin={12}
              interval={23}
              domain={[0, 24]}
            />

            {/* Left Y-Axis (Mega) */}
            <YAxis
              yAxisId="left"
              stroke="rgb(var(--layout-fg) / 0.8)"
              fontSize={12}
              tickLine={false}
              tickFormatter={formatMega}
              width={65}
              tickMargin={10}
              tickCount={6}
              domain={[0, "auto"]}
            />

            {/* Right Y-Axis (Byte) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgb(var(--layout-fg) / 0.8)"
              fontSize={12}
              tickLine={false}
              tickFormatter={formatByte}
              width={75}
              tickMargin={10}
              tickCount={6}
              domain={[0, "auto"]}
            />

            <Tooltip
              filterNull={true}
              content={(props) => <MainChartTooltip {...props} hiddenSeries={hiddenSeries} />}
            />

            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "10px", fontSize: "12px", cursor: "pointer" }}
              iconType="circle"
              iconSize={12}
              onClick={handleLegendClick}
              formatter={(value, entry) => {
                const isHidden = hiddenSeries.includes(entry.dataKey as string);
                return (
                  <span
                    style={{
                      color: isHidden
                        ? "rgb(var(--layout-fg) / 0.25)"
                        : "rgb(var(--layout-fg) / 0.9)",
                      textDecoration: isHidden ? "line-through" : "none",
                      transition: "color 0.4s ease",
                      userSelect: "none",
                    }}
                  >
                    {value}
                  </span>
                );
              }}
            />

            {LINE_SERIES.map(({ dataKey, name, stroke, yAxisId }) => (
              <Line
                key={dataKey}
                yAxisId={yAxisId}
                type="monotone"
                dataKey={dataKey}
                name={name}
                stroke={stroke}
                strokeWidth={2}
                dot={false}
                activeDot={hiddenSeries.includes(dataKey) ? false : { r: 4, fill: stroke }}
                isAnimationActive={false}
                connectNulls={true}
                className={`chart-line ${hiddenSeries.includes(dataKey) ? "chart-line--hidden" : ""}`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
