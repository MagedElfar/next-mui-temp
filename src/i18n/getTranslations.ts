
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { AppNamespace } from './types';

export async function getAppTranslation<N extends AppNamespace>(
    locale: string,
    namespace: N,
) {
    const lang = locale as Locale;

    // next-intl server-side call
    const t = await getTranslations({
        locale: lang,
        namespace: namespace
    });

    return t
}