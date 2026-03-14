import { Activity, BarChart3, CalendarRange, Clock3, Database } from "lucide-react";
import { formatDateTimeStamp, getDailyRangeSummary, numberFormatter, percentFormatter } from "@entities/chart";
import { cn } from "@shared/lib/cn";
import { dailySummaryStyles, dailySummaryVariants } from "../model/styles";
import type { dailySummaryProps } from "../model/types";
import { DailySummaryCard } from "./DailySummaryCard";

export const DailySummaryWidget = ({
  now,
  selectedRange,
  summary,
  className,
  variant,
  style,
  ...props
}: dailySummaryProps) => {
  return (
    <section
      className={cn(dailySummaryVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        background:
          "linear-gradient(135deg, rgb(var(--layout-fg) / 0.09) 0%, rgb(var(--layout-fg) / 0.03) 45%, rgb(14 165 233 / 0.14) 100%)",
        ...style,
      }}
      {...props}
    >
      <div className={dailySummaryStyles.content}>
        <div className={dailySummaryStyles.intro}>
          <div className={dailySummaryStyles.badgeRow}>
            <span
              className={dailySummaryStyles.badge}
              style={{
                backgroundColor: "rgb(14 165 233 / 0.16)",
                color: "rgb(125 211 252)",
              }}
            >
              <Database className={dailySummaryStyles.badgeIcon} />
              Mock Daily Monitor
            </span>
            <span
              className={dailySummaryStyles.timestamp}
              style={{
                backgroundColor: "rgb(var(--layout-fg) / 0.08)",
                color: "rgb(var(--layout-fg) / 0.78)",
              }}
            >
              현재 기준 시각 {formatDateTimeStamp(now)}
            </span>
          </div>

          <div className={dailySummaryStyles.textBlock}>
            <h1 className={dailySummaryStyles.title}>DailyPage 기본 모니터링</h1>
            <p className={dailySummaryStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.72)" }}>
              현재 시각을 기준으로 금일 데이터를 기본 노출하고, 기간 버튼 클릭만으로 3일, 7일, 30일 조회 화면을
              전환합니다. 실제 API 연동과 쿼리 성능 최적화는 이후 단계에서 붙일 수 있도록 목데이터 중심으로
              구성했습니다.
            </p>
          </div>
        </div>

        <div
          className={dailySummaryStyles.grid}
          style={{
            borderColor: "rgb(var(--layout-fg) / 0.08)",
            backgroundColor: "rgb(var(--layout-fg) / 0.04)",
          }}
        >
          <DailySummaryCard
            icon={Activity}
            label="총 처리량"
            value={numberFormatter.format(summary.totalTraffic)}
            description={getDailyRangeSummary(selectedRange)}
          />
          <DailySummaryCard
            icon={Clock3}
            label="평균 응답"
            value={`${numberFormatter.format(Math.round(summary.averageLatency))} ms`}
            description="평균 Latency"
          />
          <DailySummaryCard
            icon={BarChart3}
            label="성공률"
            value={`${percentFormatter.format(summary.averageSuccessRate)}%`}
            description="구간 평균"
          />
          <DailySummaryCard
            icon={CalendarRange}
            label="에러 합계"
            value={numberFormatter.format(summary.totalErrorCount)}
            description="Mock 집계"
          />
        </div>
      </div>
    </section>
  );
};
