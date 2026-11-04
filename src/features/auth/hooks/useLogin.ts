import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logionApi } from "../api";
import { useAuth } from "./useAuth";
import { AUTH_ME_QUERIES } from "../constants/constants";
import { EmailLoginPayload } from "../types/api";

export function useLogin() {
    const { setSession } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: EmailLoginPayload) => logionApi(payload),
        onSuccess: (result) => {
            setSession(result);
            queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERIES });
        },
    });
}