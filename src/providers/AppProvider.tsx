"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { Slide, ToastContainer } from 'react-toastify';

import { appConfig } from "@/config/app";
import { Locale, MessagesData } from "@/i18n/types";

import { ReactQueryProvider } from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider";

interface ProvidersProps {
    children: ReactNode;
    locale: Locale;
    messages: MessagesData;
}

export function AppProvider({ children, locale, messages }: ProvidersProps) {
    return (
        <NextIntlClientProvider timeZone={appConfig.timeZone} locale={locale} messages={messages}>
            <ThemeProvider>
                <ReactQueryProvider>
                    <ToastContainer transition={Slide} />
                    {children}
                </ReactQueryProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    );
}