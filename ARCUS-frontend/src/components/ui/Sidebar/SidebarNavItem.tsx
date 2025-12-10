import { NavLink } from "react-router";
import type { ReactNode } from "react";

type SidebarNavItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  className?: string;
};

export const SidebarNavItem = ({ to, label, icon, className }: SidebarNavItemProps) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        ["sidebar-nav-item", isActive ? "sidebar-nav-item-active" : "", className ?? ""].join(" ")
      }
    >
      {icon && <span className="sidebar-nav-item-icon">{icon}</span>}
      <span className="sidebar-nav-item-label">{label}</span>
    </NavLink>
  );
};
