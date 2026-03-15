import { BarChart3, TableProperties } from "lucide-react";
import { DAILY_RANGE_OPTIONS } from "@entities/chart";
import { cn } from "@shared/lib/cn";
import { dailyControlsStyles, dailyControlsVariants } from "../model/styles";
import type { dailyControlsProps, dailyViewOption } from "../model/types";
import { DailyRangeButton } from "./DailyRangeButton";
import { DailyViewButton } from "./DailyViewButton";

const VIEW_OPTIONS: dailyViewOption[] = [
  { key: "chart", label: "차트", icon: BarChart3 },
  { key: "table", label: "테이블", icon: TableProperties },
];

export const DailyControlsWidget = ({
  selectedRange,
  selectedView,
  onRangeChange,
  onViewChange,
  className,
  variant,
  style,
  ...props
}: dailyControlsProps) => {
  return (
    <section
      className={cn(dailyControlsVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.04)",
        ...style,
      }}
      {...props}
    >
      <div className={dailyControlsStyles.content}>
        <div className={dailyControlsStyles.textBlock}>
          <h2 className={dailyControlsStyles.title}>조회 조건</h2>
          <p className={dailyControlsStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.68)" }}>
            기간과 출력 방식을 클릭으로만 전환할 수 있도록 우선 구현했습니다.
          </p>
        </div>

        <div className={dailyControlsStyles.controls}>
          <div className={dailyControlsStyles.rangeGroup}>
            {DAILY_RANGE_OPTIONS.map((option) => (
              <DailyRangeButton
                key={option.key}
                label={option.label}
                description={option.description}
                selected={selectedRange === option.key}
                onClick={() => onRangeChange(option.key)}
              />
            ))}
          </div>

          <div
            className={dailyControlsStyles.viewGroup}
            style={{
              borderColor: "rgb(var(--layout-fg) / 0.1)",
              backgroundColor: "rgb(var(--layout-fg) / 0.04)",
            }}
          >
            {VIEW_OPTIONS.map((option) => (
              <DailyViewButton
                key={option.key}
                icon={option.icon}
                label={option.label}
                selected={selectedView === option.key}
                onClick={() => onViewChange(option.key)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
