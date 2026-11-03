import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { appConfig } from '@/config/app';

export const routing = defineRouting({
    locales: appConfig.locales,
    defaultLocale: appConfig.defaultLocale,
    localePrefix: "always",
    localeDetection: true,

});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);