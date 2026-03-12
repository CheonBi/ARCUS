import { useEffect, useState } from "react";
import { generateNextValues, generateInitial } from "@shared/api/mockChartData";
import type { CategoryBasePoint, TimeBasePoint } from "@shared/types/chartValue";

const REAL_TIME_INTERVAL_MS = 60000;

export const useChartData = () => {
  const [time, setTime] = useState<TimeBasePoint[]>([]);
  const [category, setCategory] = useState<CategoryBasePoint[]>([]);

  useEffect(() => {
    //최초 마운트 시 초기 데이터 1회 세팅
    const { timebase, categorybase } = generateInitial();
    setTime(timebase);
    setCategory(categorybase);

    //1분마다 주기적 업데이트
    const interval = setInterval(() => {
      // 한 번만 다음 값을 생성해서 time과 category 양쪽에 동일하게 적용합니다.
      const nextVals = generateNextValues();

      // --- Time 데이터 업데이트 ---
      setTime((prev) => {
        const newData = [...prev];
        const nextIndex = newData.findIndex((d) => d.mega1 === null); // 첫 번째 미래 시점(null) 찾기

        if (nextIndex !== -1) {
          // 빈자리가 있으면 최신 데이터로 채움
          newData[nextIndex] = {
            ...newData[nextIndex],
            ...nextVals,
          };
          return newData;
        } else {
          // 하루(24시간)가 꽉 찼다면 다음 날로 리셋 (초기화)
          //category도 갱신해 주어야 하므로, 안전하게 아래 setCategory에도 영향이 가야 함
          const refreshed = generateInitial();
          return refreshed.timebase;
        }
      });

      // --- Category 데이터 업데이트 ---
      // 인덱스를 찾을 필요 없이, 방금 생성된 nextVals를 CategoryBasePoint 배열 형태로 맵핑하여 덮어씌웁니다.
      setCategory(
        Object.entries(nextVals)
          .filter(([cat]) => cat.startsWith("byte"))
          .map(([cat, val]) => ({
            category: cat,
            value: val,
          })),
      );
    }, REAL_TIME_INTERVAL_MS);

    // 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, []);

  return { time, category };
};
