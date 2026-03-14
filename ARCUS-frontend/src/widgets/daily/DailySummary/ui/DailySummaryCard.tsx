import { cn } from "@shared/lib/cn";
import { dailySummaryCardVariants, dailySummaryStyles } from "@widgets/daily/DailySummary/model/styles";
import type { dailySummaryCardProps } from "@widgets/daily/DailySummary/model/types";

export const DailySummaryCard = ({
  icon: Icon,
  label,
  value,
  description,
  className,
  variant,
  style,
  ...props
}: dailySummaryCardProps) => {
  return (
    <div
      className={cn(dailySummaryCardVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.03)",
        ...style,
      }}
      {...props}
    >
      <div className={dailySummaryStyles.cardHeader}>
        <span className={dailySummaryStyles.cardLabel} style={{ color: "rgb(var(--layout-fg) / 0.66)" }}>
          {label}
        </span>
        <span
          className={dailySummaryStyles.iconWrap}
          style={{
            backgroundColor: "rgb(var(--layout-fg) / 0.06)",
            color: "rgb(125 211 252)",
          }}
        >
          <Icon className={dailySummaryStyles.cardIcon} />
        </span>
      </div>
      <div className={dailySummaryStyles.cardValue}>{value}</div>
      <div className={dailySummaryStyles.cardDescription} style={{ color: "rgb(var(--layout-fg) / 0.56)" }}>
        {description}
      </div>
    </div>
  );
};
