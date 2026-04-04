import { getDailyRangeSummary } from "@entities/chart";
import { cn } from "@shared/lib/cn";
import { dailyMetricsStyles, dailyMetricsVariants } from "../model/styles";
import type { dailyMetricsProps } from "../model/types";
import { DailyMetricsTable } from "./DailyMetricsTable";
import { lazy, Suspense } from "react";

const DailyMetricsChart = lazy(() =>
  import("./DailyMetricsChart").then((module) => ({
    default: module.DailyMetricsChart,
  })),
);

export const DailyMetricsWidget = ({
  selectedRange,
  selectedView,
  chartData,
  tableRows,
  activeRowId,
  selectedRow,
  onRowSelect,
  className,
  variant,
  style,
  ...props
}: dailyMetricsProps) => {
  return (
    <section
      className={cn(dailyMetricsVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.03)",
        ...style,
      }}
      {...props}
    >
      <div className={dailyMetricsStyles.header} style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
        <div className={dailyMetricsStyles.textBlock}>
          <h2 className={dailyMetricsStyles.title}>{getDailyRangeSummary(selectedRange)}</h2>
          <p className={dailyMetricsStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.7)" }}>
            {selectedView === "chart"
              ? "차트는 처리량과 평균 응답 속도를 함께 확인할 수 있도록 구성했습니다."
              : "테이블은 내부 스크롤로 고정 높이 안에서 조회할 수 있습니다."}
          </p>
        </div>

        <div
          className={dailyMetricsStyles.selectedPanel}
          style={{
            borderColor: "rgb(var(--layout-fg) / 0.08)",
            backgroundColor: "rgb(var(--layout-fg) / 0.04)",
            color: "rgb(var(--layout-fg) / 0.82)",
          }}
        >
          선택 구간:{" "}
          <span className="font-semibold" style={{ color: "rgb(var(--layout-fg))" }}>
            {selectedRow?.referenceText ?? "-"}
          </span>
        </div>
      </div>

      <div className={dailyMetricsStyles.content}>
        {selectedView === "chart" ? (
          <Suspense fallback={<div className="min-h-[260px]" />}>
            <DailyMetricsChart selectedRange={selectedRange} chartData={chartData} />
          </Suspense>
        ) : (
          <DailyMetricsTable
            selectedRange={selectedRange}
            tableRows={tableRows}
            activeRowId={activeRowId}
            onRowSelect={onRowSelect}
          />
        )}
      </div>
    </section>
  );
};
