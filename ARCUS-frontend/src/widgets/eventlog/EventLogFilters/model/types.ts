import type {
  EventLogRangeKey,
  EventLogSeverity,
  EventLogSeverityFilterKey,
} from "@entities/event-log";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type {
  eventLogFiltersVariants,
  eventLogRangeButtonVariants,
  eventLogSeverityButtonVariants,
} from "./styles";

export interface eventLogFiltersProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof eventLogFiltersVariants> {
  selectedRange: EventLogRangeKey;
  selectedSeverity: EventLogSeverityFilterKey;
  onRangeChange: (range: EventLogRangeKey) => void;
  onSeverityChange: (severity: EventLogSeverityFilterKey) => void;
}

export interface eventLogRangeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof eventLogRangeButtonVariants> {
  label: string;
  description: string;
}

export interface eventLogSeverityButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof eventLogSeverityButtonVariants> {
  label: string;
  severity?: EventLogSeverity;
}
