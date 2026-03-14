import { cva } from "class-variance-authority";

export const dailyMetricsVariants = cva("flex min-h-0 flex-1 flex-col rounded-[28px] border p-5 sm:p-6", {
  variants: {
    variant: {
      default: "shadow-[0_20px_50px_rgba(2,6,23,0.14)]",
      soft: "shadow-[0_16px_36px_rgba(2,6,23,0.1)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const dailyMetricsChartVariants = cva("h-[420px] w-full", {
  variants: {
    density: {
      default: "",
      compact: "h-[360px]",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export const dailyMetricsTableVariants = cva("overflow-auto rounded-3xl border", {
  variants: {
    size: {
      default: "",
      compact: "max-h-[360px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const dailyHeaderCellVariants = cva("border-b px-4 py-3 text-xs font-semibold tracking-[0.16em] uppercase", {
  variants: {
    align: {
      left: "text-left",
      right: "text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export const dailyBodyCellVariants = cva("border-b px-4 py-3 whitespace-nowrap", {
  variants: {
    align: {
      left: "text-left",
      right: "text-right",
    },
    emphasized: {
      true: "font-medium",
      false: "",
    },
  },
  defaultVariants: {
    align: "left",
    emphasized: false,
  },
});

export const dailyMetricsStyles = {
  header: "flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between",
  textBlock: "space-y-1",
  title: "text-xl font-semibold",
  description: "text-sm",
  selectedPanel: "rounded-2xl border px-4 py-3 text-sm",
  content: "mt-5 min-h-0 flex-1",
  table: "min-w-full border-separate border-spacing-0 text-sm",
  tableHead: "sticky top-0 z-10",
  tableRow: "cursor-pointer transition-colors",
};
