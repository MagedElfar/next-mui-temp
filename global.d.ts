import { routing } from "@/i18n/routing";
import { MessagesData } from "@/i18n/types";

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: MessagesData;
    }
}

declare module 'react-phone-number-input/style.css';

declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntlMessages extends MessagesData { }
}

export { };