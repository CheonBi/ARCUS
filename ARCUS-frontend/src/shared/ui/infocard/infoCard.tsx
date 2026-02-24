import { cn } from "@shared/lib/cn";
import { infoCardVariants } from "@shared/ui/infocard/infoCard.styles";
import type { infoCardProps } from "@shared/ui/infocard/infoCard.types";

export const InfoCard = ({ className, title, description, icon, variant }: infoCardProps) => {
  return (
    <article className={cn(infoCardVariants({ variant, className }))}>
      {icon ? (
        <div
          className={cn(
            "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl",
            "bg-white/10"
          )}
        >
          {icon}
        </div>
      ) : null}
      <h3 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{title}</h3>
      <p className="text-body mt-2 text-sm leading-relaxed">{description}</p>
    </article>
  );
};
