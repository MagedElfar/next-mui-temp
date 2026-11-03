import { Locale } from "./types";

const LangPrefix: Record<Locale, string> = {
    ar: "Ar",
    en: "En"
}

export const getLocalizedFieldValue = <T extends Record<string, any>>(
    data: T | null | undefined,
    locale: Locale,
    prefix: string = "name",
    fallbackKey?: keyof T
): string => {
    if (!data) return "";

    const langPrefix = LangPrefix[locale]
    const localizedKey = `${prefix}${langPrefix}`;
    const defaultFallback = `${prefix}En`;

    const value = data[localizedKey] ?? (fallbackKey ? data[fallbackKey] : data[defaultFallback]);

    return (typeof value === 'string' && value.trim() !== '' ? value : "---");
};
