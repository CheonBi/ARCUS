import { useState } from "react";

/**
 * 레전드 클릭으로 숨겨진 시리즈 목록을 관리하는 custom hook.
 */
export const useHiddenSeries = () => {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLegendClick = (e: any) => {
    const dataKey = e.dataKey as string;
    if (!dataKey) return;

    setHiddenSeries((prev) =>
      prev.includes(dataKey) ? prev.filter((o) => o !== dataKey) : [...prev, dataKey],
    );
  };

  return { hiddenSeries, handleLegendClick };
};
