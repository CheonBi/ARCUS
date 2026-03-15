import { EVENT_LOG_RANGE_OPTIONS, EVENT_LOG_SEVERITY_OPTIONS } from "@entities/event-log";
import { cn } from "@shared/lib/cn";
import { eventLogFiltersStyles, eventLogFiltersVariants } from "../model/styles";
import type { eventLogFiltersProps } from "../model/types";
import { EventLogRangeButton } from "./EventLogRangeButton";
import { EventLogSeverityButton } from "./EventLogSeverityButton";

export const EventLogFiltersWidget = ({
  selectedRange,
  selectedSeverity,
  onRangeChange,
  onSeverityChange,
  className,
  variant,
  style,
  ...props
}: eventLogFiltersProps) => {
  return (
    <section
      className={cn(eventLogFiltersVariants({ variant }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        backgroundColor: "rgb(var(--layout-fg) / 0.04)",
        ...style,
      }}
      {...props}
    >
      <div className={eventLogFiltersStyles.content}>
        <div className={eventLogFiltersStyles.textBlock}>
          <h2 className={eventLogFiltersStyles.title}>Event Log Filters</h2>
          <p className={eventLogFiltersStyles.description} style={{ color: "rgb(var(--layout-fg) / 0.7)" }}>
            Review recent incidents by time window and severity, then drill into a specific record from the table.
          </p>
        </div>

        <div className={eventLogFiltersStyles.controls}>
          <div>
            <p className={eventLogFiltersStyles.groupLabel} style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              Time Window
            </p>
            <div className={eventLogFiltersStyles.group}>
              {EVENT_LOG_RANGE_OPTIONS.map((option) => (
                <EventLogRangeButton
                  key={option.key}
                  label={option.label}
                  description={option.description}
                  selected={selectedRange === option.key}
                  onClick={() => onRangeChange(option.key)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className={eventLogFiltersStyles.groupLabel} style={{ color: "rgb(var(--layout-fg) / 0.55)" }}>
              Severity
            </p>
            <div className={eventLogFiltersStyles.group}>
              {EVENT_LOG_SEVERITY_OPTIONS.map((option) => (
                <EventLogSeverityButton
                  key={option.key}
                  label={option.label}
                  severity={option.key === "all" ? undefined : option.key}
                  selected={selectedSeverity === option.key}
                  onClick={() => onSeverityChange(option.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
