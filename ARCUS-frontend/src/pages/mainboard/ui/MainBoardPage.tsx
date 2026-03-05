import { MainChartWidget } from "@widgets/mainboard/MainChart";
import { SubChart1Widget, SubChart2Widget } from "@widgets/mainboard/SubChart";
import { DataCardGridWidget } from "@widgets/mainboard/DataCard";
import { GridRow } from "@shared/layout/GridRow";

/* Row 1 : 종합차트 + 차트A */
/* Row 2 : 데이터카드 + 차트B */
/* Row 구성 기본 비율 3 : 1 — ratio prop으로 동적 변경 가능 */

export const MainBoardPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 w-full ">
      {/* ── Row 1 ── */}
      <GridRow ratio={[7, 3]} className="flex-1">
        <MainChartWidget title="종합차트" />
        <SubChart1Widget title="차트 A" />
      </GridRow>

      {/* ── Row 2 ── */}
      <GridRow ratio={[7, 3]} className="flex-1">
        <DataCardGridWidget />
        <SubChart2Widget title="차트 B" />
      </GridRow>
    </div>
  );
};
