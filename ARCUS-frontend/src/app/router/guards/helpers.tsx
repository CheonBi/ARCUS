import type { RouteObject } from "react-router";

export const guarded = (Guard: React.ComponentType, children: RouteObject[]): RouteObject => ({
  element: <Guard />,
  children,
});
