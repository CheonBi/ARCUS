import type { TooltipContentProps } from "recharts";
import { formatMega, formatByte } from "../../../../shared/lib/chartData.formatters";
import { LINE_SERIES } from "@shared/lib/chart.constants";

interface MainChartTooltipProps extends TooltipContentProps {
  hiddenSeries: string[];
}

/**
 * MainChart 커스텀 툴팁 컴포넌트.
 * 범례에서 숨긴 시리즈는 툴팁에도 표시하지 않습니다.
 */
export const MainChartTooltip = ({ active, payload, label, hiddenSeries }: MainChartTooltipProps) => {
  if (!active || !payload || !label) return null;

  const visiblePayload = payload.filter((entry) => !hiddenSeries.includes(entry.dataKey as string));

  if (visiblePayload.length === 0) return null;

  return (
    <div className="p-2 bg-[rgb(var(--header-bg))] border border-[rgb(var(--header-border))] rounded-lg shadow-xl min-w-[130px] max-w-[200px] m-1">
      <p className="mb-1 text-xs font-semibold text-[rgb(var(--layout-fg))]">{label}</p>
      <div className="flex flex-col gap-1">
        {visiblePayload.map((entry, index) => {
          const seriesConfig = LINE_SERIES.find((s) => s.dataKey === entry.dataKey);

          const displayColor = seriesConfig?.stroke || entry.color;
          const displayName = seriesConfig?.name || entry.name;

          const isMega = String(entry.dataKey).startsWith("mega");
          const formattedValue =
            entry.value !== null && entry.value !== undefined
              ? isMega
                ? formatMega(entry.value as number)
                : formatByte(entry.value as number)
              : "N/A";

          return (
            <div key={`item-${index}`} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: displayColor }} />
              <span className="text-xs text-[rgb(var(--layout-fg))] opacity-80 flex-1">{displayName}</span>
              <span className="text-xs font-semibold text-[rgb(var(--layout-fg))] text-right">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
