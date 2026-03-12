import type { subChartVariants } from "./subchart.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import type { SeriesKey } from "@shared/lib/chart.constants";
import type { CategoryBasePoint, TimeBasePoint } from "@shared/types/chartValue";

interface BaseProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof subChartVariants> {
  title: string;
  badge?: string;
  icon?: ReactNode;
  chartType?: "area" | "bar" | "line";
}

export type subChartProps =
  | (BaseProps & { data: TimeBasePoint[]; subject?: SeriesKey })
  | (BaseProps & { data: CategoryBasePoint[]; subject?: never });
