import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

import { getAppLocale } from "@/i18n/getLocale";
import { getAppTranslation } from "@/i18n/getTranslations";
import { Locale } from "@/i18n/types";
import { AppProvider } from "@/providers/AppProvider";

import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getAppTranslation(locale, "common");

  const brandName = t("metadata.brandName");
  const defaultTitle = t("metadata.title");

  return {
    title: {
      template: `%s | ${brandName}`,
      default: `${defaultTitle} | ${brandName}`,
    },
    description: t("metadata.description"),
  };
}

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  // Fetch messages for the Client-side provider
  const messages = await getMessages({ locale: locale as Locale });
  const { dir } = await getAppLocale(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
    >

      <head>
        <InitColorSchemeScript attribute="class" />
      </head>

      <body>
        <AppProvider locale={locale as Locale} messages={messages}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}