import { cva } from "class-variance-authority";

export const sectionVariants = cva(
  //Base style
  "relative",
  {
    variants: {
      size: {
        sm: "py-10",
        md: "py-16",
        lg: "py-24",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
