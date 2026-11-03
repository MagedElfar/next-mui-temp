/* eslint-disable no-console */
import fs from "fs";
import path from "path";

import { Locale } from "next-intl";

import { MessagesData } from "./types";


export const getMessagesData = async (locale: Locale): Promise<MessagesData> => {
    // استخدام process.cwd مع src/messages
    const baseDir = path.join(process.cwd(), 'messages', locale);

    const loadFile = (fileName: string) => {
        try {
            const filePath = path.join(baseDir, `${fileName}.json`);
            // التأكد إن الملف موجود قبل قراءته لمنع انهيار السيرفر
            if (!fs.existsSync(filePath)) {
                console.warn(`Translation file not found: ${filePath}`);
                return {};
            }
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error(`Error loading translation file for locale: ${locale}, file: ${fileName}`, error);
            return {};
        }
    };

    return {
        common: loadFile('common'),
        countries: loadFile("countries")
    };
};