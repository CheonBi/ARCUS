import { GridRow } from "@shared/layout/GridRow";
import { useMainboardChartData } from "@pages/mainboard/model";
import { DataCardGridWidget } from "@widgets/mainboard/DataCard";
import { MainChartWidget } from "@widgets/mainboard/MainChart";
import { SubChartWidget } from "@widgets/mainboard/SubChart";

export const MainBoardPage = () => {
  const { time, category, cards } = useMainboardChartData();

  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <GridRow ratio={[7, 3]} className="flex-1">
        <MainChartWidget data={time} title="종합차트" badge="Live" variant="elevated" />
        <SubChartWidget data={time} subject="mega1" title="차트 A" badge="+2.4%" chartType="area" variant="success" />
      </GridRow>

      <GridRow ratio={[7, 3]} className="flex-1">
        <DataCardGridWidget cards={cards} />
        <SubChartWidget data={category} title="차트 B" badge="+1.2%" chartType="bar" variant="warning" />
      </GridRow>
    </div>
  );
};
