import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; 

type User = {
  name: string;
  email: string;
  bio: string;
  created_at?: string | null;
  profile_image_url?: string | null;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
