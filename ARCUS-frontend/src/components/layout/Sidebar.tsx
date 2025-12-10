import { ROUTES } from "@app/config/routes";
import { CurrentUser } from "@components/ui/Sidebar/CurrentUser";
import { SidebarNavItem } from "@components/ui/Sidebar/SidebarNavItem";
import { ThemeToggle } from "@components/ui/Sidebar/ThemeToggle";
import { Home, Ticket, BarChart3, Activity, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <aside className={`app-sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-top">
        <div className="logo">
          <div className="logo-icon">CX</div>
          <span className="logo-text">CX Insight</span>
        </div>

        <button
          type="button"
          onClick={toggleCollapsed}
          className="sidebar-collapse-btn"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
        </button>
      </div>

      <nav className="sidebar-middle sidebar-nav">
        <SidebarNavItem to={ROUTES.ROOT} label="Dashboard" icon={<Home size={18} />} />
        <SidebarNavItem to={ROUTES.TICKETS} label="Tickets" icon={<Ticket size={18} />} />
        <SidebarNavItem to={ROUTES.VOC} label="Analytics" icon={<BarChart3 size={18} />} />
        <SidebarNavItem to={ROUTES.MONITORING} label="Monitoring" icon={<Activity size={18} />} />
      </nav>

      <div className="sidebar-bottom">
        <CurrentUser />
        <ThemeToggle />
      </div>
    </aside>
  );
};
