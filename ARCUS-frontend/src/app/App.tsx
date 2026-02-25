/**
 * Root wrapper that aggregates all global providers:
 * - TanStack Query
 * - Global Store (Redux/Zustand, etc.)
 * - Theme provider
 * - Router
 *
 * Wraps the entire app with these providers at once.
 */
import { RouterProvider } from "react-router";
import { router } from "@app/router";

import { QueryProvider } from "@app/providers/QueryProvider";
import { ThemeProvider } from "@features/theme";

export const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
};
