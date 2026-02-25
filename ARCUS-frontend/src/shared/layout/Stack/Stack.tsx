import { stackVariants } from "./stack.styles";
import type { stackProps } from "./stack.types";
import { cn } from "@shared/lib/cn";

export const Stack = ({ className, gap, children, ...props }: stackProps) => {
  return (
    <div className={cn(stackVariants({ gap }), className)} {...props}>
      {children}
    </div>
  );
};
