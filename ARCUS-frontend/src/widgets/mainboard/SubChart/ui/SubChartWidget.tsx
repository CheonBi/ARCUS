import { cn } from "@shared/lib/cn";
import { SubChartHeader } from "./SubChartHeader";
import { subChartVariants } from "../model/subchart.styles";
import type { subChartProps } from "../model/subchart.type";
import { SubAreaChart } from "./SubAreaChart";
import { SubBarChart } from "./SubBarChart";
import { SubLineChart } from "./SubLineChart";

export const SubChartWidget = ({
  className,
  data,
  title = "서브 차트",
  badge,
  icon,
  variant,
  chartType = "area",
  ...props
}: subChartProps) => {
  const renderChart = () => {
    const chartMap = {
      area: <SubAreaChart data={data} />,
      bar: <SubBarChart />,
      line: <SubLineChart data={data} />,
    };

    return (
      chartMap[chartType] || <p className="text-xs text-[rgb(var(--nav-text))]">Unknown Chart</p>
    );
  };

  return (
    <div className={cn(subChartVariants({ variant, className }))} {...props}>
      <SubChartHeader title={title} badge={badge} icon={icon} chartType={chartType} />

      {/* Recharts Area */}
      <div className="flex flex-1 items-center justify-center rounded-xl min-h-0 min-w-0 w-full h-full overflow-hidden">
        {renderChart()}
      </div>
    </div>
  );
};
