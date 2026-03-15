import type { RangeKey, ViewKey } from "@entities/chart";
import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { dailyControlsVariants, dailyRangeButtonVariants, dailyViewButtonVariants } from "./styles";

export interface dailyControlsProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof dailyControlsVariants> {
  selectedRange: RangeKey;
  selectedView: ViewKey;
  onRangeChange: (range: RangeKey) => void;
  onViewChange: (view: ViewKey) => void;
}

export interface dailyViewOption {
  key: ViewKey;
  label: string;
  icon: LucideIcon;
}

export interface dailyRangeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof dailyRangeButtonVariants> {
  label: string;
  description: string;
}

export interface dailyViewButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof dailyViewButtonVariants> {
  icon: LucideIcon;
  label: string;
}
