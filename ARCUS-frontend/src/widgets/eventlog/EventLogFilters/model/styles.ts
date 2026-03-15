import { cva } from "class-variance-authority";

export const eventLogFiltersVariants = cva("rounded-[28px] border p-5 sm:p-6", {
  variants: {
    variant: {
      default: "shadow-[0_20px_50px_rgba(2,6,23,0.16)]",
      soft: "shadow-[0_16px_36px_rgba(2,6,23,0.12)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const eventLogRangeButtonVariants = cva(
  "inline-flex min-w-[120px] flex-col items-start rounded-2xl border px-4 py-3 text-left transition-colors",
  {
    variants: {
      selected: {
        true: "border-sky-400/30 bg-sky-400/16 text-sky-50",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export const eventLogSeverityButtonVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      selected: {
        true: "border-sky-400/30 bg-sky-400/16 text-sky-50",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export const eventLogFiltersStyles = {
  content: "flex flex-col gap-5 xl:items-start xl:justify-between",
  textBlock: "space-y-1",
  title: "text-lg font-semibold",
  description: "max-w-2xl text-sm",
  controls: "w-full flex gap-10 xl:items-end ",
  group: "flex flex-wrap gap-3",
  groupLabel: "mb-2 text-xs font-semibold uppercase tracking-[0.16em]",
  rangeLabel: "font-semibold",
  rangeDescription: "text-xs opacity-70",
  severityDot: "h-2.5 w-2.5 rounded-full",
};
