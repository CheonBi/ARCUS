import { cn } from "@shared/lib/cn";
import { DataCard } from "./DataCard";

interface DataCardGridWidgetProps {
  className?: string;
}

/** 샘플 데이터 */
const SAMPLE_CARDS = [
  { title: "총 자산", value: "₩12.4M", change: "+3.2%", trend: "up" as const },
  { title: "수익률", value: "8.7%", change: "+1.1%", trend: "up" as const },
  { title: "거래량", value: "1,284", change: "-0.5%", trend: "down" as const },
  { title: "활성 포지션", value: "24", change: "+2", trend: "up" as const },
  { title: "미실현 손익", value: "₩340K", change: "-2.3%", trend: "down" as const },
  { title: "승률", value: "67.3%", change: "+0.8%", trend: "up" as const },
];

export const DataCardGridWidget = ({ className }: DataCardGridWidgetProps) => {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4", className)}>
      {SAMPLE_CARDS.map((card) => (
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
