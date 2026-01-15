import { Section } from "@shared/layout/Section";
import { PageContainer } from "@shared/layout/PageContainer";
import { Stack } from "@shared/layout/Stack";

import { HeadBadge } from "./HeadBadge";
import { HeadTitle } from "./HeadTitle";
import { HeadDescription } from "./HeadDescription";
import { HeadActions } from "./HeadActions";
import { HeadVisual } from "./HeadVisual";

export const HeadSection = () => {
  return (
    <Section size="lg" className="overflow-hidden">
      <PageContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Stack gap="md">
            <HeadBadge />
            <HeadTitle />
            <HeadDescription />
            <HeadActions />
          </Stack>

          <HeadVisual />
        </div>
      </PageContainer>
    </Section>
  );
};
