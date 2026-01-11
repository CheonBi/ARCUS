import { HEAD_CONSTANT } from "../model/head.constant";

export const HeadActions = () => {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <SignupButton size="lg" />

      <DemoRequestButton size="lg" variant="secondary" />

      <p className="text-sm text-zinc-500 sm:ml-2">{HEAD_CONSTANT.trustNote}</p>
    </div>
  );
};
