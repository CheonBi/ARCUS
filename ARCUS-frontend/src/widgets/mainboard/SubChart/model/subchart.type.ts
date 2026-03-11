import type { ChartDataPoint } from "@shared/api/mockChartData";
import type { subChartVariants } from "./subchart.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import type { SeriesKey } from "@shared/lib/chart.constants";

export interface subChartProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof subChartVariants> {
  data: ChartDataPoint[];
  title: string;
  badge?: string;
  icon?: ReactNode;
  chartType?: "area" | "bar" | "line";
  subject?: SeriesKey;
}
