import { create } from "zustand";

type User = {
    name: string;
    email:string;
    bio: string;
    created_at?: string | null ;
    profile_image_url?: string | null ;
};


type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));