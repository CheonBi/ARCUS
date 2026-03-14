import { cva } from "class-variance-authority";

export const dailySummaryVariants = cva("rounded-[28px] border p-5 backdrop-blur sm:p-6", {
  variants: {
    variant: {
      default: "shadow-[0_24px_60px_rgba(2,6,23,0.22)]",
      soft: "shadow-[0_18px_40px_rgba(2,6,23,0.16)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const dailySummaryCardVariants = cva("rounded-2xl border p-4", {
  variants: {
    variant: {
      default: "",
      emphasis: "ring-1 ring-sky-400/10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const dailySummaryStyles = {
  content: "flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between",
  intro: "space-y-3",
  badgeRow: "flex flex-wrap items-center gap-2",
  badge: "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
  badgeIcon: "h-3.5 w-3.5",
  timestamp: "rounded-full px-3 py-1 text-xs font-medium",
  textBlock: "space-y-2",
  title: "text-2xl font-semibold tracking-tight sm:text-3xl",
  description: "max-w-3xl text-sm leading-6 sm:text-base",
  grid: "grid min-w-full grid-cols-2 gap-3 rounded-3xl border p-3 sm:grid-cols-4 xl:min-w-[520px]",
  cardHeader: "mb-3 flex items-center justify-between",
  cardLabel: "text-sm font-medium",
  iconWrap: "inline-flex h-9 w-9 items-center justify-center rounded-2xl",
  cardIcon: "h-4 w-4",
  cardValue: "text-xl font-semibold sm:text-2xl",
  cardDescription: "mt-1 text-xs",
};
