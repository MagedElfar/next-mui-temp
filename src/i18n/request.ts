import { getRequestConfig } from 'next-intl/server';

import { appConfig } from '@/config/app';

import { getMessagesData } from './messages';
import { routing } from './routing';
import { Locale } from './types';

export default getRequestConfig(async ({ locale: requestLocale }) => {
    let locale = requestLocale as Locale;

    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    const messages = await getMessagesData(locale);

    return {
        locale: locale as Locale,
        messages,
        timeZone: appConfig.timeZone,
    };
});