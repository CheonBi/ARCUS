import { cva } from "class-variance-authority";

export const dailyControlsVariants = cva("rounded-[28px] border p-5 sm:p-6", {
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

export const dailyRangeButtonVariants = cva("rounded-full px-4", {
  variants: {
    selected: {
      true: "border-transparent bg-sky-500 text-slate-950 hover:bg-sky-400",
      false: "",
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const dailyViewButtonVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      selected: {
        true: "bg-sky-500 text-slate-950",
        false: "text-inherit",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

export const dailyControlsStyles = {
  content: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
  textBlock: "space-y-1",
  title: "text-lg font-semibold",
  description: "text-sm",
  controls: "flex flex-col gap-3 xl:flex-row xl:items-center",
  rangeGroup: "flex flex-wrap gap-2",
  rangeLabel: "font-semibold",
  rangeDescription: "ml-2 text-xs opacity-75",
  viewGroup: "inline-flex rounded-full border p-1",
  viewIcon: "h-4 w-4",
};
