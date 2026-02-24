const SESSION_STORAGE_KEY = "access_token";

export const sessionStorage = {
  getToken: (): string | null => localStorage.getItem(SESSION_STORAGE_KEY),
  setToken: (token: string): void => localStorage.setItem(SESSION_STORAGE_KEY, token),
  clearToken: (): void => localStorage.removeItem(SESSION_STORAGE_KEY),
};
