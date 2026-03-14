import { useDailyData } from "@pages/daily/model";
import { DailyControlsWidget, DailyMetricsWidget, DailySummaryWidget } from "@widgets/daily";

export const DailyPage = () => {
  const dailyData = useDailyData();

  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <DailySummaryWidget now={dailyData.now} selectedRange={dailyData.selectedRange} summary={dailyData.summary} />

      <DailyControlsWidget
        selectedRange={dailyData.selectedRange}
        selectedView={dailyData.selectedView}
        onRangeChange={dailyData.handleRangeChange}
        onViewChange={dailyData.handleViewChange}
      />

      <DailyMetricsWidget
        selectedRange={dailyData.selectedRange}
        selectedView={dailyData.selectedView}
        chartData={dailyData.chartData}
        tableRows={dailyData.tableRows}
        activeRowId={dailyData.activeRowId}
        selectedRow={dailyData.selectedRow}
        onRowSelect={dailyData.handleRowSelect}
      />
    </div>
  );
};
