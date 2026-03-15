import { formatEventLogDate, getEventLogRangeLabel, getEventLogSeverityFilterLabel } from "@entities/event-log";
import { cn } from "@shared/lib/cn";
import { eventLogTableStyles, eventLogTableVariants } from "../model/styles";
import type { eventLogTableProps } from "../model/types";
import { EventLogDetailPanel } from "./EventLogDetailPanel";
import { EventLogList } from "./EventLogList";

export const EventLogTableWidget = ({
  now,
  selectedRange,
  selectedSeverity,
  logs,
  activeLogId,
  selectedLog,
  onLogSelect,
  className,
  variant,
  style,
  ...props
}: eventLogTableProps) => {
  return (
    <section
      className={cn(eventLogTableVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.03)",
        ...style,
      }}
      {...props}
    >
      <div className={eventLogTableStyles.header} style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
        <div className={eventLogTableStyles.textBlock}>
          <h2 className={eventLogTableStyles.title}>전력 이벤트 이력</h2>
          <p className={eventLogTableStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.7)" }}>
            최신 전력 이벤트 순으로 정렬됩니다. 행을 선택하면 우측 패널에서 계측값과 권고 조치를 바로 확인할 수
            있습니다.
          </p>
        </div>

        <div className={eventLogTableStyles.summary}>
          <div
            className={eventLogTableStyles.summaryCard}
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
          >
            <p className={eventLogTableStyles.summaryLabel} style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              조회 범위
            </p>
            <p className={eventLogTableStyles.summaryValue}>{getEventLogRangeLabel(selectedRange)}</p>
          </div>
          <div
            className={eventLogTableStyles.summaryCard}
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
          >
            <p className={eventLogTableStyles.summaryLabel} style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              등급 필터
            </p>
            <p className={eventLogTableStyles.summaryValue}>{getEventLogSeverityFilterLabel(selectedSeverity)}</p>
          </div>
          <div
            className={eventLogTableStyles.summaryCard}
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
          >
            <p className={eventLogTableStyles.summaryLabel} style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              이벤트 수
            </p>
            <p className={eventLogTableStyles.summaryValue}>{logs.length}건</p>
            <p className="mt-2 text-xs" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              기준 시각 {formatEventLogDate(now.toISOString())}
            </p>
          </div>
        </div>
      </div>

      <div className={eventLogTableStyles.content}>
        <div className="xl:col-span-2">
          <EventLogList logs={logs} activeLogId={activeLogId} onLogSelect={onLogSelect} />
        </div>

        <div>
          <EventLogDetailPanel log={selectedLog} />
        </div>
      </div>
    </section>
  );
};
