/**
 * Route constants
 *
 * Extracts all paths into typed constants so that routes can be managed
 * type-safely instead of hard-coding string paths throughout the app.
 */

export const ROUTES = {
  ROOT: "/",
  TICKETS: "/tickets",
  TICKET_DETAIL: (id: string | ":ticketId" = ":ticketId") => `/tickets/${id}`,
  VOC: "/voc",
  MONITORING: "/monitoring",
} as const;
