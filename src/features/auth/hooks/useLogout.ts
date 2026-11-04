import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logoutApi } from "../api";
import { useAuth } from "./useAuth";

export function useLogout() {
    const { refreshToken, clear } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            if (!refreshToken)
                return

            return await logoutApi()
        },
        onSettled: () => {
            clear();
            queryClient.removeQueries();
        },
    });
}