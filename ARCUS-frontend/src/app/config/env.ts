/**
 * Centralizes usage of Vite's `import.meta.env`.
 * Used to manage environment-based values such as API and WebSocket URLs.
 */

export type AppEnv = {
  API_BASE_URL: string;
  WS_BASE_URL: string;
  APP_NAME: string;
};

export const getEnv = (): AppEnv => {
  return {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api",
    WS_BASE_URL: import.meta.env.VITE_WS_BASE_URL ?? "ws://localhost:4000/ws",
    APP_NAME: import.meta.env.VITE_APP_NAME ?? " CX Insight Suite - ARCUS",
  };
};
