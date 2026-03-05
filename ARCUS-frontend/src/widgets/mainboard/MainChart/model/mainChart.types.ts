import type { mainChartVariants } from "./mainChart.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

export interface mainChartProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof mainChartVariants> {
  title: string;
  badge?: string;
  icon?: ReactNode;
}
