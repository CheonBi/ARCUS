import type { subChartVariants } from "./subchart.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

export interface subChartProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof subChartVariants> {
  title: string;
  badge?: string;
  icon?: ReactNode;
}
