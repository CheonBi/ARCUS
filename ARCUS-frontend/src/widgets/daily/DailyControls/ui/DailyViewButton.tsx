import { cn } from "@shared/lib/cn";
import { dailyControlsStyles, dailyViewButtonVariants } from "../model/styles";
import type { dailyViewButtonProps } from "../model/types";

export const DailyViewButton = ({ icon: Icon, label, selected, className, style, ...props }: dailyViewButtonProps) => {
  return (
    <button
      type="button"
      className={cn(dailyViewButtonVariants({ selected }), className)}
      style={
        selected
          ? style
          : {
              color: "rgb(var(--layout-fg) / 0.82)",
              ...style,
            }
      }
      {...props}
    >
      <Icon className={dailyControlsStyles.viewIcon} />
      {label}
    </button>
  );
};
