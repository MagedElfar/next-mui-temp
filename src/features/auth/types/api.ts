
import { User } from "@/features/user/types/user";

import { AuthTokens } from "./common";

export interface EmailLoginPayload {
    email: string
    password: string
}

export interface AuthResult {
    admin: User;
    tokens: AuthTokens;
}

export class WhoAmIResponse {
    admin?: User;
}
