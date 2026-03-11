import type { ReactNode } from "react";

interface MainChartHeaderProps {
  title: string;
  badge?: string;
  icon?: ReactNode;
}

/**
 * MainChart 상단 헤더 영역 (제목, 뱃지, 아이콘)
 */
export const MainChartHeader = ({ title, badge, icon }: MainChartHeaderProps) => {
  return (
    <div className="px-2 mb-4 flex items-center justify-between">
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
        <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-400 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
          </span>
          {badge}
        </span>
      )}
    </div>
  );
};
