import { cn } from "@shared/lib/cn";
import "./MainChartWidget.css";
import { mainChartVariants } from "../model/mainChart.styles";
import type { mainChartProps } from "../model/mainChart.types";
import { useMainChartData } from "@widgets/mainboard/MainChart/lib/useMainChartData";
import { useHiddenSeries } from "@widgets/mainboard/MainChart/lib/useHiddenSeries";
import { LINE_SERIES } from "../model/mainChart.constants";
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
  title = "종합 차트",
  badge = "Live",
  icon,
  variant,
  ...props
}: mainChartProps) => {
  const data = useMainChartData();
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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" yAxisId="left" />

            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.8)"
              fontSize={12}
              tickLine={true}
              axisLine={true}
              tickMargin={12}
              interval={23}
            />

            {/* Left Y-Axis (Mega) */}
            <YAxis
              yAxisId="left"
              stroke="rgba(255,255,255,0.8)"
              fontSize={12}
              tickLine={true}
              tickFormatter={formatMega}
              width={65}
              tickMargin={10}
              tickCount={6}
              domain={[
                (dataMin: number) => (dataMin ? Math.ceil(dataMin * 0.5) : "auto"),
                (dataMax: number) => (dataMax ? Math.ceil(dataMax * 1.5) : "auto"),
              ]}
            />

            {/* Right Y-Axis (Byte) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.8)"
              fontSize={12}
              tickLine={true}
              tickFormatter={formatByte}
              width={75}
              tickMargin={10}
              tickCount={6}
              domain={[
                (dataMin: number) => (dataMin ? Math.ceil(dataMin * 0.5) : "auto"),
                (dataMax: number) => (dataMax ? Math.ceil(dataMax * 1.5) : "auto"),
              ]}
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
                      color: isHidden ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.9)",
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
