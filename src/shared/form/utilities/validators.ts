import { parsePhoneNumberWithError, isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import { normalizePhoneValue } from "@/utilities/string";

import { PasswordValidatorOptions } from "../types/validation";

// ==========================
// 1. Email Validator
// ==========================
export const emailValidator = ({
    invalidEmailMsg = "Invalid email address",
}: {
    invalidEmailMsg?: string;
    requireMsg?: string;
} = {}) =>
    z.email({ message: invalidEmailMsg });


// ==========================
// 2. Password Validator
// ==========================
export const passwordValidator = ({
    minLength = 6,
    requireMsg = "Password is required",
    tooShortMsg = `Password must be at least ${minLength} characters`,
}: PasswordValidatorOptions = {}) =>
    z.string()
        .min(1, { message: requireMsg })
        .min(minLength, { message: tooShortMsg });


// ==========================
// 3. Image / URL Validator
// ==========================
export const imageValidator = (message: string = "Invalid url") => z
    .string()
    .pipe(
        z.url({ message })
    )

// ==========================
// 4. Slug Validator
// ==========================
export const slugValidator = (message: string = "Invalid slug format") =>
    z.string().regex(/^[a-z0-9-]+$/, { message });


// ==========================
// 5. Color Validator (Hex)
// ==========================
export const colorValidator = (message: string = "Invalid hex color") =>
    z.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message })
        .optional()
        .or(z.literal(""));


// ==========================
// 6. Phone Validator
// ==========================
export const phoneValidator = (message: string = "Invalid phone number") =>
    z.string()
        .trim()
        .min(1, { message })
        .refine((value) => {
            const normalized = normalizePhoneValue(value);
            if (!normalized) return false;

            try {
                return isValidPhoneNumber(normalized);
            } catch {
                return false;
            }
        }, { message })
        .transform((value) => {
            const normalized = normalizePhoneValue(value);

            try {
                const phoneNumber = parsePhoneNumberWithError(normalized);
                return phoneNumber?.format("E.164") || normalized;
            } catch {
                return normalized;
            }
        });