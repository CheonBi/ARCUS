import { getEventLogSeverityMeta } from "@entities/event-log";
import { cn } from "@shared/lib/cn";
import { eventLogFiltersStyles, eventLogSeverityButtonVariants } from "../model/styles";
import type { eventLogSeverityButtonProps } from "../model/types";

export const EventLogSeverityButton = ({
  label,
  severity,
  selected,
  className,
  style,
  ...props
}: eventLogSeverityButtonProps) => {
  const severityMeta = severity ? getEventLogSeverityMeta(severity) : null;

  return (
    <button
      type="button"
      className={cn(eventLogSeverityButtonVariants({ selected }), className)}
      style={{
        borderColor: selected ? undefined : "rgb(var(--layout-fg) / 0.12)",
        backgroundColor: selected ? undefined : "rgb(var(--layout-fg) / 0.03)",
        color: selected ? undefined : "rgb(var(--layout-fg) / 0.82)",
        ...style,
      }}
      {...props}
    >
      {severityMeta ? <span className={eventLogFiltersStyles.severityDot} style={severityMeta.dotStyle} /> : null}
      <span>{label}</span>
    </button>
  );
};
