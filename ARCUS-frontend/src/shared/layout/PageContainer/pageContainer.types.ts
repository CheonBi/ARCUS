import type { HTMLAttributes, PropsWithChildren } from "react";
import type { VariantProps } from "class-variance-authority";
import { pageContainerVariants } from "./pageContainer.styles";

export interface pageContainerProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {}
