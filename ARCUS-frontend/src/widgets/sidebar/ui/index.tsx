import { ROUTES } from "@app/router/routes";
import { NavItem } from "@widgets/sidebar/ui/NavItem";
import { ThemeToggle } from "@features/theme";
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
        <NavItem to={ROUTES.DASHBOARD} label="Dashboard" icon={<Home size={18} />} />
        <NavItem to={ROUTES.TASKS} label="Tickets" icon={<Ticket size={18} />} />
        <NavItem to={ROUTES.REPORTS} label="Analytics" icon={<BarChart3 size={18} />} />
        <NavItem to={ROUTES.NOTIFICATIONS} label="Monitoring" icon={<Activity size={18} />} />
      </nav>

      <div className="sidebar-bottom">
        <ThemeToggle />
      </div>
    </aside>
  );
};
