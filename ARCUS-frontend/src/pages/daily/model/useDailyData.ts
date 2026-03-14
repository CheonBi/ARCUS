import { useState } from "react";
import { getDailyMetricsSummary, getDailyMockData, type RangeKey, type ViewKey } from "@entities/chart";

export const useDailyData = () => {
  const [now] = useState(() => new Date());
  const [selectedRange, setSelectedRange] = useState<RangeKey>("today");
  const [selectedView, setSelectedView] = useState<ViewKey>("chart");
  const [selectedRowId, setSelectedRowId] = useState("");

  const chartData = getDailyMockData(selectedRange, now);
  const tableRows = [...chartData].reverse();
  const fallbackSelectedRow = tableRows[0] ?? null;
  const selectedRow = tableRows.find((row) => row.id === selectedRowId) ?? fallbackSelectedRow;
  const activeRowId = selectedRow?.id ?? "";
  const summary = getDailyMetricsSummary(chartData);

  const handleRangeChange = (range: RangeKey) => {
    setSelectedRange(range);
    setSelectedRowId("");
  };

  const handleViewChange = (view: ViewKey) => {
    setSelectedView(view);
  };

  const handleRowSelect = (rowId: string) => {
    setSelectedRowId(rowId);
  };

  return {
    now,
    selectedRange,
    selectedView,
    chartData,
    tableRows,
    selectedRow,
    activeRowId,
    summary,
    handleRangeChange,
    handleViewChange,
    handleRowSelect,
  };
};
