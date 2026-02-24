import type { sectionProps } from "./section.types";
import { sectionVariants } from "./section.styles";
import { cn } from "@shared/lib/cn";

export const Section = ({ className, size, children, ...props }: sectionProps) => {
  return (
    <section className={cn(sectionVariants({ size }), className)} {...props}>
      {children}
    </section>
  );
};

Section.displayName = "Section";
