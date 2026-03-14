import { cn } from "@shared/lib/cn";
import { Button } from "@shared/ui/button";
import { dailyControlsStyles, dailyRangeButtonVariants } from "../model/styles";
import type { dailyRangeButtonProps } from "../model/types";

export const DailyRangeButton = ({ label, description, selected, className, style, ...props }: dailyRangeButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn(dailyRangeButtonVariants({ selected }), className)}
      style={
        selected
          ? style
          : {
              borderColor: "rgb(var(--layout-fg) / 0.12)",
              backgroundColor: "rgb(var(--layout-fg) / 0.02)",
              color: "rgb(var(--layout-fg) / 0.88)",
              ...style,
            }
      }
      {...props}
    >
      <span className={dailyControlsStyles.rangeLabel}>{label}</span>
      <span className={dailyControlsStyles.rangeDescription}>{description}</span>
    </Button>
  );
};
