import { numberFormatter, percentFormatter } from "@entities/chart";
import { cn } from "@shared/lib/cn";
import { dailyMetricsStyles, dailyMetricsTableVariants } from "../model/styles";
import type { dailyMetricsTableProps } from "../model/types";
import { DailyBodyCell } from "./DailyBodyCell";
import { DailyHeaderCell } from "./DailyHeaderCell";

export const DailyMetricsTable = ({
  selectedRange,
  tableRows,
  activeRowId,
  onRowSelect,
  className,
  size,
  style,
  ...props
}: dailyMetricsTableProps) => {
  return (
    <div
      className={cn(dailyMetricsTableVariants({ size }), className)}
      style={{
        maxHeight: "420px",
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.02)",
        ...style,
      }}
      {...props}
    >
      <table className={dailyMetricsStyles.table}>
        <thead className={dailyMetricsStyles.tableHead} style={{ backgroundColor: "rgb(var(--main-bg))" }}>
          <tr>
            <DailyHeaderCell>{selectedRange === "today" ? "시각" : "일자"}</DailyHeaderCell>
            <DailyHeaderCell align="right">처리량</DailyHeaderCell>
            <DailyHeaderCell align="right">성공률</DailyHeaderCell>
            <DailyHeaderCell align="right">평균 응답</DailyHeaderCell>
            <DailyHeaderCell align="right">P95</DailyHeaderCell>
            <DailyHeaderCell align="right">에러</DailyHeaderCell>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => {
            const isSelected = row.id === activeRowId;

            return (
              <tr
                key={row.id}
                onClick={() => onRowSelect(row.id)}
                className={dailyMetricsStyles.tableRow}
                style={{
                  backgroundColor: isSelected ? "rgb(14 165 233 / 0.14)" : "transparent",
                }}
              >
                <DailyBodyCell emphasized>{row.referenceText}</DailyBodyCell>
                <DailyBodyCell align="right">{numberFormatter.format(row.traffic)}</DailyBodyCell>
                <DailyBodyCell align="right">{percentFormatter.format(row.successRate)}%</DailyBodyCell>
                <DailyBodyCell align="right">{numberFormatter.format(row.avgLatency)} ms</DailyBodyCell>
                <DailyBodyCell align="right">{numberFormatter.format(row.p95Latency)} ms</DailyBodyCell>
                <DailyBodyCell align="right">{numberFormatter.format(row.errorCount)}</DailyBodyCell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
