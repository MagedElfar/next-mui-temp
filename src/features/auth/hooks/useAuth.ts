"use client";

import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
    return useAuthStore(
        useShallow((s) => ({
            accessToken: s.accessToken,
            refreshToken: s.refreshToken,
            user: s.user,
            isAuthenticated: !!s.accessToken,
            clear: s.clear,
            setSession: s.setSession,
        }))
    );
};