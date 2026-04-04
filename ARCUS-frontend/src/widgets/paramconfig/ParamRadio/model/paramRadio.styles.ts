import { cva } from "class-variance-authority";

export const paramRadioVariants = cva("rounded-[28px] border p-5 sm:p-6", {
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

export const paramRadioCardVariants = cva("rounded-3xl border p-4 transition-colors", {
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

export const paramRadioOptionVariants = cva("rounded-2xl border px-4 py-3 text-left transition-colors", {
  variants: {
    selected: {
      true: "border-sky-400/30 bg-sky-400/16",
      false: "",
    },
    disabled: {
      true: "cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    selected: false,
    disabled: false,
  },
});

export const paramRadioStyles = {
  content: "flex flex-col gap-5",
  header: "space-y-1",
  title: "text-lg font-semibold",
  description: "max-w-3xl text-sm",
  grid: "grid gap-4 xl:grid-cols-2",
  cardHead: "mb-4 flex items-start justify-between gap-3",
  cardTitle: "text-base font-semibold",
  cardDescription: "mt-1 text-sm leading-6",
  optionGrid: "grid gap-3 sm:grid-cols-2",
  optionLabel: "text-sm font-semibold",
  optionDescription: "mt-1 text-xs leading-5",
  dirtyBadge: "inline-flex rounded-full bg-amber-400/16 px-2 py-1 text-xs font-semibold text-amber-200",
};
