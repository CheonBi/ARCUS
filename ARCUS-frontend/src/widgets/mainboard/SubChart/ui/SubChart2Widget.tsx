import { cn } from "@shared/lib/cn";
import { subChartVariants } from "../model/subchart.styles";
import type { subChartProps } from "../model/subchart.type";

export const SubChart2Widget = ({
  className,
  title = "차트 B",
  badge = "▼ 1.2%",
  icon,
  variant,
  ...props
}: subChartProps) => {
  return (
    <div className={cn(subChartVariants({ variant, className }))} {...props}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
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
        <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
          {badge}
        </span>
      </div>

      {/* Chart Placeholder */}
      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[rgb(var(--header-border))]">
        <p className="text-xs text-[rgb(var(--nav-text))]">차트 영역</p>
      </div>
    </div>
  );
};
