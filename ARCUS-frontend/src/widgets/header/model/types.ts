import { routes } from "@shared/consts";

export const HEADER_LINKS = [
  { label: "Mainboard", path: routes.dev.mainboard() },
  { label: "Daily", path: routes.dev.daily() },
  { label: "Event", path: routes.dev.event() },
  { label: "Settings", path: routes.dev.settings() },
];
