import { cn } from "@shared/lib/cn";
import { dataCardVariants } from "../model/dataCard.styles";
import type { dataCardProps } from "../model/dataCard.types";

export const DataCard = ({ className, title, value, change, trend, ...props }: dataCardProps) => {
  const trendColor = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-amber-400",
  }[trend ?? "neutral"];

  const trendBg = {
    up: "bg-emerald-500/10",
    down: "bg-red-500/10",
    neutral: "bg-amber-500/10",
  }[trend ?? "neutral"];

  return (
    <div className={cn(dataCardVariants({ trend, className }))} {...props}>
      <span className="text-xs font-medium uppercase tracking-wide text-[rgb(var(--nav-text))]">{title}</span>
      <span className="text-xl font-bold tracking-tight text-[rgb(var(--layout-fg))] sm:text-2xl">{value}</span>
      {change && (
        <span
          className={cn(
            "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            trendBg,
            trendColor,
          )}
        >
          {trend === "up" && "+"}
          {trend === "down" && "-"}
          {change}
        </span>
      )}
    </div>
  );
};
