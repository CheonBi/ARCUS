import { useState } from "react";
import type { LegendPayload } from "recharts";

/**
 * 레전드 클릭으로 숨겨진 시리즈 목록을 관리하는 custom hook.
 */
export const useHiddenSeries = () => {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  const handleLegendClick = (e: LegendPayload) => {
    const dataKey = e.dataKey as string;
    if (!dataKey) return;

    setHiddenSeries((prev) =>
      prev.includes(dataKey) ? prev.filter((o) => o !== dataKey) : [...prev, dataKey],
    );
  };

  return { hiddenSeries, handleLegendClick };
};
