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
      className={({ isActive }) => [isActive ? "active" : "", className ?? ""].join(" ")}
    >
      {icon && <span className="text-lg opacity-80">{icon}</span>}
      <span>{label}</span>
    </NavLink>
  );
};
