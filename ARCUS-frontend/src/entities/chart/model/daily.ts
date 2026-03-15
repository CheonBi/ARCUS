import { clamp, formatDateStamp, formatDayLabel, formatHourLabel } from "../lib/formatters";

export type RangeKey = "today" | "3d" | "7d" | "30d";
export type ViewKey = "chart" | "table";

export interface DailyMetricRow {
  id: string;
  label: string;
  referenceText: string;
  traffic: number;
  successRate: number;
  avgLatency: number;
  p95Latency: number;
  errorCount: number;
}

export interface DailyRangeOption {
  key: RangeKey;
  label: string;
  description: string;
}

export interface DailyMetricsSummary {
  totalTraffic: number;
  averageSuccessRate: number;
  averageLatency: number;
  totalErrorCount: number;
}

export type TooltipValue = number | string | readonly (number | string)[] | undefined;

export const DAILY_RANGE_OPTIONS: DailyRangeOption[] = [
  { key: "today", label: "Today", description: "금일 누적" },
  { key: "3d", label: "3 Days", description: "최근 3일" },
  { key: "7d", label: "7 Days", description: "최근 7일" },
  { key: "30d", label: "30 Days", description: "최근 30일" },
];

const buildTodayData = (now: Date) => {
  const currentHour = now.getHours();

  return Array.from({ length: currentHour + 1 }, (_, hour): DailyMetricRow => {
    const wave = Math.sin((hour + 1) * 0.72);
    const ripple = Math.cos((hour + 2) * 0.41);
    const traffic = Math.round(820 + hour * 26 + wave * 140 + ripple * 55);
    const successRate = clamp(98.7 + Math.cos(hour * 0.38) * 0.75 - (hour === currentHour ? 0.45 : 0), 95.1, 99.9);
    const avgLatency = Math.round(178 + hour * 2 + Math.sin(hour * 0.57) * 22);
    const p95Latency = avgLatency + 38 + (hour % 5) * 7;
    const errorCount = Math.max(4, Math.round((100 - successRate) * traffic * 0.032));

    return {
      id: `today-${hour}`,
      label: formatHourLabel(hour),
      referenceText: `${formatDateStamp(now)} ${formatHourLabel(hour)}`,
      traffic,
      successRate,
      avgLatency,
      p95Latency,
      errorCount,
    };
  });
};

const buildRangeData = (now: Date, dayCount: number) => {
  const anchor = new Date(now);
  anchor.setHours(0, 0, 0, 0);

  return Array.from({ length: dayCount }, (_, index): DailyMetricRow => {
    const rowDate = new Date(anchor);
    rowDate.setDate(anchor.getDate() - (dayCount - index - 1));

    const wave = Math.sin((index + 1) * 0.93);
    const ripple = Math.cos((index + 3) * 0.54);
    const traffic = Math.round(12400 + dayCount * 110 + wave * 1650 + ripple * 920);
    const successRate = clamp(98.3 + Math.cos(index * 0.61) * 0.9 - dayCount * 0.006, 95.0, 99.8);
    const avgLatency = Math.round(192 + Math.sin(index * 0.68) * 26 + dayCount * 0.7);
    const p95Latency = avgLatency + 44 + (index % 4) * 9;
    const errorCount = Math.max(18, Math.round((100 - successRate) * traffic * 0.029));

    return {
      id: `${dayCount}d-${index}`,
      label: formatDayLabel(rowDate),
      referenceText: formatDateStamp(rowDate),
      traffic,
      successRate,
      avgLatency,
      p95Latency,
      errorCount,
    };
  });
};

export const getDailyMockData = (range: RangeKey, now: Date) => {
  if (range === "today") {
    return buildTodayData(now);
  }

  if (range === "3d") {
    return buildRangeData(now, 3);
  }

  if (range === "7d") {
    return buildRangeData(now, 7);
  }

  return buildRangeData(now, 30);
};

export const getDailyRangeSummary = (range: RangeKey) => {
  if (range === "today") {
    return "금일 데이터";
  }

  if (range === "3d") {
    return "최근 3일 데이터";
  }

  if (range === "7d") {
    return "최근 7일 데이터";
  }

  return "최근 30일 데이터";
};

export const getDailyMetricsSummary = (rows: DailyMetricRow[]): DailyMetricsSummary => {
  if (rows.length === 0) {
    return {
      totalTraffic: 0,
      averageSuccessRate: 0,
      averageLatency: 0,
      totalErrorCount: 0,
    };
  }

  return {
    totalTraffic: rows.reduce((sum, row) => sum + row.traffic, 0),
    averageSuccessRate: rows.reduce((sum, row) => sum + row.successRate, 0) / rows.length,
    averageLatency: rows.reduce((sum, row) => sum + row.avgLatency, 0) / rows.length,
    totalErrorCount: rows.reduce((sum, row) => sum + row.errorCount, 0),
  };
};
