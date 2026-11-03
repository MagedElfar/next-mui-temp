import { Locale } from "./types";
import { getLocalizedFieldValue } from "./utils";


export async function getAppLocale(
    locale: string,
) {
    const lang = locale as Locale;

    const dir = lang === "ar" ? "rtl" : "ltr";

    const getLocalizedValue = <T extends Record<string, any>>(
        data: T | null | undefined,
        prefix: string = "name",
        fallbackKey?: keyof T
    ) => getLocalizedFieldValue(data, lang, prefix, fallbackKey);

    return {
        locale: lang,
        dir,
        getLocalizedValue,
    };
}