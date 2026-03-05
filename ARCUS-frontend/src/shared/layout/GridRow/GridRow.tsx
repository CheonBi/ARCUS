/**
 * 비율 조정 가능한 그리드 Row 레이아웃
 * - ratio prop으로 fr 비율을 동적으로 설정
 * - 모바일에서는 단일 컬럼으로 스택
 */
import { cn } from "@shared/lib/cn";
import { gridRowVariants } from "./gridRow.styles";
import type { gridRowProps } from "./gridRow.types";
import { useMemo } from "react";

export const GridRow = ({ className, ratio = [3, 1], children, style, ...props }: gridRowProps) => {
  const gridTemplate = useMemo(() => ratio.map((r) => `${r}fr`).join(" "), [ratio]);

  return (
    <div
      className={cn(gridRowVariants({ className }))}
      style={
        {
          ...style,
          // lg 브레이크포인트 이상에서만 적용되도록 CSS 변수 사용
          "--grid-ratio": gridTemplate,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
};

GridRow.displayName = "GridRow";
