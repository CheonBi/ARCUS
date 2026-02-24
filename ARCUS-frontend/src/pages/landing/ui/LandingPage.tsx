import { PageContainer } from "@shared/layout/PageContainer";
import { HeadSection } from "@widgets/landing/HeadSection";
import { ProblemSection } from "@widgets/landing/ProblemSection";

export const LandingPage = () => {
  return (
    <>
      <PageContainer>
        <HeadSection />
        <ProblemSection />
      </PageContainer>
    </>
  );
};
