import { create } from "zustand";

type AuthMode = "login" | "signup";

type State = {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
};

export const useAuthModeStore = create<State>((set) => ({
  authMode: "login",
  setAuthMode: (mode) => set({ authMode: mode }),
}));