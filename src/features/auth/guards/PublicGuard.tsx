"use client";

import { ReactNode } from "react";

import { PageLoader } from "@/components/fallback/PageLoader";
import { paths } from "@/config/paths";
import { useRouter } from "@/i18n/routing";

import { useAuthContext } from "../hooks/useAuthContext";

export function PublicGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { isAuthenticated, isHydrated, isLoading } = useAuthContext();

    if (!isHydrated || isLoading) {
        return <PageLoader />
    }

    if (isAuthenticated) {
        router.replace(paths.dashboard.index);
        return null;
    }

    return <>{children}</>;
}