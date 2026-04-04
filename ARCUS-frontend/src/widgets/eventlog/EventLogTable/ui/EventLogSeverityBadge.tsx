import { getEventLogSeverityMeta } from "@entities/event-log";
import { cn } from "@shared/lib/cn";
import { eventLogTableStyles } from "../model/styles";
import type { eventLogSeverityBadgeProps } from "../model/types";

export const EventLogSeverityBadge = ({ severity, className, style, ...props }: eventLogSeverityBadgeProps) => {
  const meta = getEventLogSeverityMeta(severity);

  return (
    <span className={cn(eventLogTableStyles.severityBadge, className)} style={{ ...meta.badgeStyle, ...style }} {...props}>
      <span className={eventLogTableStyles.severityDot} style={meta.dotStyle} />
      {meta.label}
    </span>
  );
};
