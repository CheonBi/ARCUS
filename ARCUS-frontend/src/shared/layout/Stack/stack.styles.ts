import { cva } from "class-variance-authority";

export const stackVariants = cva(
  //base style
  "flex flex-col",
  {
    variants: {
      gap: { sm: "gap-3", md: "gap-5", lg: "gap-8" },
    },
    defaultVariants: {
      gap: "md",
    },
  }
);
