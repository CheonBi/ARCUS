import { ROUTES } from "@app/config/routes";
import { SidebarNavItem } from "@components/ui/SidebarNavItem";
import { ThemeToggleButton } from "@components/ui/ThemeToggleButton";
import { Home, Ticket, BarChart3, Activity } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <h1 className="logo">ARCUS</h1>

      <nav>
        <SidebarNavItem to={ROUTES.ROOT} label="Dashboard" icon={<Home size={18} />} />
        <SidebarNavItem to={ROUTES.TICKETS} label="Tickets" icon={<Ticket size={18} />} />
        <SidebarNavItem to={ROUTES.VOC} label="Analytics" icon={<BarChart3 size={18} />} />
        <SidebarNavItem to={ROUTES.MONITORING} label="Monitoring" icon={<Activity size={18} />} />
      </nav>

      <ThemeToggleButton />
    </aside>
  );
};
