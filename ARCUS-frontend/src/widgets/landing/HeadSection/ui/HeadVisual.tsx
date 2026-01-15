import { HEAD_CONSTANT } from "../model/head.constant";

export const HeadVisual = () => {
  const { imageSrc, alt } = HEAD_CONSTANT.visual;

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-linear-to-tr from-zinc-200 to-transparent blur-2xl" />
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <img src={imageSrc} alt={alt} className="h-auto w-full" loading="lazy" />
      </div>
    </div>
  );
};
