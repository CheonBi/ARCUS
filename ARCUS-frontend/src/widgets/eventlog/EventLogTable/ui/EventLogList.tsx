import { formatEventLogDate } from "@entities/event-log";
import { cn } from "@shared/lib/cn";
import { eventLogListVariants, eventLogTableStyles } from "../model/styles";
import type { eventLogListProps } from "../model/types";
import { EventLogBodyCell } from "./EventLogBodyCell";
import { EventLogHeaderCell } from "./EventLogHeaderCell";
import { EventLogSeverityBadge } from "./EventLogSeverityBadge";

export const EventLogList = ({
  logs,
  activeLogId,
  onLogSelect,
  className,
  density,
  style,
  ...props
}: eventLogListProps) => {
  if (logs.length === 0) {
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

  return (
    <div
      className={cn(eventLogListVariants({ density }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.02)",
        ...style,
      }}
      {...props}
    >
      <table className={eventLogTableStyles.table}>
        <thead className={eventLogTableStyles.tableHead} style={{ backgroundColor: "rgb(var(--main-bg))" }}>
          <tr>
            <EventLogHeaderCell>Date</EventLogHeaderCell>
            <EventLogHeaderCell>Severity</EventLogHeaderCell>
            <EventLogHeaderCell>Content</EventLogHeaderCell>
            <EventLogHeaderCell>Zone</EventLogHeaderCell>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const isActive = activeLogId === log.id;

            return (
              <tr
                key={log.id}
                className={eventLogTableStyles.tableRow}
                style={{
                  backgroundColor: isActive ? "rgb(56 189 248 / 0.08)" : "transparent",
                }}
                onClick={() => onLogSelect(log.id)}
              >
                <EventLogBodyCell emphasized style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
                  {formatEventLogDate(log.occurredAt)}
                </EventLogBodyCell>
                <EventLogBodyCell style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
                  <EventLogSeverityBadge severity={log.severity} />
                </EventLogBodyCell>
                <EventLogBodyCell className={eventLogTableStyles.contentText} style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>
                  {log.content}
                </EventLogBodyCell>
                <EventLogBodyCell style={{ borderColor: "rgb(var(--layout-fg) / 0.08)" }}>{log.zone}</EventLogBodyCell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
