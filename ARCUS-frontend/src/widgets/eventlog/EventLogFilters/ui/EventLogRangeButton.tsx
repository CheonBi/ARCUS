import { cn } from "@shared/lib/cn";
import { eventLogFiltersStyles, eventLogRangeButtonVariants } from "../model/styles";
import type { eventLogRangeButtonProps } from "../model/types";

export const EventLogRangeButton = ({
  label,
  description,
  selected,
  className,
  style,
  ...props
}: eventLogRangeButtonProps) => {
  return (
    <button
      type="button"
      className={cn(eventLogRangeButtonVariants({ selected }), className)}
      style={{
        borderColor: selected ? undefined : "rgb(var(--layout-fg) / 0.12)",
        backgroundColor: selected ? undefined : "rgb(var(--layout-fg) / 0.03)",
        color: selected ? undefined : "rgb(var(--layout-fg))",
        ...style,
      }}
      {...props}
    >
      <span className={eventLogFiltersStyles.rangeLabel}>{label}</span>
      <span className={eventLogFiltersStyles.rangeDescription}>{description}</span>
    </button>
  );
};
