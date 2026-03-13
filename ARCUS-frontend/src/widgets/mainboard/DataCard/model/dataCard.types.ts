import type { dataCardVariants } from "./dataCard.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

export type DataCardTrend = "up" | "down" | "neutral";

export interface DataCardItem {
  title: string;
  value: string;
  change?: string;
  trend: DataCardTrend;
}

export type dataCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> &
  Omit<VariantProps<typeof dataCardVariants>, "trend"> &
  DataCardItem;
