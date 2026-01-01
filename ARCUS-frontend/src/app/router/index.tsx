import { createBrowserRouter } from "react-router";
import { MainLayout } from "@app/layouts/AppShell";
import { ROUTES } from "@app/config/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
      },
      {
        path: ROUTES.TICKETS,
      },
      {
        path: ROUTES.TICKET_DETAIL(":ticketId"),
      },
      {
        path: ROUTES.VOC,
      },
      {
        path: ROUTES.MONITORING,
      },
    ],
  },
]);
