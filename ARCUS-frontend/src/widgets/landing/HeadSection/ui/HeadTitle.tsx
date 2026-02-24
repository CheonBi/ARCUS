import { HEAD_CONSTANT } from "../model/head.constant";

export const HeadTitle = () => {
  return (
    <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">{HEAD_CONSTANT.title}</h1>
  );
};
