import { Section } from "@shared/layout/Section";
import { PROBLEM_CONSTANT } from "../model/problem.constant";
import { InfoCard } from "@shared/ui/infocard";

export const ProblemSection = () => {
  const { headline, items, footer } = PROBLEM_CONSTANT;
  return (
    <Section size="lg" className="overflow-hidden" id="problem-section">
      <header>
        <h2>{headline.title}</h2>
        {headline.description ? <p>{headline.description}</p> : null}
      </header>

      <div className="mt-10 mb-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <InfoCard key={item.id} title={item.title} description={item.description} />
        ))}
      </div>
      <p>{footer.text}</p>
    </Section>
  );
};
