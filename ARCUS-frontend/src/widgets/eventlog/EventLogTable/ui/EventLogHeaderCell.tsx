import { cn } from "@shared/lib/cn";
import { eventLogHeaderCellVariants } from "../model/styles";
import type { eventLogHeaderCellProps } from "../model/types";

export const EventLogHeaderCell = ({ align, className, ...props }: eventLogHeaderCellProps) => {
  return <th className={cn(eventLogHeaderCellVariants({ align }), className)} {...props} />;
};
