import { HeadBadge } from "./HeadBadge";
import { HeadTitle } from "./HeadTitle";
import { HeadDescription } from "./HeadDescription";
import { HeadActions } from "./HeadActions";
import { HeadVisual } from "./HeadVisual";

export const HeadSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <HeadBadge />
            <HeadTitle />
            <HeadDescription />
            <HeadActions />
          </div>

          <HeadVisual />
        </div>
      </div>
    </section>
  );
};
