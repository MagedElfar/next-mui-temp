import { useMutation, useQueryClient } from "@tanstack/react-query";

import { googleLoginApi } from "../api";
import { useAuth } from "./useAuth";
import { AUTH_ME_QUERIES } from "../constants/constants";

export function useGoogleLogin() {
    const { setSession } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (token: string) => googleLoginApi(token),
        onSuccess: (result) => {
            setSession(result);
            queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERIES });
        },
    });
}
