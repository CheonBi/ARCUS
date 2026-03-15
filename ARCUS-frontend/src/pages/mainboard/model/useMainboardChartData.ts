import { useEffect, useState } from "react";
import {
  formatByte,
  formatMega,
  generateInitial,
  generateNextValues,
  LINE_SERIES,
  type CategoryBasePoint,
  type SeriesKey,
  type TimeBasePoint,
} from "@entities/chart";
import type { DataCardItem, DataCardTrend } from "@widgets/mainboard/DataCard";

const REAL_TIME_INTERVAL_MS = 60000;
const EMPTY_CARD_VALUE = "--";

const getLatestTimePoint = (points: TimeBasePoint[]) => {
  return [...points].reverse().find((point) => point.mega1 !== null);
};

const getPreviousTimePoint = (points: TimeBasePoint[], latestTime?: string) => {
  if (!latestTime) return undefined;

  const latestIndex = points.findIndex((point) => point.time === latestTime);
  if (latestIndex <= 0) return undefined;

  for (let index = latestIndex - 1; index >= 0; index -= 1) {
    if (points[index].mega1 !== null) {
      return points[index];
    }
  }

  return undefined;
};

const formatCardChange = (current: number | null | undefined, previous: number | null | undefined) => {
  if (current === null || current === undefined || previous === null || previous === undefined || previous === 0) {
    return { change: undefined, trend: "neutral" as DataCardTrend };
  }

  const diffPercent = ((current - previous) / previous) * 100;
  let trend: DataCardTrend = "neutral";

  if (diffPercent > 0) trend = "up";
  if (diffPercent < 0) trend = "down";

  return {
    change: `${Math.abs(diffPercent).toFixed(1)}%`,
    trend,
  };
};

const buildCards = (time: TimeBasePoint[], category: CategoryBasePoint[]): DataCardItem[] => {
  const latestPoint = getLatestTimePoint(time);
  const previousPoint = getPreviousTimePoint(time, latestPoint?.time);
  const categoryMap = new Map(category.map((point) => [point.category as SeriesKey, point.value]));

  return LINE_SERIES.map(({ dataKey, name, yAxisId }) => {
    const latestValue =
      yAxisId === "right" ? (categoryMap.get(dataKey) ?? latestPoint?.[dataKey]) : latestPoint?.[dataKey];
    const previousValue = previousPoint?.[dataKey];
    const { change, trend } = formatCardChange(latestValue, previousValue);

    return {
      title: name,
      value:
        latestValue === null || latestValue === undefined
          ? EMPTY_CARD_VALUE
          : yAxisId === "left"
            ? formatMega(latestValue)
            : formatByte(latestValue),
      change,
      trend,
    };
  });
};

export const useMainboardChartData = () => {
  const [time, setTime] = useState<TimeBasePoint[]>([]);
  const [category, setCategory] = useState<CategoryBasePoint[]>([]);

  useEffect(() => {
    const { timebase, categorybase } = generateInitial();
    setTime(timebase);
    setCategory(categorybase);

    const interval = setInterval(() => {
      const nextValues = generateNextValues();
      const nextCategory = Object.entries(nextValues)
        .filter(([categoryKey]) => categoryKey.startsWith("byte"))
        .map(([categoryKey, value]) => ({
          category: categoryKey,
          value,
        }));

      setTime((prev) => {
        const newData = [...prev];
        const nextIndex = newData.findIndex((point) => point.mega1 === null);

        if (nextIndex !== -1) {
          newData[nextIndex] = {
            ...newData[nextIndex],
            ...nextValues,
          };
          return newData;
        }

        const refreshed = generateInitial();
        return refreshed.timebase;
      });

      setCategory(nextCategory);
    }, REAL_TIME_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const cards = buildCards(time, category);

  return { time, category, cards };
};
