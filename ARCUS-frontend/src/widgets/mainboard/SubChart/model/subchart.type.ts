import type { subChartVariants } from "./subchart.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import type { CategoryBasePoint, SeriesKey, TimeBasePoint } from "@entities/chart";

interface BaseProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof subChartVariants> {
  title: string;
  badge?: string;
  icon?: ReactNode;
  chartType?: "area" | "bar" | "line";
}

export type subChartProps =
  | (BaseProps & { data: TimeBasePoint[]; subject?: SeriesKey })
  | (BaseProps & { data: CategoryBasePoint[]; subject?: never });
