import { cva } from "class-variance-authority";

export const eventLogTableVariants = cva("flex min-h-0 flex-1 flex-col rounded-[28px] border p-5 sm:p-6", {
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

export const eventLogListVariants = cva("overflow-auto rounded-3xl border", {
  variants: {
    density: {
      default: "max-h-[520px]",
      compact: "max-h-[420px]",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export const eventLogHeaderCellVariants = cva("border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em]", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export const eventLogBodyCellVariants = cva("border-b px-4 py-4 align-top", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
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

export const eventLogTableStyles = {
  header: "flex flex-col gap-4 border-b pb-4",
  textBlock: "space-y-1",
  title: "text-xl font-semibold",
  description: "text-sm",
  summary: "grid gap-5 sm:grid-cols-3",
  summaryCard: "rounded-2xl border px-4 py-3",
  summaryLabel: "text-xs font-semibold uppercase tracking-[0.14em]",
  summaryValue: "mt-2 text-2xl font-semibold",
  content: "grid gap-5 xl:grid-cols-3 mt-5 min-h-0",
  table: "min-w-full border-separate border-spacing-0 text-sm",
  tableHead: "sticky top-0 z-10",
  tableRow: "cursor-pointer transition-colors",
  severityBadge:
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]",
  severityDot: "h-2.5 w-2.5 rounded-full",
  contentText: "max-w-[340px] min-w-[220px] whitespace-normal leading-6",
  detailPanel: "rounded-3xl border p-5",
  detailHeader: "flex items-start justify-between gap-4 border-b pb-4",
  detailMeta: "mt-4 grid gap-3 sm:grid-cols-2",
  detailMetaCard: "rounded-2xl border px-4 py-3",
  emptyState: "flex min-h-[320px] items-center justify-center rounded-3xl border p-6 text-center text-sm",
};
