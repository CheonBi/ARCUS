import { formatEventLogDate, getEventLogSeverityMeta } from "@entities/event-log";
import { cn } from "@shared/lib/cn";
import { eventLogTableStyles } from "../model/styles";
import type { eventLogDetailPanelProps } from "../model/types";
import { EventLogSeverityBadge } from "./EventLogSeverityBadge";

export const EventLogDetailPanel = ({ log, className, style, ...props }: eventLogDetailPanelProps) => {
  if (!log) {
    return (
      <div
        className={cn(eventLogTableStyles.emptyState, className)}
        style={{
          borderColor: "rgb(var(--layout-fg) / 0.08)",
          backgroundColor: "rgb(var(--layout-fg) / 0.03)",
          color: "rgb(var(--layout-fg) / 0.66)",
          ...style,
        }}
        {...props}
      >
        현재 조건에 맞는 전력 이벤트가 없습니다.
      </div>
    );
  }

  const severityMeta = getEventLogSeverityMeta(log.severity);

  return (
    <aside
      className={cn(eventLogTableStyles.detailPanel, className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.03)",
        ...style,
      }}
      {...props}
    >
      <div className={eventLogTableStyles.detailHeader} style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
            선택한 이벤트
          </p>
          <h3 className="mt-2 text-lg font-semibold">{log.summary}</h3>
        </div>
        <EventLogSeverityBadge severity={log.severity} />
      </div>

      <div className={eventLogTableStyles.detailMeta}>
        <div
          className={eventLogTableStyles.detailMetaCard}
          style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
            발생 시각
          </p>
          <p className="mt-2 text-sm font-medium">{formatEventLogDate(log.occurredAt)}</p>
        </div>
        <div
          className={eventLogTableStyles.detailMetaCard}
          style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
            설비
          </p>
          <p className="mt-2 text-sm font-medium">{log.assetName}</p>
        </div>
        <div
          className={eventLogTableStyles.detailMetaCard}
          style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
            관측 지표
          </p>
          <p className="mt-2 text-sm font-medium">{log.metricLabel}</p>
        </div>
        <div
          className={eventLogTableStyles.detailMetaCard}
          style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
            측정값
          </p>
          <p className="mt-2 text-sm font-medium">{log.metricValue}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border px-4 py-4" style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
          이상 상세
        </p>
        <p className="mt-3 text-sm leading-7" style={{ color: "rgb(var(--layout-fg) / 0.82)" }}>
          {log.detail}
        </p>
      </div>

      <div className="mt-4 rounded-2xl border px-4 py-4" style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
          권고 조치
        </p>
        <p className="mt-3 text-sm leading-7" style={{ color: "rgb(var(--layout-fg) / 0.82)" }}>
          {log.recommendedAction}
        </p>
      </div>

      <div className="mt-4 rounded-2xl border px-4 py-4" style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
          등급 해석
        </p>
        <p className="mt-3 text-sm leading-7" style={{ color: "rgb(var(--layout-fg) / 0.82)" }}>
          {severityMeta.description}
        </p>
      </div>
    </aside>
  );
};
