import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button.styles";
import type { ButtonHTMLAttributes, Ref } from "react";

export interface buttonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}
