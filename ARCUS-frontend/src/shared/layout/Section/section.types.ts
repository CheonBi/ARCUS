import type { HTMLAttributes, PropsWithChildren } from "react";
import type { VariantProps } from "class-variance-authority";
import { sectionVariants } from "@shared/layout/Section/section.styles";

export interface sectionProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {}
