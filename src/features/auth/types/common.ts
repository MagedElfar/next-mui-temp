export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export type RegistrationStep = "account" | "organization" | "submitted";
