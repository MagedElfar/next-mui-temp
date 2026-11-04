import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { AuthContextValue } from "../types/context";

export function useAuthContext(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within <AuthProvider>");
    }
    return ctx;
}
