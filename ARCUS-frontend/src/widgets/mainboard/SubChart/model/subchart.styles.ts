import { cva } from "class-variance-authority";

export const subChartVariants = cva(
  "rounded-2xl border p-4 sm:p-6 backdrop-blur transition-shadow duration-200 shadow-sm hover:shadow-md min-h-[220px] sm:min-h-[300px] flex flex-col",
  {
    variants: {
      variant: {
        default: "border-[rgb(var(--header-border))] bg-[rgb(var(--main-bg))]",
        success: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40",
        warning: "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
