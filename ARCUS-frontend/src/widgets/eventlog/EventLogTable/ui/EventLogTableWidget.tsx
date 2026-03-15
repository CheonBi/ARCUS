import { formatEventLogDate, getEventLogRangeLabel } from "@entities/event-log";
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
          <h2 className={eventLogTableStyles.title}>Event Log Table</h2>
          <p className={eventLogTableStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.7)" }}>
            Records are sorted by most recent occurrence. Select a row to inspect one incident in the side panel.
          </p>
        </div>

        <div className={eventLogTableStyles.summary}>
          <div
            className={eventLogTableStyles.summaryCard}
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
          >
            <p className={eventLogTableStyles.summaryLabel} style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              Window
            </p>
            <p className={eventLogTableStyles.summaryValue}>{getEventLogRangeLabel(selectedRange)}</p>
          </div>
          <div
            className={eventLogTableStyles.summaryCard}
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
          >
            <p className={eventLogTableStyles.summaryLabel} style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              Filter
            </p>
            <p className={eventLogTableStyles.summaryValue}>
              {selectedSeverity === "all" ? "All" : selectedSeverity[0].toUpperCase() + selectedSeverity.slice(1)}
            </p>
          </div>
          <div
            className={eventLogTableStyles.summaryCard}
            style={{ borderColor: "rgb(var(--layout-fg) / 0.08)", backgroundColor: "rgb(var(--layout-fg) / 0.02)" }}
          >
            <p className={eventLogTableStyles.summaryLabel} style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              Records
            </p>
            <p className={eventLogTableStyles.summaryValue}>{logs.length}</p>
            <p className="mt-2 text-xs" style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              Snapshot generated at {formatEventLogDate(now.toISOString())}
            </p>
          </div>
        </div>
      </div>

      <div className={eventLogTableStyles.content}>
        <EventLogList logs={logs} activeLogId={activeLogId} onLogSelect={onLogSelect} />
        <EventLogDetailPanel log={selectedLog} />
      </div>
    </section>
  );
};
