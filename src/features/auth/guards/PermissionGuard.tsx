import { ReactNode } from "react";

import { Permission } from "../constants/permissions";
import { useAuthContext } from "../hooks/useAuthContext";


interface Props {
    /** All listed permissions are required. */
    permissions: Permission[];
    children: ReactNode;
    fallback?: ReactNode;
}

export function PermissionGuard({ permissions, children, fallback = null }: Props) {
    const { hasPermission } = useAuthContext()
    const allowed = hasPermission(permissions);

    if (!allowed) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}