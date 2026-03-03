import { NavLink } from "react-router";
import { PageContainer } from "@shared/layout/PageContainer";
import { routes } from "@shared/consts/routes";
import { navLinkVariants } from "./header.styles";
import { ThemeToggle } from "@features/theme";

const HEADER_LINKS = [
  { label: "Mainboard", path: routes.dev.mainboard() },
  { label: "Daily", path: routes.dev.daily() },
  { label: "Event", path: routes.dev.event() },
  { label: "Settings", path: routes.dev.settings() },
];

export const Header = () => {
  return (
    <header className="app-header">
      <PageContainer className="flex items-center justify-between w-full h-full gap-8">
        <div className="flex items-center gap-8">
          <div className="header-logo">
            <h1 className="text-xl font-bold">ARCUS</h1>
          </div>
          <nav className="hidden md:flex items-center gap-4 h-full">
            {HEADER_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => navLinkVariants({ isActive })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 md:gap-6 header-actions">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </PageContainer>
    </header>
  );
};
