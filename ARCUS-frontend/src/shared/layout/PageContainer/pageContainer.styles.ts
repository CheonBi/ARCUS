import { cva } from "class-variance-authority";

export const pageContainerVariants = cva(
  // 기본(Base) 스타일
  "mx-auto w-full max-w-6xl px-6",
  {
    variants: {
      size: {
        default: "max-w-6xl",
        wide: "max-w-screen-2xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);
