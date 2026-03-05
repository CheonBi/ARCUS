import type { gridRowVariants } from "./gridRow.styles";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

export interface gridRowProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridRowVariants> {
  /**
   * 그리드 비율 배열.
   * 기본값: [3, 1] → "3fr 1fr"
   * 예시: [1, 1] → "1fr 1fr", [2, 1] → "2fr 1fr"
   */
  ratio?: number[];
}
