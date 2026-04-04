import { cn } from "@shared/lib/cn";
import { eventLogBodyCellVariants } from "../model/styles";
import type { eventLogBodyCellProps } from "../model/types";

export const EventLogBodyCell = ({ align, emphasized, className, ...props }: eventLogBodyCellProps) => {
  return <td className={cn(eventLogBodyCellVariants({ align, emphasized }), className)} {...props} />;
};
