import { cva } from "class-variance-authority";

export const paramSwitchVariants = cva("rounded-[28px] border p-5 sm:p-6", {
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

export const paramSwitchRowVariants = cva("rounded-3xl border p-4 transition-colors", {
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

export const paramSwitchToggleVariants = cva(
  "relative inline-flex h-8 w-14 items-center rounded-full border transition-colors",
  {
    variants: {
      enabled: {
        true: "border-emerald-400/30 bg-emerald-400/18",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      enabled: false,
      disabled: false,
    },
  },
);

export const paramSwitchStyles = {
  content: "flex flex-col gap-5",
  header: "space-y-1",
  title: "text-lg font-semibold",
  description: "max-w-4xl text-sm",
  list: "grid gap-4",
  row: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
  rowText: "space-y-2",
  rowTitle: "text-base font-semibold",
  rowDescription: "text-sm leading-6",
  stateBadge: "inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold",
  knob: "absolute left-1 top-1 h-5.5 w-5.5 rounded-full bg-white transition-transform",
  dirtyBadge: "inline-flex rounded-full bg-amber-400/16 px-2 py-1 text-xs font-semibold text-amber-200",
  toggleWrap: "flex items-center gap-3",
  helper: "text-xs leading-5",
};
