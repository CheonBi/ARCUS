import type { infoCardVariants } from "@shared/ui/infocard/infoCard.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

export interface infoCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoCardVariants> {
  title: string;
  description: string;
  icon?: ReactNode;
}
