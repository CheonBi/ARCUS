import { NavLink } from "react-router";
import { PageContainer } from "@shared/layout/PageContainer";
import { navLinkVariants } from "../model/styles";
import { ThemeToggle } from "@features/theme";
import { HEADER_LINKS } from "../model/types";

export const Header = () => {
  return (
    <header className="app-header">
      <PageContainer className="flex items-center justify-between w-full h-full gap-8" size="full">
        <div className="flex items-center gap-8">
          <div className="header-logo">
            <h1 className="text-xl font-bold">ARCUS</h1>
          </div>
          <nav className="hidden md:flex items-center gap-4 h-full">
            {HEADER_LINKS.map((link) => (
              <NavLink key={link.path} to={link.path} className={({ isActive }) => navLinkVariants({ isActive })}>
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
