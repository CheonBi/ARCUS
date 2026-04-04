import { useEventLogData } from "@pages/eventlog/model";
import { EventLogFiltersWidget, EventLogTableWidget } from "@widgets/eventlog";

export const EventLogPage = () => {
  const eventLogData = useEventLogData();

  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <EventLogFiltersWidget
        selectedRange={eventLogData.selectedRange}
        selectedSeverity={eventLogData.selectedSeverity}
        onRangeChange={eventLogData.handleRangeChange}
        onSeverityChange={eventLogData.handleSeverityChange}
      />

      <EventLogTableWidget
        now={eventLogData.now}
        selectedRange={eventLogData.selectedRange}
        selectedSeverity={eventLogData.selectedSeverity}
        logs={eventLogData.logs}
        activeLogId={eventLogData.activeLogId}
        selectedLog={eventLogData.selectedLog}
        onLogSelect={eventLogData.handleLogSelect}
      />
    </div>
  );
};
