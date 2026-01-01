import { NavLink } from "react-router";
import type { ReactNode } from "react";

type NavItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  className?: string;
  end?: boolean;
};

export const NavItem = ({ to, label, icon, className, end = false }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        ["sidebar-nav-item", isActive ? "sidebar-nav-item-active" : "", className ?? ""].join(" ")
      }
    >
      {icon && <span className="sidebar-nav-item-icon">{icon}</span>}
      <span className="sidebar-nav-item-label">{label}</span>
    </NavLink>
  );
};
