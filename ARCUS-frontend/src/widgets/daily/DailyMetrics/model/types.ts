import type { DailyMetricRow, RangeKey, ViewKey } from "@entities/chart";
import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type {
  dailyBodyCellVariants,
  dailyHeaderCellVariants,
  dailyMetricsChartVariants,
  dailyMetricsTableVariants,
  dailyMetricsVariants,
} from "./styles";

export interface dailyMetricsProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof dailyMetricsVariants> {
  selectedRange: RangeKey;
  selectedView: ViewKey;
  chartData: DailyMetricRow[];
  tableRows: DailyMetricRow[];
  activeRowId: string;
  selectedRow: DailyMetricRow | null;
  onRowSelect: (rowId: string) => void;
}

export interface dailyMetricsChartProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof dailyMetricsChartVariants> {
  selectedRange: RangeKey;
  chartData: DailyMetricRow[];
}

export interface dailyMetricsTableProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof dailyMetricsTableVariants> {
  selectedRange: RangeKey;
  tableRows: DailyMetricRow[];
  activeRowId: string;
  onRowSelect: (rowId: string) => void;
}

export interface dailyHeaderCellProps
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "align">, VariantProps<typeof dailyHeaderCellVariants> {
  children: ReactNode;
}

export interface dailyBodyCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "align">, VariantProps<typeof dailyBodyCellVariants> {
  children: ReactNode;
}
