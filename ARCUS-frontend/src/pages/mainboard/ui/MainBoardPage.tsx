import { MainChartWidget } from "@widgets/mainboard/MainChart";
import { SubChartWidget } from "@widgets/mainboard/SubChart";
import { DataCardGridWidget } from "@widgets/mainboard/DataCard";
import { GridRow } from "@shared/layout/GridRow";
import { useChartData } from "@shared/lib/useChartData";

/* Row 1 : 종합차트 + 차트A */
/* Row 2 : 데이터카드 + 차트B */
/* Row 구성 기본 비율 3 : 1 — ratio prop으로 동적 변경 가능 */

export const MainBoardPage = () => {
  const { time, category } = useChartData();

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 w-full ">
      {/* ── Row 1 ── */}
      <GridRow ratio={[7, 3]} className="flex-1">
        <MainChartWidget data={time} title="종합차트" badge="Live" variant="elevated" />
        <SubChartWidget data={time} subject="mega1" title="차트 A" badge="▲ 2.4%" chartType="area" variant="success" />
      </GridRow>

      {/* ── Row 2 ── */}
      <GridRow ratio={[7, 3]} className="flex-1">
        <DataCardGridWidget />
        <SubChartWidget data={category} title="차트 B" badge="▼ 1.2%" chartType="bar" variant="warning" />
      </GridRow>
    </div>
  );
};
