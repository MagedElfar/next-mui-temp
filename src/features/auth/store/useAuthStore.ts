import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

import { User } from "@/features/user/types/user";

import { AuthResult } from "../types/api";


interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setSession: (result: AuthResult) => void;
  clear: () => void;
}

// 12 ساعة مقسومة على 24 ساعة للوصول للكسر النهائي بالأيام (0.5 يوم)
const TWELVE_HOURS_IN_DAYS = 12 / 24;

const cookieStorage: StateStorage = {
  getItem: (name) => {
    return Cookies.get(name) ?? null;
  },
  setItem: (name, value) => {
    Cookies.set(name, value, {
      expires: TWELVE_HOURS_IN_DAYS, // 👈 12 hours TTL
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  },
  removeItem: (name) => {
    Cookies.remove(name, { path: "/" });
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setSession: (result) =>
        set({
          accessToken: result.tokens.accessToken,
          refreshToken: result.tokens.refreshToken,
          user: result.admin,
        }),
      clear: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: "rawa-auth",
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);