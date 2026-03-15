import { getEventLogSeverityMeta } from "@entities/event-log";
import { cn } from "@shared/lib/cn";
import { eventLogTableStyles } from "../model/styles";
import type { eventLogSeverityBadgeProps } from "../model/types";

export const EventLogSeverityBadge = ({ severity, className, ...props }: eventLogSeverityBadgeProps) => {
  const meta = getEventLogSeverityMeta(severity);

  return (
    <span className={cn(eventLogTableStyles.severityBadge, meta.badgeClassName, className)} {...props}>
      <span className={cn(eventLogTableStyles.severityDot, meta.dotClassName)} />
      {meta.label}
    </span>
  );
};
