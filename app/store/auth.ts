import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (userData: User) =>
        set({
          user: userData,
        }),

      clearUser: () =>
        set({
          user: null,
        }),
    }),
    {
      name: "auth-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
