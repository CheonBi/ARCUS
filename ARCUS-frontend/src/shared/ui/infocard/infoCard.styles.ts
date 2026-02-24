import { cva } from "class-variance-authority";

export const infoCardVariants = cva(
  "rounded-2xl border p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md backdrop-blur",
  {
    variants: {
      variant: {
        neutral:
          "bg-[linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] border-black/20 hover:bg-white/10 text-slate-700",
        warning: "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40 text-amber-200",
        success:
          "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 text-emerald-200",
        error: "bg-red-500/10 border-red-500/20 hover:border-red-500/40 text-red-200",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);
