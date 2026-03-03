import { Outlet } from "react-router";
import { Header } from "@widgets/header/ui/header";
import { PageContainer } from "@shared/layout/PageContainer";

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <section className="app-content">
          <PageContainer className="flex flex-col flex-1 h-full w-full">
            <Outlet />
          </PageContainer>
        </section>
      </main>
    </div>
  );
};
