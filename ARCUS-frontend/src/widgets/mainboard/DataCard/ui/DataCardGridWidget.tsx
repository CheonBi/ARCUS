import { cn } from "@shared/lib/cn";
import type { DataCardItem } from "../model/dataCard.types";
import { DataCard } from "./DataCard";

interface DataCardGridWidgetProps {
  cards: DataCardItem[];
  className?: string;
}

export const DataCardGridWidget = ({ cards, className }: DataCardGridWidgetProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4", className)}>
      {cards.map((card) => (
        <DataCard
          key={card.title}
          title={card.title}
          value={card.value}
          change={card.change}
          trend={card.trend}
        />
      ))}
    </div>
  );
};
