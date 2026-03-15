import { useState } from "react";
import {
  filterEventLogsBySeverity,
  getEventLogMockData,
  getEventLogsByRange,
  type EventLogRangeKey,
  type EventLogSeverityFilterKey,
} from "@entities/event-log";

export const useEventLogData = () => {
  const [now] = useState(() => new Date());
  const [logs] = useState(() => getEventLogMockData(now));
  const [selectedRange, setSelectedRange] = useState<EventLogRangeKey>("today");
  const [selectedSeverity, setSelectedSeverity] = useState<EventLogSeverityFilterKey>("all");
  const [selectedLogId, setSelectedLogId] = useState("");

  const rangeLogs = getEventLogsByRange(logs, selectedRange, now);
  const filteredLogs = filterEventLogsBySeverity(rangeLogs, selectedSeverity);
  const fallbackSelectedLog = filteredLogs[0] ?? null;
  const selectedLog = filteredLogs.find((log) => log.id === selectedLogId) ?? fallbackSelectedLog;
  const activeLogId = selectedLog?.id ?? "";

  const handleRangeChange = (range: EventLogRangeKey) => {
    setSelectedRange(range);
    setSelectedLogId("");
  };

  const handleSeverityChange = (severity: EventLogSeverityFilterKey) => {
    setSelectedSeverity(severity);
    setSelectedLogId("");
  };

  const handleLogSelect = (logId: string) => {
    setSelectedLogId(logId);
  };

  return {
    now,
    selectedRange,
    selectedSeverity,
    logs: filteredLogs,
    selectedLog,
    activeLogId,
    handleRangeChange,
    handleSeverityChange,
    handleLogSelect,
  };
};
