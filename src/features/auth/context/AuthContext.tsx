"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";

import { useAuth } from "../hooks/useAuth";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useLogout } from "../hooks/useLogout";
import { Permission, Role_PERMISSIONS } from "../permissions";
import { AuthContextValue } from "../types/context";

export const AuthContext = createContext<AuthContextValue | null>(null);

const emptySubscribe = () => () => { };

/**
 * Single source of truth for auth state. Composes the three layers cleanly:
 *  - zustand store  -> token/session persistence
 *  - react-query    -> server state (the `me` profile + permissions)
 *  - axios client   -> transport (token attach + refresh handled in interceptors)
 *
 * Consumers read everything through `useAuth()` instead of reaching into the
 * store or firing their own queries.
 */
export function AuthProvider({ children }: { children: ReactNode }) {

  const {
    accessToken } = useAuth()

  const { mutateAsync: logoutMutation } = useLogout()

  // Guard against SSR/persist hydration mismatches: false on the server
  // snapshot, true on the client snapshot — no effect-driven re-render.
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const me = useGetCurrentUser();
  const { user } = useAuth(); // react-query; only enabled when a token exists
  const permissions: Permission[] = useMemo(
    () => user?.role ? Role_PERMISSIONS?.[user.role] : [],
    [user],
  );

  const logout = useCallback(async () => logoutMutation(), [logoutMutation]);

  const hasPermission = useCallback(
    (required: Permission | Permission[], ...rest: Permission[]) => {
      const keys = Array.isArray(required) ? required : [required, ...rest];
      if (keys.length === 0) return true; // إذا كانت القائمة فارغة يسمح بالدخول
      return keys.every((k) => permissions.includes(k));
    },
    [permissions],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: me?.data
        ? me.data
        : user,
      permissions,
      isAuthenticated: isHydrated && Boolean(accessToken),
      isLoading: !isHydrated || (Boolean(accessToken) && me.isLoading),
      isHydrated,
      hasPermission,
      logout,
    }),
    [me.data, me.isLoading, user, permissions, isHydrated, accessToken, hasPermission, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}