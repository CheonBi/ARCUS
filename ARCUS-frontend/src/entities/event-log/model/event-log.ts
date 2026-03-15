export type EventLogRangeKey = "today" | "3d" | "7d" | "30d";
export type EventLogSeverity = "error" | "warning" | "success" | "info";
export type EventLogSeverityFilterKey = "all" | EventLogSeverity;

export interface EventLogRecord {
  id: string;
  occurredAt: string;
  severity: EventLogSeverity;
  content: string;
  zone: string;
  detail: string;
}

export interface EventLogRangeOption {
  key: EventLogRangeKey;
  label: string;
  description: string;
}

export interface EventLogSeverityOption {
  key: EventLogSeverityFilterKey;
  label: string;
}

interface EventLogMessageTemplate {
  content: string;
  detail: string;
}

const EVENT_ZONES = [
  "North Wing",
  "Loading Bay",
  "Packaging Line A",
  "Cold Storage",
  "Control Room",
  "Utility Tunnel",
  "Tank Farm",
  "South Gate",
] as const;

const EVENT_LOG_MESSAGES: Record<EventLogSeverity, readonly EventLogMessageTemplate[]> = {
  error: [
    {
      content: "Smoke sensor heartbeat lost",
      detail: "Sensor heartbeat was not received for more than 90 seconds and the fallback circuit was enabled.",
    },
    {
      content: "Emergency stop triggered",
      detail: "The emergency stop switch interrupted the conveyor feed and requires supervisor acknowledgement.",
    },
    {
      content: "Pressure exceeded alarm threshold",
      detail: "Pressure rose above the configured safe band and automatic venting was requested.",
    },
  ],
  warning: [
    {
      content: "Camera visibility dropped below target",
      detail: "Dust and low light reduced object-detection confidence for the active monitoring lane.",
    },
    {
      content: "Door left open beyond policy limit",
      detail: "An access point stayed open longer than the configured threshold during active shift hours.",
    },
    {
      content: "Battery level trending low",
      detail: "A field device battery crossed the warning line and should be replaced during the next patrol.",
    },
  ],
  success: [
    {
      content: "Suppression system self-test passed",
      detail: "All nodes responded within the expected window and the self-test completed without anomalies.",
    },
    {
      content: "Patrol checklist completed",
      detail: "The scheduled round was closed on time and all inspection checkpoints were confirmed.",
    },
    {
      content: "Backup gateway failover recovered",
      detail: "Traffic returned to the primary gateway after the standby node verified a healthy state.",
    },
  ],
  info: [
    {
      content: "Routine maintenance window started",
      detail: "The zone entered maintenance mode and non-critical alerts were temporarily de-prioritized.",
    },
    {
      content: "Operator shift handoff recorded",
      detail: "The outgoing lead submitted the handoff notes and the next team accepted the queue.",
    },
    {
      content: "Network latency normalized",
      detail: "Average response time returned to baseline after the previous congestion event cleared.",
    },
  ],
};

const EVENT_LOG_SEQUENCE: readonly EventLogSeverity[] = [
  "error",
  "warning",
  "success",
  "info",
  "warning",
  "error",
  "info",
  "success",
] as const;

export const EVENT_LOG_RANGE_OPTIONS: readonly EventLogRangeOption[] = [
  { key: "today", label: "Today", description: "Current day" },
  { key: "3d", label: "3 Days", description: "Last 3 days" },
  { key: "7d", label: "7 Days", description: "Last 7 days" },
  { key: "30d", label: "30 Days", description: "Last 30 days" },
];

export const EVENT_LOG_SEVERITY_OPTIONS: readonly EventLogSeverityOption[] = [
  { key: "all", label: "All" },
  { key: "error", label: "Error" },
  { key: "warning", label: "Warning" },
  { key: "success", label: "Success" },
  { key: "info", label: "Info" },
];

export const getEventLogRangeLabel = (range: EventLogRangeKey) => {
  if (range === "today") {
    return "Today";
  }

  if (range === "3d") {
    return "Last 3 days";
  }

  if (range === "7d") {
    return "Last 7 days";
  }

  return "Last 30 days";
};

export const getEventLogSeverityMeta = (severity: EventLogSeverity) => {
  if (severity === "error") {
    return {
      label: "Error",
      dotClassName: "bg-rose-500",
      badgeClassName: "border-rose-500/20 bg-rose-500/12 text-rose-200",
    };
  }

  if (severity === "warning") {
    return {
      label: "Warning",
      dotClassName: "bg-amber-400",
      badgeClassName: "border-amber-400/20 bg-amber-400/12 text-amber-100",
    };
  }

  if (severity === "success") {
    return {
      label: "Success",
      dotClassName: "bg-emerald-400",
      badgeClassName: "border-emerald-400/20 bg-emerald-400/12 text-emerald-100",
    };
  }

  return {
    label: "Info",
    dotClassName: "bg-sky-400",
    badgeClassName: "border-sky-400/20 bg-sky-400/12 text-sky-100",
  };
};

const getRangeStart = (range: EventLogRangeKey, now: Date) => {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (range === "today") {
    return start;
  }

  if (range === "3d") {
    start.setDate(start.getDate() - 2);
    return start;
  }

  if (range === "7d") {
    start.setDate(start.getDate() - 6);
    return start;
  }

  start.setDate(start.getDate() - 29);
  return start;
};

export const formatEventLogDate = (value: string) =>
  new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));

export const getEventLogMockData = (now: Date): EventLogRecord[] => {
  const anchor = new Date(now);
  anchor.setMinutes(0, 0, 0);

  return Array.from({ length: 84 }, (_, index): EventLogRecord => {
    const severity = EVENT_LOG_SEQUENCE[index % EVENT_LOG_SEQUENCE.length];
    const templates = EVENT_LOG_MESSAGES[severity];
    const template = templates[index % templates.length];
    const occurredAt = new Date(anchor);
    const hourOffset = index * 8 + (index % 5) * 3 + (severity === "error" ? 1 : 0);

    occurredAt.setHours(anchor.getHours() - hourOffset);

    return {
      id: `event-log-${index}`,
      occurredAt: occurredAt.toISOString(),
      severity,
      content: template.content,
      zone: EVENT_ZONES[index % EVENT_ZONES.length],
      detail: `${template.detail} Incident bundle ${String(index + 1).padStart(3, "0")} is available for audit review.`,
    };
  }).sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime());
};

export const getEventLogsByRange = (logs: EventLogRecord[], range: EventLogRangeKey, now: Date) => {
  const start = getRangeStart(range, now).getTime();

  return logs.filter((log) => new Date(log.occurredAt).getTime() >= start);
};

export const filterEventLogsBySeverity = (logs: EventLogRecord[], severity: EventLogSeverityFilterKey) => {
  if (severity === "all") {
    return logs;
  }

  return logs.filter((log) => log.severity === severity);
};
