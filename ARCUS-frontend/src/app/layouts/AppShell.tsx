import { Outlet } from "react-router";
import { Sidebar } from "@widgets/sidebar/ui";

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <header className="app-header"></header>
        <section className="app-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
