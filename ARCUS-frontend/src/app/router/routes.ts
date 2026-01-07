/**
 * Route patterns (React Router matching only)
 *
 * Use these ONLY for router definitions (path=...).
 * Keep ":orgId" / ":taskId" param tokens here.
 */
export const ROUTES = {
  // Entry/Auth (public)
  ENTRY: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ORG_ONBOARDING: "/org/onboarding",

  // App (org scoped)
  APP: "/app",
  APP_ROOT: "/app/:orgId",
  DASHBOARD: "/app/:orgId/dashboard",
  TASKS: "/app/:orgId/tasks",
  TASK_DETAIL: "/app/:orgId/tasks/:taskId",
  NOTIFICATIONS: "/app/:orgId/notifications",
  REPORTS: "/app/:orgId/reports",
  SETTINGS: "/app/:orgId/settings",
} as const;

/**
 * Route factories (URL builders)
 *
 * Use these for navigate(), Link to, redirect, etc.
 * All app routes require orgId to enforce tenant context.
 */
export const entryRoutes = {
  entry: () => ROUTES.ENTRY,
  login: () => ROUTES.LOGIN,
  signup: () => ROUTES.SIGNUP,
  orgOnboarding: () => ROUTES.ORG_ONBOARDING,
} as const;

export const appRoutes = {
  root: (orgId: string) => `/app/${orgId}`,

  dashboard: (orgId: string) => `/app/${orgId}/dashboard`,

  tasks: (orgId: string) => `/app/${orgId}/tasks`,
  taskDetail: (orgId: string, taskId: string) => `/app/${orgId}/tasks/${taskId}`,

  notifications: (orgId: string) => `/app/${orgId}/notifications`,
  reports: (orgId: string) => `/app/${orgId}/reports`,
  settings: (orgId: string) => `/app/${orgId}/settings`,
} as const;

/**
 * Optional: export a single namespace-like object
 * (Some teams prefer importing `routes` only.)
 */
export const routes = {
  patterns: ROUTES,
  entry: entryRoutes,
  app: appRoutes,
} as const;

/**
 * Optional helpers: param keys (useful with useParams typing)
 */
export const routeParams = {
  orgId: "orgId",
  taskId: "taskId",
} as const;
