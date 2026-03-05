import type { dataCardVariants } from "./dataCard.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

export interface dataCardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof dataCardVariants> {
  title: string;
  value: string;
  change?: string;
}
