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
        No logs match the current filter.
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
            Selected Record
          </p>
          <h3 className="mt-2 text-lg font-semibold">{log.content}</h3>
        </div>
        <EventLogSeverityBadge severity={log.severity} />
      </div>

      <div className={eventLogTableStyles.detailMeta}>
        <div
          className={eventLogTableStyles.detailMetaCard}
          style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
            Occurred At
          </p>
          <p className="mt-2 text-sm font-medium">{formatEventLogDate(log.occurredAt)}</p>
        </div>
        <div
          className={eventLogTableStyles.detailMetaCard}
          style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
            Zone
          </p>
          <p className="mt-2 text-sm font-medium">{log.zone}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border px-4 py-4" style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
          Incident Detail
        </p>
        <p className="mt-3 text-sm leading-7" style={{ color: "rgb(var(--layout-fg) / 0.82)" }}>
          {log.detail}
        </p>
      </div>

      <div className="mt-4 rounded-2xl border px-4 py-4" style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
          Severity Context
        </p>
        <p className="mt-3 text-sm leading-7" style={{ color: "rgb(var(--layout-fg) / 0.82)" }}>
          This record is marked as {severityMeta.label.toLowerCase()} and remains available for operator trace review.
        </p>
      </div>
    </aside>
  );
};
