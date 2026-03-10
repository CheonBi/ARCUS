import { useEffect, useState } from "react";
import {
  generateInitialMainChartData,
  generateNextMainChartValues,
  type MainChartDataPoint,
} from "@shared/api/mockChartData";

const REAL_TIME_INTERVAL_MS = 60000;

/**
 * MainChart 실시간 데이터 상태 및 업데이트 로직을 담당하는 custom hook.
 * 컴포넌트가 마운트되면 24시간 초기 데이터를 생성하고,
 * 1분마다 새 데이터 포인트를 추가합니다.
 */
export const useMainChartData = () => {
  const [data, setData] = useState<MainChartDataPoint[]>([]);

  useEffect(() => {
    setData(generateInitialMainChartData());

    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev];
        const nextIndex = newData.findIndex((d) => d.mega1 === null);

        if (nextIndex !== -1) {
          newData[nextIndex] = {
            ...newData[nextIndex],
            ...generateNextMainChartValues(),
          };
        } else {
          return generateInitialMainChartData();
        }
        return newData;
      });
    }, REAL_TIME_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return data;
};
