import { cn } from "@shared/lib/cn";
import "./MainChartWidget.css";
import { mainChartVariants } from "../model/mainChart.styles";
import type { mainChartProps } from "../model/mainChart.types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  type TooltipContentProps,
} from "recharts";
import {
  generateInitialMainChartData,
  generateNextMainChartValues,
  type MainChartDataPoint,
} from "@shared/api/mockChartData";
import { useEffect, useState } from "react";

// Format functions for Y-axes
const formatMega = (value: number) => {
  if (value === null || value === undefined) return "";
  return `${value} MB`;
};
const formatByte = (value: number) => {
  if (value === null || value === undefined) return "";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)} MB`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)} KB`;
  return `${value} B`;
};

export const MainChartWidget = ({
  className,
  title = "종합 차트",
  badge = "Live",
  icon,
  variant,
  ...props
}: mainChartProps) => {
  const [data, setData] = useState<MainChartDataPoint[]>([]);
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  useEffect(() => {
    // 1. Initialize data with full 24 hours format
    setData(generateInitialMainChartData());

    // 2. Simulate Real-Time data appending (e.g., every 5 seconds)
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev];
        // 비어있는(미래) 시간대의 첫 번째 인덱스를 찾음
        const nextIndex = newData.findIndex((d) => d.mega1 === null);

        if (nextIndex !== -1) {
          newData[nextIndex] = {
            ...newData[nextIndex],
            ...generateNextMainChartValues(),
          };
        } else {
          // 24시간이 다 차면 초기화 혹은 Shift 처리
          return generateInitialMainChartData();
        }
        return newData;
      });
    }, 5000); // 5 seconds for visual real-time effect

    return () => clearInterval(interval);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLegendClick = (e: any) => {
    const dataKey = e.dataKey as string;
    if (!dataKey) return;

    if (hiddenSeries.includes(dataKey)) {
      setHiddenSeries(hiddenSeries.filter((o) => o !== dataKey));
    } else {
      setHiddenSeries([...hiddenSeries, dataKey]);
    }
  };

  const handleTooltip = ({ active, payload, label }: TooltipContentProps) => {
    const isVisible = active && payload && label;
    if (!isVisible) return null;

    const visiblePayload = payload.filter(
      (entry) => !hiddenSeries.includes(entry.dataKey as string),
    );

    if (visiblePayload.length === 0) return null;

    return (
      <div className="p-2 bg-[rgb(var(--header-bg))] border border-white/10 rounded-lg shadow-xl min-w-[130px]">
        <p className="mb-1.5 text-xs font-semibold text-[rgb(var(--layout-fg))]">{label}</p>
        <div className="flex flex-col gap-1">
          {visiblePayload.map((entry, index) => {
            const isMega = String(entry.dataKey).startsWith("mega");
            const formattedValue =
              entry.value !== null && entry.value !== undefined
                ? isMega
                  ? formatMega(entry.value as number)
                  : formatByte(entry.value as number)
                : "N/A";

            return (
              <div key={`item-${index}`} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-[rgb(var(--layout-fg))] opacity-80 flex-1">
                  {entry.name}
                </span>
                <span className="text-xs font-semibold text-[rgb(var(--layout-fg))] text-right">
                  {formattedValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={cn(mainChartVariants({ variant, className }))} {...props}>
      {/* Header */}
      <div className="px-2 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          {icon ? (
            <div
              className={cn(
                "mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg",
                "bg-white/10",
              )}
            >
              {icon}
            </div>
          ) : null}
          <h3 className="text-sm font-semibold tracking-tight text-[rgb(var(--layout-fg))]">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-400 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          {badge}
        </span>
      </div>

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

            {/* X-Axis: 00:00 ~ 24:00 고정 (288개 데이터 중 24시간 간격으로 매 정각(12개당 1개) 표시) */}
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.8)"
              fontSize={12}
              tickLine={true}
              axisLine={true}
              tickMargin={12}
              interval={23} // 2시간마다 표시.
            />

            {/* Left Y-Axis (Mega) - 폭 확장 */}
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

            {/* Right Y-Axis (Byte) - 폭 확장 */}
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

            <Tooltip filterNull={true} content={handleTooltip} />

            <Legend
              verticalAlign="bottom"
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "12px",
                cursor: "pointer",
              }}
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

            {/* Mega Series (Left Axis) */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="mega1"
              name="Mega Data 1"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={false}
              activeDot={hiddenSeries.includes("mega1") ? false : { r: 4, fill: "#0ea5e9" }}
              isAnimationActive={false}
              connectNulls={true}
              className={`chart-line ${hiddenSeries.includes("mega1") ? "chart-line--hidden" : ""}`}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="mega2"
              name="Mega Data 2"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
              activeDot={hiddenSeries.includes("mega2") ? false : { r: 4, fill: "#38bdf8" }}
              isAnimationActive={false}
              connectNulls={true}
              className={`chart-line ${hiddenSeries.includes("mega2") ? "chart-line--hidden" : ""}`}
            />

            {/* Byte Series (Right Axis) */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="byte1"
              name="Byte Data 1"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
              activeDot={hiddenSeries.includes("byte1") ? false : { r: 4, fill: "#8b5cf6" }}
              isAnimationActive={false}
              connectNulls={true}
              className={`chart-line ${hiddenSeries.includes("byte1") ? "chart-line--hidden" : ""}`}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="byte2"
              name="Byte Data 2"
              stroke="#a78bfa"
              strokeWidth={2}
              dot={false}
              activeDot={hiddenSeries.includes("byte2") ? false : { r: 4, fill: "#a78bfa" }}
              isAnimationActive={false}
              connectNulls={true}
              className={`chart-line ${hiddenSeries.includes("byte2") ? "chart-line--hidden" : ""}`}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="byte3"
              name="Byte Data 3"
              stroke="#c4b5fd"
              strokeWidth={2}
              dot={false}
              activeDot={hiddenSeries.includes("byte3") ? false : { r: 4, fill: "#c4b5fd" }}
              isAnimationActive={false}
              connectNulls={true}
              className={`chart-line ${hiddenSeries.includes("byte3") ? "chart-line--hidden" : ""}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
