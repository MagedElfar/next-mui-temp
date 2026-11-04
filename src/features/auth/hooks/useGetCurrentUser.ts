import { useQuery } from "@tanstack/react-query";

import { currentUserApi } from "../api";
import { useAuth } from "./useAuth";
import { AUTH_ME_QUERIES } from "../constants/constants";

export function useGetCurrentUser() {
    const { isAuthenticated } = useAuth();
    return useQuery({
        queryKey: AUTH_ME_QUERIES,
        queryFn: async () => {
            const data = await currentUserApi();
            return data?.admin || null
        },
        enabled: !!isAuthenticated,
        staleTime: 1000 * 60 * 5,
    });
}