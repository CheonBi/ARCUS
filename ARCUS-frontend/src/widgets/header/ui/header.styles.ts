import { cva } from "class-variance-authority";

export const navLinkVariants = cva("px-3 py-2 rounded-md transition-colors", {
  variants: {
    isActive: {
      true: "bg-[rgb(var(--nav-bg-active))] text-white",
      false: "text-[rgb(var(--nav-text))] hover:bg-[rgb(var(--nav-bg-hover))]",
    },
  },
  defaultVariants: {
    isActive: false,
  },
});
