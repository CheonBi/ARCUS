import { HEAD_CONSTANT } from "../model/head.constant";

export const HeadBadge = () => {
  if (!HEAD_CONSTANT.badge) return null;

  return (
    <div className="mb-5 inline-flex items-center w-fit rounded-full border px-3 py-1 text-sm">
      {HEAD_CONSTANT.badge}
    </div>
  );
};
