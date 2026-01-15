import type { HTMLAttributes, PropsWithChildren } from "react";
import type { VariantProps } from "class-variance-authority";
import { stackVariants } from "./stack.styles";

export interface stackProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}
