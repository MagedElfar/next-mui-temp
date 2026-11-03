import type commonMessages from "@messages/en/common.json";

import { appConfig } from "@/config/app";

export type Locale = (typeof appConfig.locales)[number];

export type AppNamespace = keyof IntlMessages;

export type Direction = "ltr" | "rtl";

export type MessagesData = {
    common: typeof commonMessages;
};
