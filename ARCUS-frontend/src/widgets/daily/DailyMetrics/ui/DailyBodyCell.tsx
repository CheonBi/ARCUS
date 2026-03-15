import { cn } from "@shared/lib/cn";
import { dailyBodyCellVariants } from "../model/styles";
import type { dailyBodyCellProps } from "../model/types";

export const DailyBodyCell = ({ children, align, emphasized, className, style, ...props }: dailyBodyCellProps) => {
  return (
    <td
      className={cn(dailyBodyCellVariants({ align, emphasized }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.06)",
        color: emphasized ? "rgb(var(--layout-fg))" : "rgb(var(--layout-fg) / 0.8)",
        ...style,
      }}
      {...props}
    >
      {children}
    </td>
  );
};
