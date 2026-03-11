import { cn } from "@shared/lib/cn";
import type { ReactNode } from "react";

interface SubChartHeaderProps {
  title: string;
  badge?: string;
  icon?: ReactNode;
  chartType?: "area" | "bar" | "line";
}

/**
 * SubChart 상단 헤더 영역 (제목, 뱃지, 아이콘)
 */
export const SubChartHeader = ({ title, badge, icon, chartType }: SubChartHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center">
        {icon ? (
          <div
            className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: "rgb(var(--layout-fg) / 0.1)" }}
          >
            {icon}
          </div>
        ) : null}
        <h3 className="text-sm font-semibold tracking-tight text-[rgb(var(--layout-fg))]">
          {title}
        </h3>
      </div>
      {badge && (
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            chartType === "area" || chartType === "line"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-400",
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
};
