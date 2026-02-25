import { create } from "zustand";
import { sessionStorage } from "@entities/session/lib/storage";

type SessionState = {
  token: string | null;
  isHydrated: boolean;
};

type SessionActions = {
  hydrate: () => void;
  setToken: (token: string) => void;
  clear: () => void;
};

export const useSessionStore = create<SessionState & SessionActions>((set) => ({
  token: null,
  isHydrated: false,

  hydrate: () => {
    const token = sessionStorage.getToken();
    set({ token, isHydrated: true });
  },

  setToken: (token) => {
    sessionStorage.setToken(token);
    set({ token });
  },

  clear: () => {
    sessionStorage.clearToken();
    set({ token: null });
  },
}));
