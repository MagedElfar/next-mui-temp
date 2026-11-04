export const appConfig = {
    locales: ['ar', 'en'] as const,
    defaultLocale: 'en' as const,
    timeZone: "Asia/Riyadh",
    countries: ["EG", "SA", "AE", "US"],
    keys: {
        accessToken: "access_token",
        refreshToken: "refresh_token",
        locale: "NEXT_LOCALE"
    },
    url: {
        api: process.env.NEXT_PUBLIC_API_URL,
    }
} as const;
