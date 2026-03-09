import { cn } from "@shared/lib/cn";
import { subChartVariants } from "../model/subchart.styles";
import type { subChartProps } from "../model/subchart.type";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { mockSubChartAreaData, mockSubChartBarData } from "@shared/api/mockChartData";

export const SubChartWidget = ({
  className,
  title = "서브 차트",
  badge,
  icon,
  variant,
  chartType = "area",
  ...props
}: subChartProps) => {
  const renderChart = () => {
    if (chartType === "area") {
      return (
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight={150}
          initialDimension={{ width: 1, height: 1 }}
        >
          <AreaChart
            data={mockSubChartAreaData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.4)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(23, 23, 23, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
    if (chartType === "bar") {
      return (
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight={150}
          initialDimension={{ width: 1, height: 1 }}
        >
          <BarChart
            data={mockSubChartBarData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey="category"
              stroke="rgba(255,255,255,0.4)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(23, 23, 23, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    return <p className="text-xs text-[rgb(var(--nav-text))]">Unknown Chart</p>;
  };

  return (
    <div className={cn(subChartVariants({ variant, className }))} {...props}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          {icon ? (
            <div
              className={cn(
                "mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg",
                "bg-white/10",
              )}
            >
              {icon}
            </div>
          ) : null}
          <h3 className="text-sm font-semibold tracking-tight text-[rgb(var(--layout-fg))]">
            {title}
          </h3>
        </div>
        {badge && (
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              chartType === "area"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-amber-500/10 text-amber-400",
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Recharts Area */}
      <div className="flex flex-1 items-center justify-center rounded-xl min-h-0 min-w-0 w-full h-full overflow-hidden">
        {renderChart()}
      </div>
    </div>
  );
};
