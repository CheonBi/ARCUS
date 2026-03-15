import type { DailyMetricsSummary, RangeKey } from "@entities/chart";
import type { LucideIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { dailySummaryCardVariants, dailySummaryVariants } from "./styles";

export interface dailySummaryProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof dailySummaryVariants> {
  now: Date;
  selectedRange: RangeKey;
  summary: DailyMetricsSummary;
}

export interface dailySummaryCardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof dailySummaryCardVariants> {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}
