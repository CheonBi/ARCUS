import { createBrowserRouter } from "react-router";
import { MainLayout } from "@components/layout/MainLayout";
import { ROUTES } from "@app/config/routes";

import { DashBoardPage } from "@features/dashboard/pages/DashBoardPage";
import { TicketListPage } from "@features/tickets/pages/TicketListPage";
import { TicketDetailPage } from "@features/tickets/pages/TicketDetailPage";
import { VocAnalyticsPage } from "@features/voc/pages/VocAnalyticsPage";
import { MonitoringPage } from "@features/monitoring/pages/MonitoringPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
      {
        path: ROUTES.TICKETS,
        element: <TicketListPage />,
      },
      {
        path: ROUTES.TICKET_DETAIL(":ticketId"),
        element: <TicketDetailPage />,
      },
      {
        path: ROUTES.VOC,
        element: <VocAnalyticsPage />,
      },
      {
        path: ROUTES.MONITORING,
        element: <MonitoringPage />,
      },
    ],
  },
]);
