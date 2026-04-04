import type {
  EventLogRangeKey,
  EventLogRecord,
  EventLogSeverity,
  EventLogSeverityFilterKey,
} from "@entities/event-log";
import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type {
  eventLogBodyCellVariants,
  eventLogHeaderCellVariants,
  eventLogListVariants,
  eventLogTableVariants,
} from "./styles";

export interface eventLogTableProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof eventLogTableVariants> {
  now: Date;
  selectedRange: EventLogRangeKey;
  selectedSeverity: EventLogSeverityFilterKey;
  logs: EventLogRecord[];
  activeLogId: string;
  selectedLog: EventLogRecord | null;
  onLogSelect: (logId: string) => void;
}

export interface eventLogListProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof eventLogListVariants> {
  logs: EventLogRecord[];
  activeLogId: string;
  onLogSelect: (logId: string) => void;
}

export interface eventLogDetailPanelProps extends HTMLAttributes<HTMLDivElement> {
  log: EventLogRecord | null;
}

export interface eventLogSeverityBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  severity: EventLogSeverity;
}

export interface eventLogHeaderCellProps
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "align">, VariantProps<typeof eventLogHeaderCellVariants> {
  children: ReactNode;
}

export interface eventLogBodyCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "align">, VariantProps<typeof eventLogBodyCellVariants> {
  children: ReactNode;
}
