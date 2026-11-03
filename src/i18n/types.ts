import { appConfig } from "@/config/app";
import type commonMessages from "@messages/en/common.json";
import type countriesMessages from "@messages/en/countries.json";


export type Locale = (typeof appConfig.locales)[number];

export type AppNamespace = keyof IntlMessages;

export type Direction = "ltr" | "rtl";

export type MessagesData = {
    common: typeof commonMessages;
    countries: typeof countriesMessages;
};
