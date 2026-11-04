"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

import { PageLoader } from "@/components/fallback/PageLoader";
import { paths } from "@/config/paths";
import { usePathname, useRouter } from "@/i18n/routing";

import { useAuthContext } from "../hooks/useAuthContext";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, isHydrated, isLoading } = useAuthContext();

  if (!isHydrated || isLoading) {
    return (
      <PageLoader />
    );
  }

  if (!isAuthenticated) {
    const redirectPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    router.replace(`${paths.auth.login}?callbackUrl=${encodeURIComponent(redirectPath)}`);
    return null;
  }

  return <>{children}</>;
}