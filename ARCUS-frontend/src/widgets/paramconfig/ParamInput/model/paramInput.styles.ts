import { cva } from "class-variance-authority";

export const paramInputVariants = cva("rounded-[28px] border p-5 sm:p-6", {
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

export const paramInputFieldVariants = cva("rounded-2xl border p-4 transition-colors", {
  variants: {
    dirty: {
      true: "border-amber-400/80 bg-amber-400/10",
      false: "",
    },
    disabled: {
      true: "opacity-60",
      false: "",
    },
  },
  defaultVariants: {
    dirty: false,
    disabled: false,
  },
});

export const paramInputStyles = {
  content: "flex flex-col gap-5",
  header: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
  textBlock: "space-y-1",
  title: "text-lg font-semibold",
  description: "max-w-4xl min-h-[1.4rem] text-sm",
  badgeRow: "flex flex-wrap gap-2",
  badge:
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase",
  grid: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
  fieldCard: "space-y-3",
  fieldHead: "space-y-1",
  fieldLabelRow: "flex items-start justify-between gap-3",
  fieldLabel: "text-sm font-semibold",
  fieldDescription: "text-xs leading-5",
  dirtyBadge: "inline-flex rounded-full bg-amber-400/16 px-2 py-1 text-xs font-semibold text-amber-200",
  inputWrap: "flex items-center gap-3 rounded-2xl border px-3 py-3",
  input: "w-full bg-transparent text-base font-semibold outline-none",
  unit: "text-xs font-semibold uppercase tracking-[0.12em]",
  helper: "text-xs leading-5",
};
