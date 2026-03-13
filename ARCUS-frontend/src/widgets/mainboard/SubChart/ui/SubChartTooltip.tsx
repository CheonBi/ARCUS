import type { TooltipContentProps } from "recharts";
import { LINE_SERIES } from "@entities/chart";

interface SubChartTooltipProps extends TooltipContentProps {
  valueFormatter?: (value: number | string) => string;
  unit?: string;
}

/**
 * SubChart 공통 커스텀 툴팁
 */
export const SubChartTooltip = ({ active, payload, label, valueFormatter }: SubChartTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="p-2 bg-[rgb(var(--header-bg))] border border-[rgb(var(--header-border))] rounded-lg shadow-xl min-w-[120px]">
      <p className="mb-1 text-xs font-semibold text-[rgb(var(--layout-fg))]">{label}</p>
      <div className="flex flex-col gap-1">
        {payload.map((entry, index) => {
          // dataKey가 시리즈 키거나, BarChart인 경우 payload.category에 시리즈 키가 들어있음
          const seriesKey = (entry.dataKey !== "value" ? entry.dataKey : entry.payload?.category) as string;
          const seriesConfig = LINE_SERIES.find((s) => s.dataKey === seriesKey);

          const displayColor = seriesConfig?.stroke || entry.color;
          const displayName = seriesConfig?.name || entry.name;

          const displayValue =
            valueFormatter && entry.value !== undefined ? valueFormatter(entry.value as number) : entry.value;

          return (
            <div key={`item-${index}`} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: displayColor }} />
              <span className="text-xs text-[rgb(var(--layout-fg))] opacity-80 flex-1">{displayName}</span>
              <span className="text-xs font-semibold text-[rgb(var(--layout-fg))] text-right">{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
