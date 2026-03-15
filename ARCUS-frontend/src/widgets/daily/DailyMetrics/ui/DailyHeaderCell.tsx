import { cn } from "@shared/lib/cn";
import { dailyHeaderCellVariants } from "../model/styles";
import type { dailyHeaderCellProps } from "../model/types";

export const DailyHeaderCell = ({ children, align, className, style, ...props }: dailyHeaderCellProps) => {
  return (
    <th
      className={cn(dailyHeaderCellVariants({ align }), className)}
      style={{
        borderColor: "rgb(var(--layout-fg) / 0.08)",
        color: "rgb(var(--layout-fg) / 0.6)",
        ...style,
      }}
      {...props}
    >
      {children}
    </th>
  );
};
