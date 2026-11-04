import { axiosApiService } from "@/lib/api/request";

import { authEndpoints } from "./constants/endpoints";
import { AuthResult, EmailLoginPayload, WhoAmIResponse } from "./types/api";

//authentication
export const logionApi = (payload: EmailLoginPayload) =>
    axiosApiService.post<AuthResult, EmailLoginPayload>(authEndpoints.admin.login, payload)

/** Google SSO — the GIS credential; only emails that already belong to an admin get in. */
export const googleLoginApi = (token: string) =>
    axiosApiService.post<AuthResult, { token: string }>(authEndpoints.admin.google, { token })

export const logoutApi = () =>
    axiosApiService.post<void>(authEndpoints.admin.logout)

export const currentUserApi = () => axiosApiService.getOne<WhoAmIResponse>(authEndpoints.admin.me) 
