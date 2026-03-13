import { cva } from "class-variance-authority";

export const dataCardVariants = cva(
  "rounded-2xl border p-4 sm:p-5 backdrop-blur transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex flex-col gap-2",
  {
    variants: {
      trend: {
        up: "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/40",
        down: "border-red-500/40 bg-red-500/5 hover:border-red-500/40",
        neutral: "border-amber-500/40 bg-amber-500/5 hover:border-amber-500/40",
      },
    },
    defaultVariants: {
      trend: "neutral",
    },
  },
);
