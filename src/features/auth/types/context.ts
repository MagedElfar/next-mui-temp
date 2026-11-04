
import { User } from "@/features/user/types/user";

import { Permission } from "../constants/permissions";


export interface AuthContextValue {
    user: User | null;
    /** Effective permission keys for the current user. */
    permissions: Permission[];
    /** True once the persisted session is hydrated AND a token is present. */
    isAuthenticated: boolean;
    /** True while hydrating the store or loading the profile. */
    isLoading: boolean;
    /** True after the persisted store has rehydrated on the client. */
    isHydrated: boolean;
    /** True after the persisted store has rehydrated on the client. */
    hasPermission: (required: Permission | Permission[], ...rest: Permission[]) => boolean;    /** True after the persisted store has rehydrated on the client. */
    logout: () => Promise<void>;
}